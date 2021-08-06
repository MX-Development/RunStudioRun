import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    company: 'Bad Boy Burgers',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  },
  {
    id: 2,
    company: 'Bad Boy Burgers',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  },
  {
    id: 3,
    company: 'Bad Boy Burgers',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  }
];

const columns = [
  { field: 'company', type: 'string' },
  { field: 'phone', type: 'string' },
  { field: 'website', type: 'string' },
  { field: 'physical_address', type: 'string' },
  { field: 'notes', type: 'string', flex: 0.3 },
  { field: '', type: 'string', width: 50 }
]

function Companies() {

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
    <List title={'Companies'} columns={columns} data={data} modalTitle={'Add/Edit Company'} modalContent={modalContent} />
  )
}

export default Companies

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
