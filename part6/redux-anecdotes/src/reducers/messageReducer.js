const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'REMOVE':
      return ''
    default:
      return state

  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(
      setMessage(`You voted for ${content}`)
    )
    await sleep(time * 1000)
    dispatch(
      removeMessage()
    )
  }
}

export const setMessage = (content) => {
  return {
    type: 'SET',
    message: content
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE',
  }
}

export default messageReducer
