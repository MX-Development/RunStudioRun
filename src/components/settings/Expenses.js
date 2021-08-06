import React from 'react'
import styled from 'styled-components'

import List from '../List'

import Avatar from '@material-ui/core/Avatar';

const data = [
  {
    id: 1,
    expense: 'Digital Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 2,
    expense: 'Digital Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 3,
    expense: 'Digital Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 4,
    expense: 'Digita l Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  }
];

const columns = [
  { field: 'expense', type: 'string', flex: 0.3 },
  { field: 'description', type: 'string', flex: 0.6 },
  { field: 'cost', type: 'string', flex: 0.2 },
  { field: 'markup', type: 'string', flex: 0.2 },
  { field: 'sell', type: 'string', flex: 0.3 }, 
]

function Expenses() {

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
    <List title={'Expenses'} columns={columns} data={data} modalTitle={'Add/Edit Expenses'} modalContent={modalContent} />
  )
}

export default Expenses

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
