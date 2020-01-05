import React from 'react'

const Notification = ({ message, note }) => {
  if (message === null && note === null) {
    return null
  }
  else if (message === null) {
    return (
      <div className="note">
        {note}
      </div>
    )
  }
  else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification
