import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, bad, neutral }) => {
  const sum = () => {
    return good + bad + neutral
  }

  const average = () => {
    return (good + bad * -1) / (good + bad + neutral)
  }

  const positive = () => {
    return (good / (good + bad + neutral)) * 100
  }

  if (sum() === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={good} />
          <StatisticLine name='neutral' value={neutral} />
          <StatisticLine name='bad' value={bad} />
          <StatisticLine name='all' value={sum()} />
          <StatisticLine name='average' value={average()} type='float' />
          <StatisticLine name='positive' value={positive()} type='percent' />
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>
}

const StatisticLine = ({ name, value, type }) => {
  if (type === 'percent') {
    value = `${value.toPrecision(3)} %`
  }
  if (type === 'float') {
    value = `${value.toPrecision(3)}`
  }
  return (
    <tr>
      <td> {name}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (newValue) => {
    setGood(good + 1)
  }

  const addNeutral = (newValue) => {
    setNeutral(neutral + 1)
  }

  const addBad = (newValue) => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={addGood} text='good' />
      <Button handler={addNeutral} text='neutral' />
      <Button handler={addBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
