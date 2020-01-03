import React, {useState, useEffect} from 'react'
import Form from './components/Form'
import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs] = useState([])
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newURL, setNewURL ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ note, setNote ] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() =>
    {
      blogService
        .getAll()
        .then(response => setBlogs(response))
    },
  [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user.token);
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Login username={username} password={password} user={user} setUsername={setUsername} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage} />
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogForm = () => (
    <div>
      <p>{user.username} logged in</p> <button onClick={logOut} >Log out</button>
      <Form newURL={newURL} newTitle={newTitle} newAuthor={newAuthor} setNewURL={setNewURL} setNewTitle={setNewTitle} setNewAuthor={setNewAuthor} setBlogs={setBlogs} blogs={blogs} setErrorMessage={setErrorMessage} setNote={setNote} note={note} />
      <Blogs blogs={blogs} setBlogs={setBlogs} />
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} note={note} />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
}

export default App;
