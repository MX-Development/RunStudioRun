import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'

const columns = [
  { field: 'supplier', type: 'string', flex: 0.4 },
  { field: 'jobNo', type: 'string', flex: 0.2, headerName: 'Job no' },
  { field: 'purchase', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'enteredDate', type: 'date', flex: 0.2, headerName: 'Entered' },
  { field: 'dueDate', type: 'string', flex: 0.2, headerName: 'Due' },
  { field: 'approvedDate', type: 'string', flex: 0.2, headerName: 'Approved' },
  { field: 'budget', type: 'number', flex: 0.2 },
  { field: 'status', type: 'number', flex: 0.2 },
]

function Purchases({ projectID }) {

  let { view, viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/purchases.json`)
      .then(res => {
        projectID ? 
          res.data.forEach(item => {
            if (item.projectID === projectID) {
              setData(data => [...data, item])
            }
          })
        :
          setData(res.data)
        }
      )
  }, [projectID]);

  return (
    viewID ? 
    <h3>Purchase { viewID }</h3>
    :
    <List title={'Purchases'} columns={columns} data={data} projectID={projectID} key={projectID} view={view} />
  )
}

export default Purchases
