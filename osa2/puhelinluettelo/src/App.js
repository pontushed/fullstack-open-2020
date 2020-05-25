import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './personService'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  useEffect(() => {
    personService.getAll().then((personsFromDatabase) => {
      setPersons(personsFromDatabase)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((p) => p.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already in added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        const personObject = persons.find((p) => p.name === newName)
        personObject.number = newNumber
        personService.update(personObject).then(() => {
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.addNew(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage({ text: `Added ${newName}`, type: 'success' })
        setTimeout(() => {
          setMessage({ text: null, type: 'success' })
        }, 5000)
      })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === parseInt(id))
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(
            persons.filter((p) => {
              return p.id !== parseInt(id)
            })
          )
          setMessage({
            text: `${person.name} successfully removed.`,
            type: 'success',
          })
          setTimeout(() => {
            setMessage({ text: null, type: 'success' })
          }, 5000)
        })
        .catch((error) => {
          setMessage({
            text: `Information of ${person.name} has been already removed from the server.`,
            type: 'error',
          })
          setTimeout(() => {
            setMessage({ text: null, type: 'error' })
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handler={handleFilterNameChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
