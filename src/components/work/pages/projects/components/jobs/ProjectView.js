import React from 'react'
import Timeline from '../../../../Timeline'

function ProjectView({ type }) {

  return (
    <div>
      { type === 'timeline' ?
        <Timeline />
      : null }
    </div>
  )
}

export default ProjectView
