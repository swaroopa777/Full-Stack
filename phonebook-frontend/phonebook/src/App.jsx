import { useState, useEffect } from 'react'
import personsService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Fetch persons only once when app loads
  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    personsService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: 
          <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>

      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default App