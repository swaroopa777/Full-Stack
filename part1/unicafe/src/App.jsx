import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ veryGood, good, neutral, bad }) => {
  const total = veryGood + good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average =
    (2 * veryGood + 1 * good - 1 * bad) / total

  const positive =
    ((veryGood + good) / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="very good" value={veryGood} />
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(2) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [veryGood, setVeryGood] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="very good" onClick={() => setVeryGood(veryGood + 1)} />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h1>statistics</h1>

      <Statistics
        veryGood={veryGood}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
