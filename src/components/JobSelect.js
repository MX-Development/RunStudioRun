import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import moment from 'moment'

function JobSelect() {
  
  const [openNav, setOpenNav] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([])

  const fetchData = async () => {
    setIsLoading(true);

    try {
      setTasks([])

      await axios.get(`https://kendrix.kendrix.website/json/jobs.json`)
        .then(res => {
          let jobs = res.data

          axios.get(`https://kendrix.kendrix.website/json/estimates/items.json`)
          .then(res => {
            res.data.map(task => {

              let jobId = task.jobId
              const job = jobs.filter(obj => {
                return obj.id === jobId
              })

              task.projectName = job[0].projectName
              setTasks(tasks => [...tasks, task])
            })
          })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      <SelectButton className={openNav ? 'btn btn-gold' : 'btn'} onClick={(e) => setOpenNav(!openNav)}>Select job</SelectButton>
      <SelectContainer className={openNav ? 'active' : null} id="task-list">
      {
        tasks ?
          tasks.map(task => (
            <SelectItem 
              className="dragabble-task"
              title={task.title}
              data-time={moment.duration(task.time, "minutes").asSeconds()}
              data={task.id}
              key={task.id}
            >
              <p>
                { task.title }
              </p>
              <span>{ task.projectName ? task.projectName : null }</span>
            </SelectItem>
          ))
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
  background: #fff;
  padding: 15px;
  position: absolute;
  left: -50%;
  top: 32.5px;
  width: 250px;
  align-items: center;
  z-index: 5;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  border-radius: 4px;
  transform: translate(-22.5%, 0);

  &.active {
    display: flex;
  }
`

const SelectItem = styled.div`
  width: 100%;
  border-radius: 2px;
  border: 1px solid #F4F2F0;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
  
  :not(:last-child) {
    margin-bottom: 10px
  }

  > p {
    font-weight: 400;
  }

  > span {
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
