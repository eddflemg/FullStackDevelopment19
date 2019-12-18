import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({onclick, text}) => {
  return (
    <button onClick={onclick}>
    {text}
  </button>
  )
}

const Statistics = ({params}) => {

  let total = params[0] + params[1] + params[2]
  let average = (params[0] - params[2]) / total || 0
  let positive = (params[0] / total) *100 || 0

  if(total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <Statistic number={params[0]} text='Good'/>
      <Statistic number={params[1]} text='Neutral' />
      <Statistic number={params[2]} text='Bad' />
      <Statistic number={total} text='Total' />
      <Statistic number={average} text='Average' />
      <Statistic number={positive + ' %'} text='Positive' />
    </table>
  )
}

const Statistic = ({ number, text }) =>
  <tr>
    <td>{text}</td>
    <td>{number}</td>
  </tr>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueBad = (value) => setBad(value)
  const setToValueGood = (value) => setGood(value)
  const setToValueNeutral = (value) => setNeutral(value)

  return (
    <div>
      <Header name='Give Feedback' />
      <Button onclick={() => setToValueGood(good + 1)} text='Good' />
      <Button onclick={() => setToValueNeutral(neutral + 1)} text='Neutral' />
      <Button onclick={() => setToValueBad(bad + 1)} text='Bad' />
      <Header name='Statistics' />
      <Statistics params = {[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
