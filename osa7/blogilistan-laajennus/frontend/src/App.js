import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.current_user)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN_LOCAL',
        user,
      })
      // setUser(user)
      // blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      // const user = await loginService.login({
      //   username,
      //   password,
      // })
      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      // setUser(user)
      // setUsername('')
      // setPassword('')
      dispatch(
        setNotification({ text: 'Login successful.', type: 'success' }, 5)
      )
    } catch (exception) {
      dispatch(
        setNotification(
          { text: 'Login error: Wrong credentials', type: 'error' },
          5
        )
      )
    }
  }

  // const logoutUser = () => {
  //   window.localStorage.removeItem('loggedBlogappUser')
  //   setUser(null)
  // }

  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable
      buttonId='create-blog'
      buttonLabel='Create new blog'
      ref={blogFormRef}
    >
      <BlogForm toggleRef={blogFormRef} user={user} />
    </Togglable>
  )

  const loginFormRef = React.createRef()
  const loginForm = () => (
    <>
      <Notification />
      <Togglable buttonLabel='Login' ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Menu user={user} />
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog username={user.username} />
          </Route>
          <Route path='/'>
            <h2 className='title'>Blog App</h2>
            <div className='content'>
              {blogForm()}
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <p className='subtitle' key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </p>
                ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
