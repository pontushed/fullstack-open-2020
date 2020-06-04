import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            {users.map((x) => (
              <tr key={x.id}>
                <td>
                  <strong>
                    <Link to={`/users/${x.id}`}>{x.name}</Link>
                  </strong>{' '}
                  Blogs created: {x.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return <div>No users found.</div>
}

export default Users
