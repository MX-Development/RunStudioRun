import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';

import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

function JobSelect() {

  const { control } = useForm();
  
  const [openNav, setOpenNav] = useState(false)

  const [tasks, setTasks] = useState([])
  const [teamMembers, setTeamMembers] = useState([])

  const fetchData = async () => {

    try {
      setTasks([])

      await axios.get(`/json/jobs.json`)
        .then(res => {
          let jobs = res.data

          axios.get(`/json/estimates/items.json`)
          .then(res => {
            res.data.forEach(task => {

              let jobNo = task.jobNo
              const job = jobs.filter(obj => {
                return obj.jobNo === jobNo
              })

              task.projectName = job[0].projectName
              setTasks(tasks => [...tasks, task])

              axios.get(`/json/team.json`)
              .then(res => {
                setTeamMembers([])
                res.data.forEach(member => {
                 if (task.team.includes(member.id)) {
                  setTeamMembers(teamMembers => [...teamMembers, member])
                 }
                })
              })
            })
          })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const handleChange = event => {
    setSearchQuery(event.target.value)
  }

  return (
    <Container>
      <SelectButton className={openNav ? 'btn btn-gold' : 'btn'} onClick={(e) => setOpenNav(!openNav)}>Select task</SelectButton>
      <SelectContainer className={openNav ? 'active' : null} id="task-list" onMouseLeave={() => setOpenNav(!openNav)}>
            <FormGroup>
              <FormControl variant="outlined">
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Search..."
                      variant="outlined"
                      {...field}
                      value={searchQuery}
                      onChange={handleChange}
                      autocomplete={false}
                    />
                  )}
                  control={control}
                  name="company"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
      {
        tasks ?
          tasks.map(task => {

            if (task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.projectName.toLowerCase().includes(searchQuery.toLowerCase())) {
              return (
                <SelectItem 
                  className="dragabble-task"
                  title={task.title}
                  data-time={task.time}
                  data-time-worked={task.time_worked}
                  data-description={task.description}
                  data-job-id={task.jobId}
                  data-project-id={task.projectId}
                  data={task.id}
                  key={task.id}
                >
                  <TaskInfo>
                    <p> 
                      { task.title }
                    </p>
                    <span>{ task.projectName ? task.projectName : null }</span>
                  </TaskInfo>
                  <Members>
                    { teamMembers.forEach(member => {
                      if (task.team.includes(member.id)) {
                        return (
                          <Avatar alt={ member.name } src={ member.avatar } key={ member.id }>
                            M
                          </Avatar>
                        )
                      }
                    })}
                  </Members>
                </SelectItem>
              )
            }
          })
        : null
      }
      </SelectContainer>
    </Container>
  )
}

export default JobSelect

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

const SelectContainer = styled.div`
  display: none;
  flex-direction: column;
  max-height: 70vh; 
  background: var(--white);
  padding: 7.5px;
  position: absolute;
  left: -50%;
  top: 32.5px;
  width: 425px;
  align-items: center;
  z-index: 5;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  border-radius: 4px;
  transform: translate(-32.5%, 0);

  &.active {
    display: flex;
  }

  .MuiFormGroup-root {
    width: 100%;
    margin-bottom: 5px;
  }
`

const SelectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 2px;
  border: 1px solid #F4F2F0;
  padding: 10px;
  border-left: 8px solid #FCDB6E;

  &:hover {
    cursor: pointer;
  }
  
  :not(:last-child) {
    margin-bottom: 10px
  }

  p {
    font-weight: 400;
  }

  span {
    color: #B1B0AF;
    text-decoration: underline;
    font-size: 12px;
    font-weight: 500;
  }
`

const SelectButton = styled.div`
  &:hover {
    cursor: pointer;
  }

  &.active {
    background: var(--gold);
  }
`

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Members = styled.div`
  display: flex;

  .MuiAvatar-root {
    width: 40px !important;
    height: 40px !important;
    margin-left: 5px;
  }
`
