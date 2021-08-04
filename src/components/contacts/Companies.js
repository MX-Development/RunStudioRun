import React from 'react'
import { DataGrid } from '@material-ui/data-grid';

import PageTitle from '../layout/PageTitle'

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

function Companies() {
  return (
    <>
      <PageTitle title={'Companies'} />
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={[
            { field: 'company', type: 'string' },
            { field: 'phone', type: 'string' },
            { field: 'website', type: 'string' },
            { field: 'physical_address', type: 'string' },
            { field: 'notes', type: 'string', flex: 0.3 },
            { field: '', type: 'string', width: 50 }
          ]}
          rows={data}
          getRowClassName={(params) =>
            `bordered-${params.getValue(params.id, 'status')}`
          }
        />
      </div>
    </>
  )
}

export default Companies
