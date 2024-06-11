import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [searchTerm, setSearchTerm] = useState ('')


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
    axios.post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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