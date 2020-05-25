import React from 'react'

const Persons = ({ persons, filterName, onDelete }) => {
  const listPersons = filterName.length
    ? persons.filter((p) => {
        return p.name.toLowerCase().includes(filterName)
      })
    : persons

  const handleClick = (event) => {
    onDelete(event.target.id)
  }

  return (
    <ul>
      {listPersons.map((p) => (
        <li key={p.id}>
          {p.name} {p.number}
          <button id={p.id} onClick={handleClick}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
