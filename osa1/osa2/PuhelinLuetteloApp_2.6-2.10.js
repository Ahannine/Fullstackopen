import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [searchTerm, setSearchTerm] = useState ('')

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    if(persons.some(person => person.name ===newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
    const nameObject ={name: newName, number: newNumber}
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
      }


  }

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      </div>
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <Persons persons={filtered} />
    </div>
  )

}

export default App