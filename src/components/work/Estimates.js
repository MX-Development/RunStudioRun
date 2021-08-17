import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'
import ProjectEstimates from './ProjectEstimates';
import TestOrder from './TestOrder';

const columns = [
  { field: 'project', type: 'string', flex: 0.4 },
  { field: 'jobNo', type: 'string', flex: 0.2 },
  { field: 'estimate', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'enteredDate', type: 'string', flex: 0.2 },
  { field: 'approved', type: 'number', flex: 0.2 },
  { field: 'budget', type: 'number', flex: 0.2 },
  { field: 'action', type: 'number', flex: 0.2 },
  { field: 'status', type: 'number', flex: 0.2 },
]

function Estimates({ projectID }) {

  let { viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/estimates.json`)
      .then(res => {
        projectID ? 
          res.data.map(item => {
            if (item.projectID == projectID) {
              console.log(viewID)
              console.log(projectID)
              console.log(item.projectID)
              console.log(item)
              setData(data => [...data, item])
            }
          })
        :
          setData(res.data)
        }
      )
  }, []);

  return (
      viewID ? 
      <TestOrder estimateID={viewID} key={1} />
      :
      <List title={'Estimates'} columns={columns} data={data} projectID={projectID} key={projectID} />
  )
}

export default Estimates
