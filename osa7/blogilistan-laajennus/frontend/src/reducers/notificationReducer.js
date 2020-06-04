const initialState = { message: { text: '', type: '' }, timeoutId: null }

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'NOTIFY') {
    clearTimeout(state.timeoutID)
    return { message: { ...action.message }, timeoutID: action.timeoutID }
  }
  return state
}

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    const timeoutID = setTimeout(
      () =>
        dispatch({
          type: 'NOTIFY',
          message: { ...initialState },
          timeoutID: null,
        }),
      timeout * 1000
    )
    dispatch({
      type: 'NOTIFY',
      message,
      timeoutID,
    })
  }
}

export default notificationReducer
