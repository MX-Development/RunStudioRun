import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar'

import Grid from '@material-ui/core/Grid';

function ProjectInfo() {

  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/team.json`)
    .then(res => {
      setTeamMembers([])
      res.data.map(member => {
      //  if (task.team.includes(member.id)) {
        setTeamMembers(teamMembers => [...teamMembers, member])
      //  }
      })
    })
  }, [])

  return (
    <Info>
      <Grid container spacing={2}>

        <Grid item xs={5}>
          <h6>Team</h6>
          <TeamContainer>
            <Avatar alt="" src="">
              M
            </Avatar>
            <Avatar alt="" src="">
              M
            </Avatar>
            <Avatar alt="" src="">
              M
            </Avatar>
            <Avatar alt="" src="">
              M
            </Avatar>
            <Avatar alt="" src="">
              M
            </Avatar>
          </TeamContainer>
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

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > .MuiAvatar-root {
    width: 25px !important;
    height: 25px !important;
    font-size: 12px;
  }
`

const Info = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 2px;
`