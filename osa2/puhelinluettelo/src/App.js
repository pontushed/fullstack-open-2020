import React, { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  /**
   * 2.10 Erottele vielä komponentit
   */

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown by
        <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  )
}

export default App
