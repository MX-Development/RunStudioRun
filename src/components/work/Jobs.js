import React from 'react'
import CreateEstimate from './CreateEstimate'

function Jobs({ data }) {
  return (
    <>
      { data ? 'test' : <CreateEstimate /> }
    </>
  )
}

export default Jobs
