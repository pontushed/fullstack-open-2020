import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import NewComment from './NewComment'

const RemoveButton = ({ blog, username }) => {
  const dispatch = useDispatch()

  const handleRemoveBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} ?`)
    if (confirm) {
      dispatch(removeBlog(blog))
    }
  }

  return username === blog.user.username ? (
    <button className='button is-small' onClick={handleRemoveBlog}>
      Remove
    </button>
  ) : null
}

const Blog = ({ username }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogID = useParams().id
  const [blog, setBlog] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setBlog(blogs.find((b) => b.id === blogID))
  }, [blogs, blogID])

  if (!blog) {
    return null
  } else {
    return (
      <div className='container'>
        <h2 className='title'>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        Likes: {blog.likes}
        <button
          className='button is-small'
          onClick={() => {
            dispatch(addLike(blog))
          }}
        >
          Like
        </button>
        <br />
        {blog.user.name}
        <RemoveButton blog={blog} username={username} />
        <h2 className='title'>Comments</h2>
        <NewComment blog={blog} />
        <div className='content'>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Blog
