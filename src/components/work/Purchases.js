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

function Purchases({ projectID, add }) {

  let history = useHistory()

  const [isLoading, setIsLoading] = useState(false);

  const [jobLabels, setJobLabels] = useState([])
  const [invoices, setInvoices] = useState([])
  const [projectLabels, setProjectLabels] = useState([])
  const [contacts, setContacts] = useState([])
  const [purchases, setPurchases] = useState([])

  const fetchLabels = async () => {
    setIsLoading(true);

    try {
      await axios.get(`/json/labels.json`)
        .then(res => {
          setJobLabels(res.data[0].jobs);
          setInvoices(res.data[0].invoices);
          setProjectLabels(res.data[0].projects);
          setContacts(res.data[0].contacts);
          setPurchases(res.data[0].purchases);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);

  }

  useEffect(() => {
    fetchLabels()
  }, []);

  let { view, viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`/json/purchases.json`)
      .then(res => {
        projectID ? 
          <>
          {
            res.data.forEach((item, index) => {
              if (index === 0) document.querySelector('.app').style.backgroundImage = "none";
              if (item.projectID === parseInt(projectID)) {
                setData(data => [...data, item])
              }
            })
          }
          </>
        :
          setData(res.data)
        }
      )
  }, [projectID]);

  const columns = [
    { field: 'supplier', type: 'string', flex: 0.4 },
    { field: 'jobNo', type: 'string', flex: 0.2, headerName: 'Job no.' },
    { field: 'purchase', type: 'string', flex: 0.2 },
    { field: 'description', type: 'string', flex: 0.5, sortable: false },
    { field: 'enteredDate', type: 'date', flex: 0.2, headerName: 'Entered' },
    { field: 'dueDate', type: 'string', flex: 0.2, headerName: 'Due' },
    { field: 'approvedDate', type: 'string', flex: 0.2, headerName: 'Approved' },
    { field: 'budget', type: 'number', flex: 0.2 },
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
          purchases.map(label => (
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
    data.map((project, index) => {
      newArr[projectId - 1].status = labelId;
    });
  
    setData(newArr);
  };

















  


  const [projects, setProjects] = useState([])
  const [jobs, setJobs] = useState([
    {
      "value": "job_1",
      "label": "Job 1"
    },
    {
      "value": "job_2",
      "label": "Job 2"
    }
  ])
  useEffect(async () => {
    // Get all projects
    let result = axios.get(`/json/projects.json`)
      .then(res => {

        // Add each project to the projects array
        res.data.map(project => {
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
    <h3>Purchase { viewID }</h3>
    :
    <List 
      title={'Purchases'} 
      buttons={[
        {
          "label": "Add",
          "action": function() { history.push(`/purchases/add`) }
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
      modalTitle={'New Purchase'} 
      modalContent={<ModalContent formElements={modalForm} />} 
      add={add ? true : false} 
    />
  )
}

export default Purchases
