const notificationReducer = (state = '', action) => {
  if (action.type === 'NOTIFY') return action.message
  return state
}

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message,
    })
    setTimeout(() => dispatch({ type: 'NOTIFY', message: '' }), timeout * 1000)
  }
}

export default notificationReducer
