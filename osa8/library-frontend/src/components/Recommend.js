import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE } from '../queries'

const Recommend = (props) => {
  const [favorGenre, setFavorGenre] = useState('')
  const [recommendedBooks, setRecommendedBooks] = useState([])

  const favorite = useQuery(FAVORITE_GENRE)
  //const books = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } })

  useEffect(() => {
    if (favorite.data && favorite.data.me) {
      setFavorGenre(favorite.data.me.favoriteGenre)
      setRecommendedBooks([
        ...props.books.filter((book) => book.genres.includes(favorGenre)),
      ])
    }
  }, [favorite, props.books, favorGenre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favorGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
