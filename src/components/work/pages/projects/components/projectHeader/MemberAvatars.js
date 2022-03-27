import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'

import axios from 'axios'

function MemberAvatars({ projectID, solo }) {

  const [teamMembers, setTeamMembers] = useState([])
  const [showExtended, setShowExtended] = useState(false)

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

          console.log(members);

          setTeamMembers(members)
        })
       }
      })
    })
  }, [projectID])
  
  return (
    <Members>
      { teamMembers?.map((member, index) => {
        if (index > 2) return false;
        return (
          <Avatar key={index} alt={ member.name } src={ member.avatar } onClick={solo ? () => setShowExtended(!showExtended) : null}>
            M
          </Avatar>
        )
      })}
      <Avatar className="open-ext" style={{ fontSize: '12px' }} onClick={() => setShowExtended(!showExtended)}>
        +{teamMembers.length - 3}
      </Avatar>
      <ExtendedMembers className={showExtended ? 'active' : ''}>
      { teamMembers ? teamMembers.map((member, index) => {
        if (index < 3) return false;
        return (
          <Member key={index}>
            <Avatar key={index} alt={ member.name } src={ member.avatar }>
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
  justify-content: flex-start;

  .MuiAvatar-root {
    width: 30px !important;
    height: 30px !important;
    margin-left: 5px;
  }

  .open-ext {
    &:hover {
      cursor: pointer;
    }
  }
`

const ExtendedMembers = styled.div`
  position: absolute;
  left: 82.5%;
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

  span {
    margin-left: 8px;
    white-space: nowrap;
  }
`