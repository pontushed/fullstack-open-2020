import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const newState = [...state]
      newState.find((a) => a.id === action.data.id).votes++
      return [...newState]
    }
    case 'CREATE': {
      const newState = [...state, action.data]
      return [...newState]
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export const addVote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async (dispatch) => {
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id },
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
