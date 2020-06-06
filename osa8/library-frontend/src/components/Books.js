import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [loadBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  useEffect(() => {
    setGenres(
      Array.from(new Set(props.books.map((book) => book.genres).flat()))
    )
  }, [props.books])

  const handleChange = (value) => {
    setFilter(value)
    loadBooks()
  }

  const books = filter
    ? [
        ...props.books.filter((book) => {
          return book.genres.includes(filter)
        }),
      ]
    : [...props.books]

  if (!props.show) {
    return null
  }

  if (called && loading) return <p>Loading ...</p>

  if (data) {
    //console.log(data)
  }

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <p>
          books in <strong>{filter}</strong> genre
        </p>
      )}
      {!filter && <p>all books</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            value={genre}
            onClick={({ target }) => handleChange(target.value)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => handleChange('')}>show all</button>
      </div>
    </div>
  )
}

export default Books
