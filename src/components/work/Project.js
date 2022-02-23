import React from 'react'
import { useParams } from "react-router-dom"

import Estimates from './Estimates'
import Purchases from './Purchases'
import Invoices from './Invoices'
import ProjectHeader from './ProjectHeader'
import Jobs from './Jobs'
import ProjectView from './projects/ProjectView'

import Grid from '@material-ui/core/Grid';

function Project() {

  let { id, view } = useParams();

  const jobs = [];

  return (
    <>
      <ProjectHeader projectID={id} />
      
      <Grid container spacing={2} style={{ marginTop: '60px' }}>
        <Grid item xs={12}>
          
          { 
            view === 'jobs' ?
            jobs.length > 0 ? 
            null
              : 
              <>
                <Jobs projectID={id} />
              </>
            : view === 'estimates' ? 
              <Estimates projectID={id} />
            : view === 'purchases' ?
              <Purchases projectID={id} />
            : view === 'invoices' ?
              <Invoices projectID={id} />
            : null
          }


          <ProjectView type={view ? view : 'timeline'} />
          {/* <Jobs /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default Project
