import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.findById(id).then((res) => setUser(res))
  }, [id])

  if (!user) {
    return null
  }
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <table>
          <tbody>
            {user.blogs.map((x) => (
              <tr key={x.id}>
                <td>
                  <Link to={`/blogs/${x.id}`}>{x.title}</Link> by {x.author}{' '}
                  likes: {x.likes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return <div></div>
}
export default User
