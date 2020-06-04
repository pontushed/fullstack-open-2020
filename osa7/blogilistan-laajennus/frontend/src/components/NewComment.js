import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const NewComment = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addComment(blog, content))
    setContent('')
  }

  return (
    <>
      <input
        className='input'
        value={content}
        onChange={(event) => {
          setContent(event.target.value)
        }}
      />
      <button className='button is-primary is-small' onClick={handleClick}>
        Add new comment
      </button>
    </>
  )
}
export default NewComment
