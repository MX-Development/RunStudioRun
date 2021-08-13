import React, { useState } from 'react'
import styled from 'styled-components'

import { Link } from "react-router-dom"

function ProjectNav() {

  return (
    <TabContainer>
      <Link to="/" className="btn btn-gold">Jobs</Link>
      <Link to="/" className="btn btn-gold">Estimates</Link>
      <Link to="/" className="btn btn-gold">Purchases</Link>
      <Link to="/" className="btn btn-gold">Invoices</Link>
    </TabContainer>
  )
}

export default ProjectNav

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > a {
    flex: 0.225;
    text-align: center;
  }
`
