import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <nav
      className='navbar is-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <Link to='/' className='navbar-item'>
            Blogs
          </Link>
          <Link to='/users' className='navbar-item'>
            Users
          </Link>
          <span className='navbar-item'>{user.name} logged in.</span>
          <div className='navbar-item'>
            <p className='control'>
              <button
                className='button'
                onClick={() => {
                  dispatch({ type: 'LOGOUT' })
                }}
              >
                Logout
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu
