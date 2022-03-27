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

  useEffect(() => {
    setActiveProject(project)
  }, [project]);

  const [activeProject, setActiveProject] = useState(null)

  const [jobLabels, setJobLabels] = useState([])
  const [rates, setRates] = useState([])
  const [projectLabels, setProjectLabels] = useState([])

  const fetchLabels = async () => {

    try {
      await axios.get(`/json/settings/labels.json`)
        .then(res => {
          setJobLabels(res.data[0].jobs);
          setProjectLabels(res.data[0].projects);
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
  }, []);
  
  const changeValue = (event) => {

    console.log(event.target.value);

    setActiveProject({
      ...activeProject,
      [event.target.name]: event.target.value 
    });

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
                    value={activeProject ? activeProject.rate : ''}
                    name="rate"
                    className="label-select"
                    label="Job status"
                    onChange={changeValue}
                  >
                    {
                      rates.map(rate => (
                          <MenuItem value={rate.id} key={rate.id}>
                            <Label 
                              type={activeProject?.rate} 
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
                    value={activeProject ? activeProject.status : ''}
                    name="status"
                    className="label-select"
                    label="Job status"
                    onChange={changeValue}
                  >
                    {
                      jobLabels.map(label => (
                          <MenuItem value={label.id} key={label.id}>
                            <Label 
                              type={activeProject?.status} 
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
                    value={activeProject ? activeProject.action : ''}
                    name="action"
                    className="label-select"
                    label="Job action"
                    onChange={changeValue}
                  >
                    {
                      projectLabels.map(label => (
                          <MenuItem value={label.id} key={label.id}>
                            <Label 
                              type={activeProject?.action} 
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
