import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Greatest = ({ anecdotes, votes }) => {
  let indexofGreatest = votes.indexOf(Math.max(...votes))
  return (
    <>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexofGreatest]}</p>
      <p>has {votes[indexofGreatest]} votes</p>
    </>
  )
}

const App = (props) => {
  const [votes, setVotes] = useState([...initialVotes])

  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    let newSelected = selected
    while (newSelected === selected)
      newSelected = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(newSelected)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes([...copy])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button
        onClick={() => {
          vote()
        }}
      >
        vote
      </button>
      <button
        onClick={(selected) => {
          nextAnecdote()
        }}
      >
        next anecdote
      </button>
      <Greatest anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const initialVotes = Array.apply(null, new Array(anecdotes.length)).map(
  Number.prototype.valueOf,
  0
)

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
