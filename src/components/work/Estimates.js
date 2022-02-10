import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'
import TestOrder from './TestOrder';

import { MenuItem, Select } from '@material-ui/core'
import Label from '../settings/components/Label';

function Estimates({ projectID }) {

  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState([])
  const [invoices, setInvoices] = useState([])
  const [projectLabels, setProjectLabels] = useState([])
  const [contacts, setContacts] = useState([])

  const fetchLabels = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/labels.json`)
        .then(res => {
          setJobs(res.data[0].jobs);
          setInvoices(res.data[0].invoices);
          setProjectLabels(res.data[0].projects);
          setContacts(res.data[0].contacts);
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
    axios.get(`https://kendrix.kendrix.website/json/estimates.json`)
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
    data.map((project, index) => {
      newArr[projectId - 1].action = labelId;
    });
  
    setData(newArr);
  };
  
  const changeStatus = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;
  
    let newArr = [...data];
    data.map((project, index) => {
      newArr[projectId - 1].status = labelId;
    });
  
    setData(newArr);
  };

  return (
      viewID ? 
      <TestOrder estimateID={viewID} key={1} />
      :
      <List 
        title={'Estimates'}
        buttons={[
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
      />
  )
}

export default Estimates
