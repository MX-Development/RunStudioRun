import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

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

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/invoices.json`)
      .then(res => {
        projectID ? 
          res.data.map(item => {
            if (item.projectID == projectID) {
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

  const modalContent = (          
    <MemberAvatar>
      <Avatar alt="" src="">
        MM
      </Avatar>
      <MemberInfo>
        <h5>Full Name</h5>
        <span>Position</span> 
      </MemberInfo>
    </MemberAvatar>
  )

  return (
    <List title={'Invoices'} columns={columns} data={data} modalTitle={'Add/Edit Invoices'} modalContent={modalContent} />
  )
}

export default Invoices

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
