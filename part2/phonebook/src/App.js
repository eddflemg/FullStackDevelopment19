import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Person = ({person, persons, setPersons}) => {

  const deleteFunc = event => {
    if(window.confirm(`Delete ${person.name}`)) {
      const id = event.target.value
      personService
        .deleting(id)
        .then(response => {
          console.log(id);
          console.log(persons.filter(person => person.id != id));
          setPersons(persons.filter(person => person.id != id))
          console.log(persons);
      })
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button value={person.id} onClick={deleteFunc} >Delete</button>
    </div>
  )
}

const Persons = ({persons, newSearch, searching, setSearch, setSearching, setPersons}) => {

  const searchResults = searching
    ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons
  //if (searching) setSearch('');
  const rows = () => searchResults.map(
    person => <Person person={person} setPersons={setPersons} persons={persons} key={person.name}/>
  )

  return(
    <div>
      <h2>Numbers</h2>
      <div>{rows()}</div>
    </div>
  )
}

const Form = ({numberChange, setErrorMessage, nameChange, persons, note, setNote, newName, newNumber, setPersons, setNewName, setNewNumber}) => {
  const addEntry = event => {
    event.preventDefault()
    const contains = persons.some(person => person.name === newName)
    if (contains) {
      //alert(`${newName} is already added to the phonebook` )
      if(window.confirm(`${newName} is already added to the phonebook. Should the number be replaced?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber}
        console.log(changedPerson);
        console.log(changedPerson.id);
        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.filter(person => person.name !== newName ? person : response))
            setNote(
              `${person.name} number is changed`
            )
            setTimeout(() => {
              setNote(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Person ${person.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            //setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNote(
            `${newPerson.name} is created`
          )
          setTimeout(() => {
            setNote(null)
          }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  return(
    <div>
      <h2>add new contact</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={nameChange} />
          <br />
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Search = ({searchChange, newSearch, searching, setSearching}) => {

  const search = (event) => {
    //setSearching(false)
    event.preventDefault()
    setSearching(true)
  }

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={search}>
        <div>
          <input value={newSearch} onChange={searchChange} />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}

const Notification = ({message, note}) => {
  if (message === null && note === null) {
    return null
  }
  else if (message === null) {
    return (
      <div className="note">
        {note}
      </div>
    )
  }
  else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ note, setNote ] = useState(null)
  const [ searching, setSearching] = useState(false)

  const changeHandlerName = (event) => {
    setNewName(event.target.value)
  }

  const changeHandlerNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeHandlerSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  useEffect(() =>
    {
      personService
        .getAll()
        .then(response => setPersons(response))
    },
  [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} note={note} />
      <Search searchChange={changeHandlerSearch} newSearch={newSearch} setSearching={setSearching} searching={searching}/>
      <Form setErrorMessage={setErrorMessage} setNote={setNote} note={note} nameChange={changeHandlerName} numberChange={changeHandlerNumber} persons={persons} newName={newName} newNumber={newNumber} setNewNumber={setNewNumber} setPersons={setPersons} setNewName={setNewName} />
      <Persons persons={persons} setPersons={setPersons} setSearching={setSearching} setSearch={setNewSearch} newSearch={newSearch} searching={searching}/>
    </div>
  )
}

export default App
