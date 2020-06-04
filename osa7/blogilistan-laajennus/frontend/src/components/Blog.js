import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const RemoveButton = ({ blog, username }) => {
  const dispatch = useDispatch()
  const handleRemoveBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} ?`)
    if (confirm) {
      dispatch(removeBlog(blog))
    }
  }

  return username === blog.user.username ? (
    <button onClick={handleRemoveBlog}>Remove</button>
  ) : null
}

const Blog = ({ blog, username }) => {
  const [showFull, setShowFull] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => {
    setShowFull(!showFull)
  }

  if (showFull) {
    return (
      <div style={blogStyle}>
        <div>
          Title: {blog.title} <button onClick={toggleView}>Hide</button>
          <br />
          Author: {blog.author}
          <br />
          URL: {blog.url}
          <br />
          Likes: {blog.likes}{' '}
          <button
            onClick={() => {
              dispatch(addLike(blog))
            }}
          >
            Like
          </button>
          <br />
          {blog.user.name}
          <RemoveButton blog={blog} username={username} />
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView}>View</button>
      </div>
    </div>
  )
}
export default Blog
