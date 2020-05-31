import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  const handleVote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`Added one vote for ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes
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

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const mapStateToProps = (state) => {
  if (state.filter !== '') {
    return { anecdotes: state.anecdotes.filter(state.filter) }
  }
  return {
    anecdotes: state.anecdotes,
  }
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
