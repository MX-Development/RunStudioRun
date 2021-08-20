import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import axios from 'axios';

import List from '../List'

const columns = [
  { field: 'projectInfo', type: 'string', flex: 0.4,
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
  { field: 'jobNo', type: 'string', flex: 0.2 },
  { field: 'invoice', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'enteredDate', type: 'string', flex: 0.2 },
  { field: 'dueDate', type: 'string', flex: 0.2 },
  { field: 'budgeted', type: 'string', flex: 0.2 },
  { field: 'invoiced', type: 'string', flex: 0.2 },
  { field: 'status', type: 'number', flex: 0.2 },
]

function Invoices({ projectID }) {

  let { view, viewID } = useParams();

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/invocies.json`)
      .then(res => {
        projectID ? 
          res.data.map(item => {
            if (item.projectID == projectID) {
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
    <h3>Invoice { viewID }</h3>
    :
    <List title={'Invoices'} columns={columns} data={data} projectID={projectID} key={projectID} view={view} />
  )
}

export default Invoices
