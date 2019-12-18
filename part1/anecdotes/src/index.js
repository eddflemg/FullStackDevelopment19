import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onclick, text}) => {
  return (
    <button onClick={onclick}>
      {text}
    </button>
  )
}

const Anecdote = ({anecdote, votes, text}) => {
  return (
    <div>
      <h1>{text}</h1>
      {anecdote}<br/>
	    <p>has {votes} votes</p><br/>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [most, setMost] = useState(0)

  const nextAnecdote = () => {
    const newSelected = Math.floor(Math.random() * 6)
    setSelected(newSelected)
  }

  const voteAnecdote = () => {
    const newPoints = [...points]
    newPoints[selected] = points[selected] + 1
    setPoints(newPoints)
    const newHighest = newPoints.indexOf(Math.max(...newPoints))
    setMost(newHighest)
  }

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]} text='Anecdote of the Day' />
	    <Button onclick={voteAnecdote} text='vote anecdote' />
	    <Button onclick={nextAnecdote} text='next anecdote' />
      <Anecdote anecdote={props.anecdotes[most]} votes={points[most]} text='Anecdote of the Day' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
