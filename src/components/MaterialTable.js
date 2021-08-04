import React from 'react'
import { DataGrid } from '@material-ui/data-grid';

const rows = [
  {
    id: 1,
    title: 'OCT0919 - Credentials Document',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited...',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'Select',
    status: 'yellow',
  },
  {
    id: 2,
    title: 'OCT0919 - Credentials Document',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited...',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'Select',
    status: 'blue',
  },
  {
    id: 3,
    title: 'OCT0919 - Credentials Document',
    description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited...',
    team: 'Team',
    entered: '1 Sep 2017',
    dueDate: '30 Sep 2017',
    action: 'Select',
    status: 'green',
  }
];

function MaterialTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={[
          { field: 'title', type: 'string', flex: 0.4 },
          { field: 'description', type: 'string', flex: 0.5 },
          { field: 'team', type: 'string' },
          { field: 'entered', type: 'date' },
          { field: 'dueDate', type: 'date' },
          { field: 'action', type: 'string' },
          { field: 'status', type: 'string' }
        ]}
        rows={rows}
        getRowClassName={(params) =>
          `bordered-${params.getValue(params.id, 'status')}`
        }
      />
    </div>
  )
}

export default MaterialTable
