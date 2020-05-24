import React from 'react'

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Total = ({ course }) => {
  const sum = course.parts
    .map((p) => p.exercises)
    .reduce((a, b) => {
      return a + b
    })
  return (
    <p>
      <strong>Total of {sum} exercises</strong>
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  const parts = course.parts.map((p) => {
    return <Part key={p.id} part={p} />
  })

  return <div>{parts}</div>
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course
