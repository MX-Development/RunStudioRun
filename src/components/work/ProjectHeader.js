import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useHistory, useParams, useLocation } from "react-router-dom"

import axios from 'axios'

import JobScroll from './JobScroll'
import ProjectNav from './ProjectNav'
import NavIcons from './projects/NavIcons'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select, TextareaAutosize } from '@material-ui/core'
import ProjectInfo from './ProjectInfo'

function ProjectHeader() {

  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/projects.json`)
      .then(res => {
        setProjects(res.data)
      })
  }, []);

  let { id, view, viewID } = useParams();

  const { handleSubmit, control, setValue } = useForm();

  const [selectedData, setSelectedData] = useState(null)

  const onSubmit = data => { 
    console.log(selectedData)
  }

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const location = useLocation();
  const history = useHistory();
  const pagePath = location.pathname.split('/')[3]

  const changeProject = event => {
    console.log(pagePath)
    const projectID = event.target.value
    history.push(`/projects/${projectID}${pagePath ? `/${pagePath}` : ``}`)
  }

  return (
    <FormControl component="fieldset">
      <Grid container spacing={6}>

        <Grid item xs={4}>

          <Grid container spacing={2}>
            <Grid item xs={12}>  
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    value={''}
                    style={{ width: '100%' }}
                    onChange={changeProject}
                  >
                    <MenuItem value="">
                      <em>Select project</em>
                    </MenuItem>
                    {
                      projects ?
                        projects.map(project => (
                          <MenuItem value={project.projectID} key={project.id}>{ project.projectName }</MenuItem>
                        ))
                      : null
                    }
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
  )
}

export default ProjectHeader
