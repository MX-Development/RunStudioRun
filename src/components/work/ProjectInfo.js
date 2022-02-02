import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar'

import Grid from '@material-ui/core/Grid';

import { MenuItem, Select } from '@material-ui/core'
import Label from '../settings/components/Label';

function ProjectInfo({ projectID }) {

  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState([])
  const [invoices, setInvoices] = useState([])
  const [projectLabels, setProjectLabels] = useState([])
  const [contacts, setContacts] = useState([])

  const fetchLabels = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/labels.json`)
        .then(res => {
          setJobs(res.data[0].jobs);
          setInvoices(res.data[0].invoices);
          setProjectLabels(res.data[0].projects);
          setContacts(res.data[0].contacts);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);

  }

  useEffect(() => {
    fetchLabels()
  }, []);

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
  
  const changeAction = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;
  
    // let newArr = [...data];
    // data.map((project, index) => {
    //   newArr[projectId - 1].action = labelId;
    // });
  
    // setData(newArr);
  };
  
  const changeStatus = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;
  
    // let newArr = [...data];
    // data.map((project, index) => {
    //   newArr[projectId - 1].status = labelId;
    // });
  
    // setData(newArr);
  };

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
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
                name={`1`}
                className="label-select"
                label="Job status"
                onChange={changeStatus}
              >
                {
                  jobs.map(label => (
                    <MenuItem value={label.id}>
                      <Label 
                        type={1} 
                        background={label.background} 
                        color={label.color} 
                        defaultValue={label.title}
                        name={`label[${label.id}]`}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                      />
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
                name={`1`}
                className="label-select"
                label="Job status"
                onChange={changeStatus}
              >
                {
                  projectLabels.map(label => (
                    <MenuItem value={label.id}>
                      <Label 
                        type={1} 
                        background={label.background} 
                        color={label.color} 
                        defaultValue={label.title}
                        name={`label[${label.id}]`}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                      />
                    </MenuItem>
                  ))
                }
              </Select>
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
  background: var(--white);
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
