import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_BOOKS_AND_AUTHORS } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_BOOKS_AND_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={result.data.allBooks} />

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

export default App
