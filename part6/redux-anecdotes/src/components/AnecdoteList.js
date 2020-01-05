import React from 'react'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (anecdote) => {
    props.updateVotes(anecdote.id, anecdotes)
    props.setNotification(`You voted for'${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    message: state.message
  }
}

const mapDispatchToProps = {
  updateVotes,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
