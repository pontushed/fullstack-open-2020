import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const newState = [...state]
      newState.find((a) => a.id === action.data.id).likes++
      return [...newState]
    }
    case 'COMMENT': {
      const newState = [...state]
      newState.find((a) => a.id === action.updatedBlog.id).comments = [
        ...action.updatedBlog.comments,
      ]
      return [...newState]
    }
    case 'CREATE': {
      const newState = [...state, action.data]
      return [...newState]
    }
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'BLOG_REMOVE': {
      const newState = [...state].filter((b) => b.id !== action.data.id)
      return [...newState]
    }
    default:
      return state
  }
}

export const addLike = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    await blogService.update(updatedBlog)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id },
    })
  }
}

export const addComment = (blog, content) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blog.id, content)
    dispatch({
      type: 'COMMENT',
      updatedBlog: { ...blog, comments: [...blog.comments, { ...newComment }] },
    })
  }
}

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: { ...data, user: { ...user, id: data.user.id } },
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'BLOG_REMOVE',
        data: blog,
      })
    } catch (exception) {}
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer
