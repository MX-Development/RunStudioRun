import React, { useState } from 'react'
import styled from 'styled-components'

import { Link, useLocation, useParams } from "react-router-dom"

function ProjectNav() {
  
  let { id } = useParams();
  const location = useLocation();
  const pagePath = location.pathname.split('/')[1]

  const [activeTab, setActiveTab] = useState(null)

  return (
    <TabContainer>
      <Link to={`/${pagePath}/${id}/jobs`} className={activeTab ? `btn btn-active` : `btn`}>Jobs</Link>
      <Link to={`/${pagePath}/${id}/estimates`} className={activeTab ? `btn btn-active` : `btn`}>Estimates</Link>
      <Link to={`/${pagePath}/${id}/purchases`} className={activeTab ? `btn btn-active` : `btn`}>Purchases</Link>
      <Link to={`/${pagePath}/${id}/invoices`} className={activeTab ? `btn btn-active` : `btn`}>Invoices</Link>
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
    padding: 8px;
    font-size: 14px;
  }
`
