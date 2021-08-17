import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    project: 'CMYK Hub',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'SELECT',
    status: 'ONGOING'
  },
  {
    id: 2,
    project: 'CMYK Hub',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'SELECT',
    status: 'ONGOING'
  },
  {
    id: 3,
    project: 'CMYK Hub',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'SELECT',
    status: 'ONGOING'
  },
  {
    id: 4,
    project: 'CMYK Hub',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'SELECT',
    status: 'ONGOING'
  },
];

const columns = [
  { field: 'project', type: 'string', flex: 0.4 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'team', type: 'string', flex: 0.1 },
  { field: 'entered', type: 'string', flex: 0.2 },
  { field: 'dueDate', type: 'string', flex: 0.2 },
  { field: 'action', type: 'string', flex: 0.2 },
  { field: 'status', type: 'string', flex: 0.2 },
]

function Jobs() {

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
    <List title={'Jobs'} columns={columns} data={data} />
  )
}

export default Jobs

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
