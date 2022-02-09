import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'

import axios from 'axios'

function MemberAvatars({ projectID, solo }) {

  const [teamMembers, setTeamMembers] = useState([])
  const [showExtended, setShowExtended] = useState(false)

  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/estimates/items.json`)
    .then(res => {
      setTeamMembers([])
      res.data.forEach(task => {
       if (task.projectID === parseInt(projectID)) {

        axios.get(`https://kendrix.kendrix.website/json/team.json`)
        .then(res => {
          res.data.forEach(member => {
            if (task.team.includes(member.id)) {
              setTeamMembers(teamMembers => [...teamMembers, member])
            }
          })
        })
       }
      })
    })
  }, [projectID])
  
  return (
    <Members>
      { teamMembers ? teamMembers.map((member, index) => {
        if (index > 0 && solo) return false;
        if (index > 3) return false;
        return (
          <Avatar alt={ member.name } src={ member.avatar } onClick={solo ? () => setShowExtended(!showExtended) : null}>
            M
          </Avatar>
        )
      }) : null}
      {/* { !solo ?
      <Avatar className="open-ext" onClick={() => setShowExtended(!showExtended)}>
        +
      </Avatar>
      :  null
      } */}
      <ExtendedMembers className={showExtended ? 'active' : ''}>
      { teamMembers ? teamMembers.map((member, index) => {
        if (index < 2) return false;
        return (
          <Member>
            <Avatar alt={ member.name } src={ member.avatar }>
              M
            </Avatar>
            <span>
              { member.name }
            </span>
          </Member>
        )
      }) : null}
      </ExtendedMembers>
    </Members>
  )
}

export default MemberAvatars;

const Members = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  .MuiAvatar-root {
    width: 30px !important;
    height: 30px !important;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  .open-ext {
    &:hover {
      cursor: pointer;
    }
  }
`

const ExtendedMembers = styled.div`
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%, 0);
  display: none;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,0.25);
  width: auto;
  z-index: 5;
  border-radius: 2px;
  padding: 5px;

  &.active {
    display: flex;
    flex-direction: column;
  }

  > .MuiAvatar-root {
    margin-bottom: 5px;
  }
`

const Member = styled.div`
  display: flex;
  align-items: center;
  padding: 7.5px 10px;
  color: #292724;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background: #F4F2F0;
    -webkit-transition: background .25s ease-in,color .25s ease-in;
    transition: background .25s ease-in,color .25s ease-in;
  }

  span {
    margin-left: 8px;
    white-space: nowrap;
  }
`