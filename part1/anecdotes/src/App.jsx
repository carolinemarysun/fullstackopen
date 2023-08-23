import { useState } from 'react'

const Header = ({name}) => <h1>{name}</h1>

const SelectedAnecdote = ({ text, voteCount }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {voteCount} votes</p>
    </div>
  )
}

const Button = (props) => { 
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const TopRatedAnecdote = ({ anecdotes, points }) => {
  const highestVoteCount = Math.max(...points)
  if (highestVoteCount === 0) {
    return 'No votes yet for any of the anecdotes'
  }
  const indexOfTopRatedAnecdote = points.indexOf(highestVoteCount)
  const topRatedAnecdote = anecdotes[indexOfTopRatedAnecdote]
  return (
    <div>
      <p>{topRatedAnecdote}</p>
      <p>has {highestVoteCount} votes</p>
    </div>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const increaseNumOfVotes = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const getNextAnecdote = () => {
    const sizeOfAnecdotes = anecdotes.length - 1;
    setSelected(getRandomNumber(sizeOfAnecdotes))
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div>
      <Header name='Anecdote of the day' />
      <SelectedAnecdote text={anecdotes[selected]} voteCount={points[selected]} />
      <Button onClick={increaseNumOfVotes} text='vote' />
      <Button onClick={getNextAnecdote} text='next anecdote' />

      <Header name='Anecdote with most votes' />
      <TopRatedAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App