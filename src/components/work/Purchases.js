import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const columns = [
  { field: 'supplier', type: 'string', flex: 0.4 },
  { field: 'jobNo', type: 'string', flex: 0.2 },
  { field: 'purchase', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'enteredDate', type: 'date', flex: 0.2 },
  { field: 'dueDate', type: 'string', flex: 0.2 },
  { field: 'approvedDate', type: 'string', flex: 0.2 },
  { field: 'budget', type: 'number', flex: 0.2 },
  { field: 'status', type: 'number', flex: 0.2 },
]

function Purchases({ projectID }) {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/purchases.json`)
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

      console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
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
    <List title={'Purchases'} columns={columns} data={data} modalTitle={'Add/Edit Purchases'} modalContent={modalContent} isLoading={isLoading} />
  )
}

export default Purchases

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
