import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './Labels.css'

import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Label from './Label';

function Labels() {

  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState([])
  const [invoices, setInvoices] = useState([])
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/labels.json`)
        .then(res => {
          setJobs(res.data[0].jobs);
          setInvoices(res.data[0].invoices);
          setProjects(res.data[0].projects);
          setContacts(res.data[0].contacts);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);

  }

  useEffect(() => {
    fetchData()
  }, []);

  const changeLabel = (event) => {    
    const target = event.target;
    const key = target.dataset.id;

    var items = jobs;
    items[key].title = event.target.defaultValue;
    setJobs([...items]);
  }

  return (
    <>
      <LabelContainer>

        { isLoading ?

          'Loading...'
        :

          <>
            <Column>
              <Heading>Jobs</Heading>
              {
                jobs.map((label, index) => (
                  <Label key={index} background={ label.background } color={label.color} onChange={changeLabel} defaultValue={label.title} />
                ))
              }
            </Column>

            <Column>
              <Heading>Invoices</Heading>
              {
                invoices.map((label, index) => (
                  <Label key={index} background={ label.background } color={label.color} onChange={changeLabel} defaultValue={label.title} />
                ))
              }
            </Column>

            <Column>
              <Heading>Projects</Heading>
              {
                projects.map((label, index) => (
                  <Label key={index} background={ label.background } color={label.color} onChange={changeLabel} defaultValue={label.title} />
                ))
              }
            </Column>

            <Column>
              <Heading>Contacts</Heading>
              {
                contacts.map((label, index) => (
                  <Label key={index} background={ label.background } color={label.color} onChange={changeLabel} defaultValue={label.title} />
                ))
              }
            </Column>
          </>

        }

      </LabelContainer>

      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-gold">Save</button>
        </div>
      </Grid>
    </>
  )
}

export default Labels

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Column = styled.div`
  width: 22.5%;
  /* max-height: 250px;
  overflow-y: scroll; */
  padding-right: 1%;

  /* Scrollbar */
  /* ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #DDDBD7;
    border-radius: 100px;
  } */
`

const Heading = styled.div`
  text-transform: uppercase;
  margin-bottom: 8px;
`
