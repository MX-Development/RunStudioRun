import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    name: 'Taso Katsionis',
    phone: '0424 059 513',
    email: 'taso@ak-d.com.au',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  },
  {
    id: 2,
    name: 'Lorem ipsum',
    phone: '0424 059 513',
    email: 'taso@ak-d.com.au',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  },
  {
    id: 3,
    name: 'Mike Hendriks',
    phone: '06 99 99 99 99',
    email: 'mikehendriks94@gmail.com',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  },
  {
    id: 4,
    name: 'Taso Katsionis',
    phone: '0424 059 513',
    email: 'taso@ak-d.com.au',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  },
  {
    id: 5,
    name: 'Lorem ipsum',
    phone: '0424 059 513',
    email: 'taso@ak-d.com.au',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  },
  {
    id: 6,
    name: 'Mike Hendriks',
    phone: '06 99 99 99 99',
    email: 'mikehendriks94@gmail.com',
    company: 'Action Design',
    notes: 'Notes to remember birthday and more...'
  }
];

const columns = [
  { field: 'name', type: 'string', flex: 0.3 },
  { field: 'phone', type: 'string', flex: 0.2 },
  { field: 'email', type: 'string', flex: 0.3 },
  { field: 'company', type: 'string', flex: 0.2 },
  { field: 'notes', type: 'string', flex: 0.4 },
]

function People() {

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
    <List title={'People'} columns={columns} data={data} modalTitle={'Add/Edit People'} modalContent={modalContent} />
  )
}

export default People

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
