import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Link
} from "react-router-dom"

import TimelineIcon from '../../assets/icons/TimelineIcon.svg'
import BookIcon from '../../assets/icons/BookIcon.svg'
import DiscIcon from '../../assets/icons/DiscIcon.svg'
import EyeIcon from '../../assets/icons/EyeIcon.svg'

function NavIcons({ id }) {

  const [activeNav, setActiveNav] = useState(null)
  
  return (
    <Icons>
      <Link to={`/projects/${id}/timeline`} onClick={(e) => setActiveNav('timeline')} className={activeNav === 'timeline' ? 'active' : ''}>
        <img src={TimelineIcon} alt="timeline icon" />
      </Link>
      <Link to={`/projects/${id}/book`} onClick={(e) => setActiveNav('book')} className={activeNav === 'book' ? 'active' : ''}>
        <img src={BookIcon} alt="book icon" />
      </Link>
      <Link to={`/projects/${id}/disc`} onClick={(e) => setActiveNav('disc')} className={activeNav === 'disc' ? 'active' : ''}>
        <img src={DiscIcon} alt="disc icon" />
      </Link>
      <Link to={`/projects/${id}/eye`} onClick={(e) => setActiveNav('eye')} className={activeNav === 'eye' ? 'active' : ''}>
        <img src={EyeIcon} alt="eye icon" />
      </Link>
    </Icons>
  )
}

export default NavIcons

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  > a {
    margin-left: 10px;
  }

  > a.active img {
    fill: red;
  }
`
