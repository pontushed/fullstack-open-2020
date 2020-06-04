import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    try {
      dispatch(createBlog(newBlog, user))
      dispatch(
        setNotification(
          {
            text: `${newBlog.title} by ${newBlog.author} added`,
            type: 'is-success',
          },
          5
        )
      )
      toggleRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(
        setNotification({ text: 'Something went wrong', type: 'is-danger' }, 5)
      )
    }
  }

  return (
    <form className='form' onSubmit={addBlog}>
      <h2>Create a new blog entry</h2>
      <div className='field'>
        <label className='label'>Title</label>
        <div className='control'>
          <input
            className='input'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Author</label>
        <div className='control'>
          <input
            className='input'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>URL</label>
        <div className='control'>
          <input
            className='input'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <div className='control'>
        <button
          className='button is-small is-primary'
          id='submit-blog'
          type='submit'
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default BlogForm
