import React from 'react'
import blogService from '../services/blogs'

const Form = ({ blogFormRef, blogs, setNote, newTitle, newAuthor, newURL, setBlogs, setNewTitle, setNewAuthor, setNewURL }) => {

  const changeTitleHandler = event => setNewTitle(event.target.value)
  const changeAuthorHandler = event => setNewAuthor(event.target.value)
  const changeURLHandler = event => setNewURL(event.target.value)

  const addEntry = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }
    const response = await blogService.create(newBlog)
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
