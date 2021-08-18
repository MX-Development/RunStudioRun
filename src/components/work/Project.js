import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"

import Estimates from './Estimates'
import Purchases from './Purchases'
import Invoices from './Invoices'
import CreateEstimate from './CreateEstimate'
import ProjectHeader from './ProjectHeader'
import Jobs from './Jobs'

import Grid from '@material-ui/core/Grid';

function Project() {

  let { id, view, viewID } = useParams();
  const selectedID = id;

  const jobs = [];

  return (
    <>
      <ProjectHeader />
      
      <Grid container spacing={2} style={{ marginTop: '60px' }}>
        <Grid item xs={12}>
          
          { 
            view === 'jobs' ?
              jobs.length > 0 ? 
              <Jobs projectID={id} />
              : 
              <CreateEstimate id={id} />
            : view === 'estimates' ?
              <Estimates projectID={id} />
            : view === 'purchases' ?
              <Purchases projectID={id} />
            : view === 'invoices' ?
              <Invoices projectID={id} />
            : null
          }


          {/* <ProjectView type={view ? view : 'timeline'} /> */}
          {/* <Jobs /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default Project
