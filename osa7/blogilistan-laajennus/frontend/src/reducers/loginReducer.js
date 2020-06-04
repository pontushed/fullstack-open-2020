import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      blogService.setToken(action.data.token)
      return action.data
    case 'LOGIN_LOCAL':
      blogService.setToken(action.user.token)
      return action.user
    case 'LOGOUT':
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken('')
      return null
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const data = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(data))
    dispatch({
      type: 'LOGIN',
      data,
    })
  }
}

export default loginReducer
