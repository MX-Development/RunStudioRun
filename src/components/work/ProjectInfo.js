import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar'

import Grid from '@material-ui/core/Grid';

function ProjectInfo({ projectID }) {

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
    <Info>
      <Grid container spacing={2}>

        <Grid item xs={5}>
          <h6>Team</h6>
          <Members>
            { teamMembers ? teamMembers.map((member, index) => {
              if (index > 2) return false;
              return (
                <Avatar alt={ member.name } src={ member.avatar }>
                  M
                </Avatar>
              )
            }) : null}
            <Avatar className="open-ext" onClick={() => setShowExtended(!showExtended)}>
              +
            </Avatar>
            <ExtendedMembers className={showExtended ? 'active' : ''}>
            { teamMembers ? teamMembers.map((member, index) => {
              if (index < 2) return false;
              return (
                <Avatar alt={ member.name } src={ member.avatar }>
                  M
                </Avatar>
              )
            }) : null}
            </ExtendedMembers>
          </Members>
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <Button>
                Standard
              </Button>
            </Grid>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <Button>
                Standard
              </Button>
            </Grid>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <Button>
                Standard
              </Button>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Info>
  )
}

export default ProjectInfo

const Button = styled.div`
  border: 1px solid;
  border-radius: 2px;
  padding: 5px 0;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
`

const Info = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 2px;
`

const Members = styled.div`
  position: relative;
  display: flex;

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
  right: 10px;
  top: 40px;
  display: none;

  &.active {
    display: flex;
    flex-direction: column;
  }

  > .MuiAvatar-root {
    margin-bottom: 5px;
  }
`
