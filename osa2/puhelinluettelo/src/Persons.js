import React from 'react'

const Persons = ({ persons, filterName }) => {
  const listPersons = filterName.length
    ? persons.filter((p) => {
        return p.name.toLowerCase().includes(filterName)
      })
    : persons
  return (
    <ul>
      {listPersons.map((p) => (
        <li key={p.name}>
          {p.name} {p.number}
        </li>
      ))}
    </ul>
  )
}

export default Persons
