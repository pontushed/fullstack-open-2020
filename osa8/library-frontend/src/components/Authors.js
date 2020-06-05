import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BORN, ALL_AUTHORS } from '../queries'

const SetBorn = (props) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [setBorn] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    setBorn({ variables: { name, birthYear } })
  }
  if (!props.authors) {
    return null
  }
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born{' '}
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(Number(target.value))}
          ></input>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = [...props.authors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBorn authors={props.authors} />
    </div>
  )
}

export default Authors
