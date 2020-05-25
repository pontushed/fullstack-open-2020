import React from 'react'

const Filter = ({ handler }) => {
  return (
    <div>
      filter shown by
      <input onChange={handler} />
    </div>
  )
}

export default Filter
