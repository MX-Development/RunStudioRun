import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'

import axios from 'axios'

function SoloAvatar({ memberID, projectID }) {

  const [teamMembers, setTeamMembers] = useState([])
  const [showExtended, setShowExtended] = useState(false)
  const [activeMember, setActiveMember] = useState(null)

  useEffect(() => {
    axios.get(`/json/estimates/items.json`)
      .then(res => {
        setTeamMembers([])
        res.data.forEach(task => {
          if (task.projectId === parseInt(projectID)) {
   
           axios.get(`/json/settings/team.json`)
           .then(res => {
             let members = [];
             res.data.forEach(member => {
               if (members.indexOf(member) === -1) {
                 members.push(member);
               }
             })
   
             setTeamMembers(members)
           })
          }
        })
      })
  }, [projectID])

  const setMember = (id) => {
    setActiveMember(teamMembers.filter(m => m.id === id)[0])
  }
  
  return (
    <Members>
      <Avatar alt={ activeMember?.name } src={ activeMember?.avatar } onClick={() => setShowExtended(!showExtended)}>
        { activeMember ? activeMember.name.charAt(0) : '+'}
      </Avatar>
      <ExtendedMembers className={showExtended ? 'active' : ''}>
      { teamMembers?.map((member, index) => {
        return (
          <Member key={index} onClick={() => setMember(member.id)}>
            <Avatar key={index} alt={ member.name } src={ member.avatar }>
              M
            </Avatar>
            <span>
              { member.name }
            </span>
          </Member>
        )
      })}
      </ExtendedMembers>
    </Members>
  )
}

export default SoloAvatar;

const Members = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;

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