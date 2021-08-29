import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar'

import Grid from '@material-ui/core/Grid';

function ProjectInfo({ projectID }) {

  const [tasks, setTasks] = useState([])
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    setTasks([])
    axios.get(`https://kendrix.kendrix.website/json/estimates/items.json`)
    .then(res => {
      setTeamMembers([])
      res.data.map(task => {
       if (task.projectID === parseInt(projectID)) {
        setTasks(tasks => [...tasks, task])

        axios.get(`https://kendrix.kendrix.website/json/team.json`)
        .then(res => {
          res.data.map(member => {
            if (task.team.includes(member.id)) {
              setTeamMembers(teamMembers => [...teamMembers, member])
            }
          })
        })
       }
      })
    })
  }, [])

  return (
    <Info>
      <Grid container spacing={2}>

        <Grid item xs={5}>
          <h6>Team</h6>
          <Members>
            { teamMembers ? teamMembers.map(member => {
              return (
                <Avatar alt={ member.name } src={ member.avatar }>
                  M
                </Avatar>
              )
            }) : null}
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

const Members = styled.div`
  display: flex;

  .MuiAvatar-root {
    width: 30px !important;
    height: 30px !important;
    margin-left: 5px;
  }
`
