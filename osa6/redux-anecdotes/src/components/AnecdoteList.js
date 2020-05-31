import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterText = useSelector((state) => state.filter)

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`Added one vote for ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          filterText === '' ? true : anecdote.content.includes(filterText)
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
          />
        ))}
    </div>
  )
}

export default AnecdoteList
