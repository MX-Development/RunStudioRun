import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'
import Label from '../../../../../settings/components/Label';
import MemberAvatars from './MemberAvatars';

function ProjectInfo({ project }) {

  console.log('fetch')

  const [jobLabels, setJobLabels] = useState([])
  const [jobs, setJobs] = useState([])
  const [rates, setRates] = useState([])
  const [company, setCompany] = useState([])
  const [projectLabels, setProjectLabels] = useState([])

  const fetchLabels = async () => {

    try {
      await axios.get(`/json/labels.json`)
        .then(res => {
          setJobLabels(res.data[0].jobs);
          setProjectLabels(res.data[0].projects);
        })
      
      axios.get(`/json/companies.json`)
        .then(res => {
          setCompany(res.data.filter(c => c.id === project?.companyId));
        })
      
      axios.get(`/json/jobs.json`)
        .then(res => {
          setJobs(res.data.filter(j => j.projectID === project?.id));
        })

      // Fetch payment terms for the rates
      axios.get(`/json/settings/companySettings/payment_terms.json`)
        .then(res => {
          setRates(res.data.rates);
        })
    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchLabels()
  }, [project]);
  
  const changeValue = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;

    project[name] = value;
  };

  return (
    project ?
    <Info>
      <Grid container spacing={2}>

        <Grid item xs={5}>
          <h6>Team</h6>
          <MemberAvatars projectID={project?.id} />
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <h6>Rate</h6>
              <FormGroup>
                <FormControl>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={project?.rate}
                    name="status"
                    className="label-select"
                    label="Job status"
                    onChange={changeValue}
                  >
                    {
                      rates.map(rate => (
                          <MenuItem value={rate.id} key={rate.id}>
                            <Label 
                              type={project?.rate} 
                              background={'#fff'} 
                              color={'#B1B0AF'} 
                              border={'1px solid #B1B0AF'}
                              defaultValue={rate.title}
                              name={`rate[${rate.id}]`}
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
                <FormControl>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={project?.status}
                    name="status"
                    className="label-select"
                    label="Job status"
                    onChange={changeValue}
                  >
                    {
                      jobLabels.map(label => (
                          <MenuItem value={label.id} key={label.id}>
                            <Label 
                              type={project?.status} 
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
                <FormControl>
                  <Select
                    labelId="action-select-label"
                    id="action-select"
                    value={project?.action}
                    name="action"
                    className="label-select"
                    label="Job action"
                    onChange={changeValue}
                  >
                    {
                      projectLabels.map(label => (
                          <MenuItem value={label.id} key={label.id}>
                            <Label 
                              type={project?.action} 
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
    :
    null
  )
}

export default ProjectInfo

const Info = styled.div`
  background: var(--white);
  padding: 10px;
  border-radius: 2px;
`
