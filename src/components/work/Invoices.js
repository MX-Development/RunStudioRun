import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'

import { MenuItem, Select } from '@material-ui/core'
import Label from '../settings/components/Label';

import ModalContent from '../misc/ModalContent';

import {
  useHistory
} from "react-router-dom"

function Invoices({ projectID, add }) {

  let history = useHistory()

  const [invoices, setInvoices] = useState([])

  const fetchLabels = async () => {

    try {
      await axios.get(`/json/labels.json`)
        .then(res => {
          setInvoices(res.data[0].invoices);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchLabels()
  }, []);

  let { viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`/json/invoices.json`)
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
  }, [projectID]);

  const columns = [
    { field: 'projectInfo', type: 'string', flex: 0.4, headerName: 'Project',
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{
            lineHeight: '1.3'
          }}>{params.row.projectName}</p>
          <p style={{
            lineHeight: '1.3',
            color: '#B1B0AF',
            fontSize: '12px',
            textDecoration: 'underline'
          }}>{params.row.companyName}</p>
        </div>
      )
    },
    { field: 'jobNo', type: 'string', flex: 0.2, headerName: 'Job no.' },
    { field: 'invoice', type: 'string', flex: 0.2 },
    { field: 'description', type: 'string', flex: 0.5, sortable: false },
    { field: 'enteredDate', type: 'string', flex: 0.2, headerName: 'Entered' },
    { field: 'dueDate', type: 'string', flex: 0.2, headerName: 'Due' },
    { field: 'budgeted', type: 'string', flex: 0.2 },
    { field: 'invoiced', type: 'string', flex: 0.2 },
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
          invoices.map(label => (
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
    <h3>Invoice { viewID }</h3>
    :
    <List 
      title={'Invoices'}
      buttons={[
        {
          "label": "Add",
          "action": function() { history.push(`/invoices/add`) }
        },
        {
          "label": "Export to Quickbooks",
          "action": function() { alert('Export...') }
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
      modalTitle={'New Invoice'} 
      modalContent={<ModalContent formElements={modalForm} />} 
      add={add ? true : false} 
    />
  )
}

export default Invoices
