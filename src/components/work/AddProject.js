import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'

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
import { MenuItem, Select } from '@material-ui/core'

function AddProject() {

  let { id, view } = useParams();
  const selectedID = id;

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

  return (
    <>
      <form className="inline-blocks">

        <div className="form-block">
          <div className="form-group">
            <select className="form-control" id="gender">
              <option selected disabled value="-">Select Project</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="form-group small-gap">
            <div className="text-row">
              <h4>PREFIX <strong>Project Master</strong></h4>
            </div>
          </div>
          <div className="form-group small-gap">
            <div className="text-row">
              <h4>Company Name</h4>
            </div>
          </div>
          <div className="form-group small-gap">
            <select className="form-control" id="gender">
              <option selected disabled value="-">Who requested the work…</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="form-group small-gap">
            <input className="form-control" placeholder="Client Purchase Order Number [Optional]" id="order_nr" />
          </div>
        </div>

        <div className="form-block">
          <ProjectNav />
          <div className="form-group">
            <label htmlFor="name">Project notes</label>
            <textarea className="form-control" placeholder="Enter the job description and if you’d like the client to understand what you will be working on tick to publish this description in your estimate." id="project_notes" rows="5" />
          </div>
          <div className="form-group">
            <select className="form-control" id="gender">
              <option selected disabled value="-">Select Project</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          <ProjectInfo>
            <InfoBlock>
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
            </InfoBlock>
            <InfoBlock>
              <h6>Rate</h6>
              <Button>
                Standard
              </Button>
            </InfoBlock>
            <InfoBlock>
              <h6>Status</h6>
              <Button>
                SELECT
              </Button>
            </InfoBlock>
            <InfoBlock>
              <h6>Action</h6>
              <Button>
                SELECT
              </Button>
            </InfoBlock>
          </ProjectInfo>
        </div>

        <div className="form-block">
          <NavIcons id={id} />
          <JobScroll />
        </div>

      </form>
      <ProjectView type={view ? view : 'timeline'} />
    </>
  )
}

export default AddProject

const ProjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;

  > h6 { 
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 5px;
  }
`

const Button = styled.div`
  border: 1px solid;
  border-radius: 2px;
  padding: 5px;
  font-weight: bold;
`

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.4;

  > .MuiAvatar-root {
    flex: 0.2;
  }
`
