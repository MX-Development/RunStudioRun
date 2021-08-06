import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    supplier: 'CMYK Hub',
    job_no: 'OCT0919',
    purchase: 'PO1244',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    entered: '1 Sep 2017',
    due: '30 Sep 2017',
    approved: '1 Sep 2017',
    budget: '$2,000.00',
    status: 'READY'
  },
  {
    id: 2,
    supplier: 'CMYK Hub',
    job_no: 'OCT0919',
    purchase: 'PO1244',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    entered: '1 Sep 2017',
    due: '30 Sep 2017',
    approved: '1 Sep 2017',
    budget: '$2,000.00',
    status: 'READY'
  },
  {
    id: 3,
    supplier: 'CMYK Hub',
    job_no: 'OCT0919',
    purchase: 'PO1244',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    entered: '1 Sep 2017',
    due: '30 Sep 2017',
    approved: '1 Sep 2017',
    budget: '$2,000.00',
    status: 'READY'
  },
  {
    id: 4,
    supplier: 'CMYK Hub',
    job_no: 'OCT0919',
    purchase: 'PO1244',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    entered: '1 Sep 2017',
    due: '30 Sep 2017',
    approved: '1 Sep 2017',
    budget: '$2,000.00',
    status: 'READY'
  },
];

const columns = [
  { field: 'supplier', type: 'string', flex: 0.4 },
  { field: 'job_no', type: 'string', flex: 0.2 },
  { field: 'purchase', type: 'string', flex: 0.2 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'entered', type: 'string', flex: 0.2 },
  { field: 'due', type: 'string', flex: 0.2 },
  { field: 'approved', type: 'string', flex: 0.2 },
  { field: 'budget', type: 'string', flex: 0.2 },
  { field: 'status', type: 'string', flex: 0.2 },
]

function Purchases() {

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
    <List title={'Purchases'} columns={columns} data={data} modalTitle={'Add/Edit Purchases'} modalContent={modalContent} />
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
