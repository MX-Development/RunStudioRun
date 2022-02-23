import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, Controller } from "react-hook-form"
import { useHistory, useParams, useLocation } from "react-router-dom"

import axios from 'axios'

import ProjectNav from './ProjectNav'
import NavIcons from './projects/NavIcons'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'
import ProjectInfo from './ProjectInfo'

import ActionIcon from '../assets/icons/ActionIcon.svg'
import CloseIcon from '../assets/icons/CloseIcon.svg'
import ProjectNotes from './projects/projectHeader/projectNotes/ProjectNotes'

import Avatar from '@material-ui/core/Avatar'
import MemberAvatars from './projects/MemberAvatars'
import JobScroll from './projects/projectHeader/jobSlider/JobScroll'

function ProjectHeader({ projectID }) {

  const [projectNav, showProjectNav] = useState(false);

  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/projects.json`)
      .then(res => {
        setProjects(res.data)
      })
  }, []);

  let { id } = useParams();

  const { control } = useForm();

  const [selectedData, setSelectedData] = useState(null)

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
      <Grid container spacing={5}>

        <Grid item xs={4}>

          <Grid container spacing={2}>
            <Grid item xs={12}>  
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    value={'Select project'}
                    style={{ width: '100%', background: 'var(--white)' }}
                    onChange={changeProject}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                      },
                      getContentAnchorEl: null
                    }}
                  >
                    <MenuItem value="Select project">
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
            <Grid item xs={12} style={{ position: 'relative' }}>  
              <div className="text-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>PREFIX <strong>Project Master</strong></h3>
                <PrefixBtn
                  onClick={() => showProjectNav(!projectNav)}>
                    {
                      projectNav ?
                      <img src={CloseIcon} alt="Close icon" onClick={() => console.log('clicked')} style={{ height: '13px' }} />
                      :
                      <img src={ActionIcon} alt="Action icon" onClick={() => console.log('clicked')} style={{ height: '16px' }} />
                    }
                </PrefixBtn>
              </div>
              <ProjectMenu className={projectNav ? 'active' : ''}>
                <NavItem>
                  Rename Project
                </NavItem>
                <NavItem>
                  Change Company
                </NavItem>
                <NavItem>
                  Duplicate Project
                </NavItem>
                <NavItem>
                  Delete Project
                </NavItem>
              </ProjectMenu>
            </Grid>
            <Grid item xs={12}>  
              <div className="text-row">
                <h3>Company Name</h3>
              </div>
            </Grid>
            <Grid item xs={12}>  
              <FormGroup>
                <FormControl variant="outlined">
                  <Select
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                      },
                      getContentAnchorEl: null
                    }}
                    value={'Who requested the work?'}
                    style={{ width: '100%', background: 'var(--white)' }}
                  >
                    <MenuItem value="Who requested the work?"> 
                      <em>Who requested the work?</em>
                    </MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={10}>
              <FormGroup style={{ display: 'flex' }}>
                <FormControl variant="outlined">
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Client Purchase Order Number [Optional]"
                        {...field}
                        value={selectedData ? selectedData.order_nr : ''}
                        onChange={handleChange}
                        style={{ background: 'var(--white)' }}
                      />
                    )}
                    control={control}
                    name="order_nr"
                  />
                </FormControl>
              </FormGroup>  
            </Grid>
            <Grid item xs={2}>
              <MemberAvatars projectID={projectID} solo={true} />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={4}>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

              <ProjectNav />

              <ProjectNotes data={selectedData} />

              <ProjectInfo projectID={projectID} />

            </div>

        </Grid>

        <Grid item xs={4}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <NavIcons id={id} />
            <JobScroll projectID={projectID} />
          </div>
        </Grid>

      </Grid>
    </FormControl>
  )
}

export default ProjectHeader

const ProjectMenu = styled.div`
  display: none;
  padding: 5px;
  background: var(--white);
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  position: absolute;
  right: 0;
  transform: translate(100%, -67.5%);
  z-index: 2;

  &.active {
    display: block;
  }
`

const NavItem = styled.div`
  padding: 7.5px 10px;
  font-size: 15px;
  color: #292724;
  font-size: 14px;
  transition: background .25s ease-in, color .25s ease-in;

  &:hover {
    cursor: pointer;
    background: #F4F2F0;
    transition: background .25s ease-in, color .25s ease-in;
  }
`

const PrefixBtn = styled.div`
  width: 30px;
  border-left: 1px solid rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;

  &:hover {
    cursor: pointer;
  }
`
