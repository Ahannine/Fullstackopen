import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  };

  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}'s number`, 'success')
          })
          .catch(error => {
            showNotification(`Information of '${existingPerson.name}' was already removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          });
      }
    } else {
      const nameObject = { name: newName, number: newNumber }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`, 'success')
        })
    }
  }

  const deleteName = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          showNotification(`Information of '${person.name}' has already been removed from server`, 'error');
        })
    }
  }

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
      <Persons persons={filtered} deleteName={deleteName} />
    </div>
  )
}

export default App;

