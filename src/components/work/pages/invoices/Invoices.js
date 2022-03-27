import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../../../layout/tables/List'
import Label from '../../../settings/components/Label';

import { useForm } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

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

  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    // Get all projects
    axios.get(`/json/projects.json`)
      .then(res => {

        let uniqueProjects = [];
        res.data.forEach(p => {
          if (uniqueProjects.indexOf(p) === -1) {
            uniqueProjects.push(p);
          }
        })

        setProjects(uniqueProjects);
      })

    // Get all jobs
    axios.get(`/json/jobs.json`)
      .then(res => {

        setJobs(res.data);
      })
  }, []);

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  // Delete item from database
  const deleteItem = () => {
    console.log('Delete item with ID: ', selectedData.id);
  }

  // Modal content for company info
  const modalContent = (        
      
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Select the Project</FormLabel>
                <Select
                  value={selectedData ? selectedData.projectId : ''}
                  style={{ width: '100%' }}
                  placeholder="Select the Project"
                  name="projectId"
                  onChange={handleChange}
                >
                  <MenuItem value={''} disabled>
                    <em>Select the Project</em>
                  </MenuItem>
                  { 
                    projects ? 
                      projects.map(project => (
                        <MenuItem value={project.id} key={project.id}>{project.projectName}</MenuItem>
                      ))
                    : null
                  }
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Select the Job</FormLabel>
                <Select
                  value={selectedData ? selectedData.jobId : ''}
                  style={{ width: '100%' }}
                  placeholder="Select the Job"
                  name="jobId"
                  onChange={handleChange}
                >
                  <MenuItem value={''} disabled>
                    <em>Select the Project</em>
                  </MenuItem>
                  { 
                    jobs ? 
                      jobs.map(job => (
                        <MenuItem value={job.id} key={job.id}>{job.jobNo}</MenuItem>
                      ))
                    : null
                  }
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>

        </Grid>
      </FormControl>

      <div className="modal-footer">
        <div className="btn-group">
          <div className="btn-left">
            <button className="btn btn-light-gray btn-left">Cancel</button>
          </div>
          <div className="btn-right">
            <button type="submit" className="btn btn-gold btn-right">Save</button>
          </div>
        </div>
      </div>

    </form>
  )

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
      modalContent={modalContent} 
      add={add ? true : false} 
    />
  )
}

export default Invoices
