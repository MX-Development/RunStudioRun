import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'
import TestOrder from './TestOrder';
import CreateEstimate from './CreateEstimate'

const columns = [
  { field: 'project', type: 'string', flex: 0.4 },
  { field: 'jobNo', type: 'string', flex: 0.2 },
  { field: 'estimate', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'enteredDate', type: 'string', flex: 0.2, headerName: 'Entered' },
  { field: 'approved', type: 'number', flex: 0.2 },
  { field: 'budget', type: 'number', flex: 0.2 },
  { field: 'action', type: 'number', flex: 0.2 },
  { field: 'status', type: 'number', flex: 0.2 },
]

function Jobs({ projectID }) {

  let { view, viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/jobs.json`)
      .then(res => {
        projectID ? 
          res.data.forEach(item => {
            if (item.projectID === parseInt(projectID)) { 
              setData(data => [...data, item])
            }
          })
        :
          setData(res.data)
        }
      )

      document.querySelector('.app').style.backgroundImage = "none";
  }, [projectID]);

  return (
    viewID ? 
    <TestOrder estimateID={viewID} key={1} />
    :
      data.length > 0 ?
        <List title={'Jobs'} columns={columns} data={data} projectID={projectID} key={projectID} view={view} />
      : 
        <CreateEstimate id={projectID} />
  )
}

export default Jobs
