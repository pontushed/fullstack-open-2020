import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Username</label>
          <div className='control'>
            <input
              className='input'
              id='username'
              type='text'
              value={username}
              name='Username'
              autoComplete='username'
              onChange={handleUsernameChange}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              className='input'
              id='password'
              type='password'
              value={password}
              name='Password'
              autoComplete='current-password'
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className='control'>
          <button className='button is-small' id='login-button' type='submit'>
            Login
          </button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
