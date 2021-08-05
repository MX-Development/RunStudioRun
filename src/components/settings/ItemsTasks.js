import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  },
  {
    id: 2,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  },
  {
    id: 3,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  }
];

const columns = [
  { field: 'item', type: 'string', flex: 0.3 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'rate', type: 'string', flex: 0.1 },
  { field: 'tier_1', type: 'string', flex: 0.1, headerName: 'Tier 1' },
  { field: 'tier_2', type: 'string', flex: 0.1, headerName: 'Tier 2' },
  { field: 'tier_3', type: 'string', flex: 0.1, headerName: 'Tier 3' }
]

function ItemsTasks() {

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
    <List title={'Items & Tasks'} columns={columns} data={data} modalTitle={'Add/Edit Item & Task'} modalContent={modalContent} />
  )
}

export default ItemsTasks

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
