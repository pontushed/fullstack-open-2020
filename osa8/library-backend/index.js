require('dotenv').config()
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const mongoose = require('mongoose')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID
    bookCount: Int
    books: [Book!]
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if (!args.author) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      if (!args.genre) {
        const author = await Author.findOne({ name: args.author })
        const id = author.id
        return Book.find({ author: id }).populate('author')
      }
      const author = await Author.findOne({ name: args.author })
      const id = author.id

      return Book.find({ genres: { $in: [args.genre] }, author: id }).populate(
        'author'
      )
    },
    allAuthors: () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new AuthenticationError('not authenticated')
      }

      let book = new Book({ ...args })

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        newAuthor.books = newAuthor.books.concat(book)

        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        book.author = newAuthor

        await book.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } else {
        book.author = author
        author.books = author.books.concat(book)
        await author.save()
      }
      await book.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        const updated = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
        return updated
      }
      return null
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'library') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
