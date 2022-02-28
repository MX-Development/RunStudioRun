import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'
import Label from '../settings/components/Label';
import MemberAvatars from './projects/MemberAvatars';

function ProjectInfo({ projectID }) {

  const [rates, setRates] = useState([
    {
      "id": 1,
      "name": "standard",
      "title": "Standard",
      "rate": 100
    },
    {
      "id": 2,
      "name": "tier_1",
      "title": "Tier 1",
      "rate": 120
    },
    {
      "id": 3,
      "name": "tier_2",
      "title": "Tier 2",
      "rate": 130
    },
    {
      "id": 4,
      "name": "tier_3",
      "title": "Tier 3",
      "rate": 150
    }
  ])

  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState([])
  const [invoices, setInvoices] = useState([])
  const [projectLabels, setProjectLabels] = useState([])
  const [contacts, setContacts] = useState([])

  const fetchLabels = async () => {
    setIsLoading(true);

    try {
      await axios.get(`/json/labels.json`)
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
    axios.get(`/json/estimates/items.json`)
    .then(res => {
      setTeamMembers([])
      res.data.forEach(task => {
       if (task.projectID === parseInt(projectID)) {

        axios.get(`/json/team.json`)
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

  const changeRate = (event) => {
    
  }

  return (
    <Info>
      <Grid container spacing={2}>

        <Grid item xs={5}>
          <h6>Team</h6>
          <MemberAvatars projectID={projectID} />
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    labelId="rate-select-label"
                    id="rate-select"
                    value={1}
                    name={`1`}
                    className="label-select"
                    label="Job rate"
                    onChange={changeRate}
                  >
                    {
                      rates.map(rate => (
                          <MenuItem value={rate.id} key={rate.id}>
                            <Label 
                              type={1} 
                              background={'#fff'} 
                              color={'#B1B0AF'} 
                              border={'1px solid #B1B0AF'}
                              defaultValue={rate.title}
                              name={`label[${rate.id}]`}
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                              }}
                            />
                          </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <h6>Status</h6>
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={1}
                    name={`1`}
                    className="label-select"
                    label="Job status"
                    onChange={changeStatus}
                  >
                    {
                      jobs.map(label => (
                          <MenuItem value={label.id} key={label.id}>
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
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <h6>Action</h6>
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    labelId="action-select-label"
                    id="action-select"
                    value={1}
                    name={`1`}
                    className="label-select"
                    label="Job action"
                    onChange={changeStatus}
                  >
                    {
                      projectLabels.map(label => (
                          <MenuItem value={label.id} key={label.id}>
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
                </FormControl>
              </FormGroup>
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
