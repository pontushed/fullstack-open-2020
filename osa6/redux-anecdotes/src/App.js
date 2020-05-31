import React, { useEffect } from 'react'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <ConnectedAnecdoteForm />
      <ConnectedAnecdoteList />
    </div>
  )
}

export default App
