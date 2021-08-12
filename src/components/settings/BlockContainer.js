import React from 'react'

function BlockContainer({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      { children }
    </div>
  )
}

export default BlockContainer
