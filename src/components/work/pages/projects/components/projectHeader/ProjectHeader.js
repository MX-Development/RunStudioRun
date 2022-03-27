import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, Controller } from "react-hook-form"
import { useHistory, useParams, useLocation } from "react-router-dom"

import axios from 'axios'

import ProjectNav from './ProjectNav'
import NavIcons from './NavIcons'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'
import ProjectInfo from './ProjectInfo'

import ActionIcon from '../../../../../assets/icons/ActionIcon.svg'
import CloseIcon from '../../../../../assets/icons/CloseIcon.svg'
import ProjectNotes from './projectNotes/ProjectNotes'

import SoloAvatar from './SoloAvatar'
import JobScroll from './jobSlider/JobScroll'

function ProjectHeader({ projectID }) {

  const [projectNav, showProjectNav] = useState(false);

  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [company, setCompany] = useState(null)
  const [team, setTeam] = useState([])

  // Fetch projects
  useEffect(() => {
    axios.get(`/json/work/projects.json`)
      .then(res => {
        setProjects(res.data)

        let currentProject = res.data.filter(p => p.id === parseInt(projectID));

        // Set active project on page load
        setActiveProject(currentProject[0]);

        axios.get(`/json/contacts/companies.json`)
          .then(res => {

            // Set company from active project
            let currentCompany = res.data.filter(c => c.id === parseInt(currentProject[0].companyId));
            setCompany(currentCompany[0]);
          })
      })
  }, [projectID]);

  useEffect(() => {
    axios.get(`/json/settings/team.json`)
      .then(res => {
        setTeam(res.data)
      });
  }, []);

  let { id } = useParams();

  const { control } = useForm();

  const location = useLocation();
  const history = useHistory();
  const pagePath = location.pathname.split('/')[3]

  const changeProject = event => {
    console.log(pagePath)
    const projectID = event.target.value
    history.push(`/projects/${projectID}${pagePath ? `/${pagePath}` : ``}`)
  }

  const editProject = (action) => {
    switch (action) {
      case 'rename':
        console.log('Rename');
        break;
      case 'change_company':
        console.log('Change company');
        break;
      case 'duplicate':
        console.log('Duplicate');
        break;
      case 'delete':
        console.log('Delete');
        break;
      default: return
    }
  }

  // On change input fields
  const handleChange = event => {
    setActiveProject({
      ...activeProject,
      [event.target.name]: event.target.value 
    });
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
                    value={projectID}
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
                <h3>{ company?.companyPrefix } <strong>Project Master</strong></h3>
                <PrefixBtn
                  onClick={() => showProjectNav(!projectNav)}>
                    {
                      projectNav ?
                      <img src={CloseIcon} alt="Close icon" style={{ height: '13px' }} />
                      :
                      <img src={ActionIcon} alt="Action icon" style={{ height: '16px' }} />
                    }
                </PrefixBtn>
              </div>
              <ProjectMenu className={projectNav ? 'active' : ''}>
                <NavItem onClick={() => editProject('rename')}>
                  Rename Project
                </NavItem>
                <NavItem onClick={() => editProject('change_company')}>
                  Change Company
                </NavItem>
                <NavItem onClick={() => editProject('duplicate')}>
                  Duplicate Project
                </NavItem>
                <NavItem onClick={() => editProject('delete')}>
                  Delete Project
                </NavItem>
              </ProjectMenu>
            </Grid>
            <Grid item xs={12}>  
              <div className="text-row">
                <h3>{ company?.companyName }</h3>
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
                    placeholder={'Who requested the work?'}
                    value={activeProject ? activeProject.memberRequested : ''}
                    style={{ width: '100%', background: 'var(--white)' }}
                    onChange={handleChange}
                    name="memberRequested"
                  >
                    <MenuItem value="Who requested the work?"> 
                      <em>Who requested the work?</em>
                    </MenuItem>
                    {
                      team ?
                      team.map(member => (
                          <MenuItem value={member.id} key={member.id}>{ member.name }</MenuItem>
                        ))
                      : null
                    }
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <ClientPurchase>
                <FormGroup style={{ display: 'flex' }}>
                  <FormControl variant="outlined">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          placeholder="Client Purchase Order Number [Optional]"
                          {...field}
                          value={activeProject ? activeProject.orderNr : ''}
                          onChange={handleChange}
                          style={{ background: 'var(--white)' }}
                        />
                      )}
                      control={control}
                      name="orderNr"
                    />
                  </FormControl>
                </FormGroup>  
                <SoloAvatar projectID={activeProject?.id} memberID={activeProject?.memberRequested} />
              </ClientPurchase>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={4}>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

              <ProjectNav />

              <ProjectNotes data={activeProject} />

              <ProjectInfo project={activeProject} />

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

const ClientPurchase = styled.div`
  display: flex;

  .MuiFormGroup-root {
    width: 100%;
  }

  .MuiAvatar-root {
    margin-left: 8px;
  }
`
