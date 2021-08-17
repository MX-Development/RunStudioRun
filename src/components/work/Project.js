import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useHistory, useParams } from "react-router-dom"
import styled from 'styled-components'

import JobScroll from './JobScroll'
import ProjectNav from './ProjectNav'
import NavIcons from './projects/NavIcons'
import ProjectView from './projects/ProjectView'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select, TextareaAutosize } from '@material-ui/core'
import ProjectInfo from './ProjectInfo'
import Jobs from './Jobs'
import ProjectEstimates from './ProjectEstimates'

import ModalBox from '../ModalBox'
import Estimates from './Estimates'
import Purchases from './Purchases'
import Invoices from './Invoices'
import CreateEstimate from './CreateEstimate'

function Project() {

  let { id, view, viewID } = useParams();
  const selectedID = id;

  const history = useHistory();

  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = data => { 
    console.log(selectedData)
  }

  const [selectedData, setSelectedData] = useState(null)

  // useEffect(() => {
  //   if (id) {
  //     const dataSelect = data.filter(obj => {
  //       return obj.id === parseInt(selectedID)
  //     })

  //     setSelectedData(dataSelect[0])
  //   }
  // }, [id]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const jobs = [];

  return (
    <>
      <FormControl component="fieldset">
        <Grid container spacing={6}>

          <Grid item xs={4}>

            <Grid container spacing={2}>
              <Grid item xs={12}>  
                <FormGroup>
                  <FormControl variant="outlined">
                    <Select
                      value={'Select Project'}
                      style={{ width: '100%' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      <MenuItem value={'Select Project'}>Select Project</MenuItem>
                      <MenuItem value={20}>2</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>  
                <div className="text-row">
                  <h4>PREFIX <strong>Project Master</strong></h4>
                </div>
              </Grid>
              <Grid item xs={12}>  
                <div className="text-row">
                  <h4>Comapny Name</h4>
                </div>
              </Grid>
              <Grid item xs={12}>  
                <FormGroup>
                  <FormControl variant="outlined">
                    <Select
                      value={'Who requested the work?'}
                      style={{ width: '100%' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      <MenuItem value={'Who requested the work?'}>Who requested the work?</MenuItem>
                      <MenuItem value={20}>2</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          placeholder="Client Purchase Order Number [Optional]"
                          {...field}
                          value={selectedData ? selectedData.order_nr : null}
                          onChange={handleChange}
                        />
                      )}
                      control={control}
                      name="order_nr"
                    />
                  </FormControl>
                </FormGroup>  
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={4}>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                <ProjectNav />

                <FormGroup>
                  <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Project notes</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          placeholder="Project notes"
                          {...field}
                          value={selectedData ? selectedData.project_notes : null}
                          onChange={handleChange}
                          multiline
                          rows={4}
                        />
                      )}
                      control={control}
                      name="project_notes"
                    />
                  </FormControl>
                </FormGroup>  

                <ProjectInfo />

              </div>

          </Grid>

          <Grid item xs={4}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <NavIcons id={id} />
              <JobScroll />
            </div>
          </Grid>

        </Grid>
      </FormControl>
      
      <Grid container spacing={2} style={{ marginTop: '60px' }}>
        <Grid item xs={12}>
          
          { 
            view === 'jobs' ?
              jobs.length > 0 ? 
              <Jobs projectID={id} />
              : 
              <CreateEstimate id={id} />
            : view === 'estimates' ?
              <Estimates projectID={id} />
            : view === 'purchases' ?
              <Purchases projectID={id} />
            : view === 'invoices' ?
              <Invoices projectID={id} />
            : null
          }


          {/* <ProjectView type={view ? view : 'timeline'} /> */}
          {/* <Jobs /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default Project
