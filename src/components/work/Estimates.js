import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'

import { MenuItem, Select } from '@material-ui/core'
import Label from '../settings/components/Label';
import ProjectEstimates from './projects/dragAndDrop/ProjectEstimates';

import ModalContent from '../misc/ModalContent';

import {
  useHistory
} from "react-router-dom"

function Estimates({ projectID, add }) {

  let history = useHistory()

  const [projectLabels, setProjectLabels] = useState([])

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchLabels = () => {
  
      try {
        axios.get(`/json/labels.json`)
          .then(res => {
            setProjectLabels(res.data[0].projects);
          })
  
          axios.get(`/json/estimates.json`)
            .then(res => {
              projectID ? 
                res.data.forEach((item, index) => {
                  if (index === 0) document.querySelector('.app').style.backgroundImage = "none";
                  if (item.projectID === parseInt(projectID)) {
                    setData(data => [...data, item])
                  }
                })
              :
                setData(res.data)
              }
            )
      } catch (err) {
        console.trace(err);
      }
  
    }
    fetchLabels()
  }, [projectID]);

  let { view, viewID } = useParams();

  const columns = [
    { field: 'projectName', type: 'string', flex: 0.4, headerName: 'Project' },
    { field: 'jobNo', type: 'string', flex: 0.15, headerName: 'Job no.' },
    { field: 'estimate', type: 'string', flex: 0.15 },
    { field: 'description', type: 'string', flex: 0.5, sortable: false },
    { field: 'enteredDate', type: 'string', flex: 0.2, headerName: 'Entered' },
    { field: 'approvedDate', type: 'string', flex: 0.2, headerName: 'Approved' },
    { field: 'budget', type: 'number', flex: 0.15 },
    { field: 'action', type: 'string', flex: 0.15,
    renderCell: (params) => (  
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={params.row.action}
        className="label-select"
        name={`${params.row.id}`}
        label="Job status"
        onChange={changeAction}
      >
        {
          projectLabels.map(label => (
            <MenuItem value={label.id}>
              <Label 
                type={params.row.action} 
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
    ) },
    { field: 'status', type: 'string', flex: 0.15,
    renderCell: (params) => (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={params.row.status}
        name={`${params.row.id}`}
        className="label-select"
        label="Job status"
        onChange={changeStatus}
      >
        {
          jobs.map(label => (
            <MenuItem value={label.id}>
              <Label 
                type={params.row.status} 
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
    )},
  ]
  
  const changeAction = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;
  
    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].action = labelId;
    });
  
    setData(newArr);
  };
  
  const changeStatus = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;
  
    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].status = labelId;
    });
  
    setData(newArr);
  };

















  


  const [projects, setProjects] = useState([])
  const jobs = [
    {
      "value": "job_1",
      "label": "Job 1"
    },
    {
      "value": "job_2",
      "label": "Job 2"
    }
  ]
  useEffect(() => {
    // Get all projects
    axios.get(`/json/projects.json`)
      .then(res => {

        // Add each project to the projects array
        res.data.forEach(project => {
          setProjects(projects => [...projects, {
            "value": project.id,
            "label": project.projectName
          }]);
        })
      })
  }, []);

  const modalForm = [
    {
      "columns": 12,
      "type": "select",
      "label": "Select the Project",
      "name": "project",
      "placeholder": "Select...",
      "value": "Select...",
      "options": projects
    },
    {
      "columns": 12,
      "type": "select",
      "label": "Select the Job",
      "name": "job",
      "placeholder": "Select...",
      "value": "Select...",
      "options": jobs
    }
  ] 

  return (
      viewID ? 
      <ProjectEstimates estimateID={viewID} />
      :
      <List 
        title={'Estimates'}
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/estimates/add`) }
          },
          {
            "label": "Print",
            "action": function() { alert('Print...') }
          }
        ]}
        columns={columns} 
        data={data} 
        projectID={projectID} 
        key={projectID} 
        view={view} 
        modalTitle={'New Estimates'} 
        modalContent={<ModalContent formElements={modalForm} />} 
        add={add ? true : false} 
      />
  )
}

export default Estimates
