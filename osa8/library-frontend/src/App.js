import React, { useState, useEffect } from 'react'
import {
  useQuery,
  useApolloClient,
  useMutation,
  useSubscription,
} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, LOGIN, BOOK_ADDED } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_BOOKS_AND_AUTHORS)
  const client = useApolloClient()

  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
    })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(newBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      notify(
        `New book added to library:, ${newBook.title} by ${newBook.author.name} `
      )
      updateCacheWith(newBook)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('libraryapp-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <Authors show={page === 'authors'} authors={result.data.allAuthors} />
        <Books show={page === 'books'} books={result.data.allBooks} />
        <Login show={page === 'login'} setToken={setToken} />
        <Notify errorMessage={errorMessage} />
      </div>
    )
  }

  if (token && page === 'login') {
    setPage('authors')
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        token={true}
      />
      <Books show={page === 'books'} books={result.data.allBooks} />
      <Recommend show={page === 'recommend'} books={result.data.allBooks} />
      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const Login = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryapp-token', token)
    }
  }, [result.data, setToken])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username:
          <input
            value={username}
            type='text'
            autoComplete='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            value={password}
            type='password'
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default App
