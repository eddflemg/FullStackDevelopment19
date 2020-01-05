import blogService from '../services/blogs'
import React from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import Input from './Input'

const Login = ({ userName, passWord, setUser, setErrorMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = userName.value
      const password = passWord.value
      console.log(username, ' ', password);
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      userName.reset('')
      passWord.reset('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (

    <form onSubmit={handleLogin}>
      <div>
        username
        <Input
          {...userName}
          name="Username"
        />
      </div>
      <div>
        password
        <Input
          {...passWord}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  userName: PropTypes.object.isRequired,
  passWord: PropTypes.object.isRequired
}

export default Login
