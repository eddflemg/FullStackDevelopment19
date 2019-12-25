import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  const rows = () =>
    parts.map(part =>
      <Part part={part} key={part.name} />
    )

  return (<div>{rows()}</div>)
}

const Total = ({parts}) => {

  return (
    <div>
      <p>Number of exercises {parts.reduce((x, y) => x + y.exercises, 0)}</p>
    </div>
  )
}

const Course = ({course}) =>
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>

const Courses = ({courses}) => {
  const rows = () =>
    courses.map(course =>
      <Course course={course} key={course.name} />
    )

  return(<div>{rows()}</div>)
}

export default Courses
