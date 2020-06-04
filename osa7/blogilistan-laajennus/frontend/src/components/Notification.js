import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  if (message === null || message.text === null || message.text === '') {
    return null
  }

  return (
    <p class='notification' className={message.type}>
      {message.text}
    </p>
  )
}

export default Notification
