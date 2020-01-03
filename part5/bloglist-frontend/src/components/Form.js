import React from 'react';
import blogService from '../services/blogs'

const Form = ({ setErrorMessage, blogs, note, setNote, newTitle, newAuthor, newURL, setBlogs, setNewTitle, setNewAuthor, setNewURL}) => {

  const changeTitleHandler = event => setNewTitle(event.target.value)
  const changeAuthorHandler = event => setNewAuthor(event.target.value)
  const changeURLHandler = event => setNewURL(event.target.value)

  const addEntry = event => {
    event.preventDefault()
    //const contains = persons.some(person => person.name === newName)
    /*if (contains) {
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
      }
    }
    else {*/
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newURL
      }
      blogService
        .create(newBlog)
        .then(response => {
          setBlogs(blogs.concat(newBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewURL('')
          setNote(
            `${newBlog.title} is created`
          )
          setTimeout(() => {
            setNote(null)
          }, 5000)
      })
    //}
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return(
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addEntry}>
        <div>
          title: <input value={newTitle} onChange={changeTitleHandler} />
          <br />
          author: <input value={newAuthor} onChange={changeAuthorHandler} />
          <br />
          url: <input value={newURL} onChange={changeURLHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form
