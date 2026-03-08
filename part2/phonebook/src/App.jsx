import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // 2.11: fetch from server
  useEffect(() => {
  personService.getAll().then(data => {
    setPersons(data)
  })
}, [])

  // 2.12 & 2.15: add / update
  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} already exists. Replace number?`)) {
        const updated = { ...existing, number: newNumber }
        personService
          .update(existing.id, updated)
          .then(returned => {
            setPersons(persons.map(p =>
              p.id !== existing.id ? p : returned
            ))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returned => {
      setPersons(persons.concat(returned))
    })

    setNewName('')
    setNewNumber('')
  }

  // 2.14: delete
  const deletePerson = id => {
    if (window.confirm('Delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

<PersonForm
  addPerson={addPerson}
  newName={newName}
  setNewName={setNewName}
  newNumber={newNumber}
  setNewNumber={setNewNumber}
/>

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App