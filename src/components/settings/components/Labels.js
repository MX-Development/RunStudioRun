import React from 'react'
import styled from 'styled-components'
import './Labels.css'

import Grid from '@material-ui/core/Grid';

function Labels() {

  const jobs = [
    {
      "title": "Ready",
      "color": "#B1B0AF"
    },
    {
      "title": "Live",
      "color": "#76C939"
    },
    {
      "title": "Ongoing",
      "color": "#1AA81A"
    },
    {
      "title": "Completed",
      "color": "#2376FA"
    },
    {
      "title": "On hold",
      "color": "#A55EA2"
    },
    {
      "title": "Cancelled",
      "color": "#000000"
    }
  ]

  const invoices = [
    {
      "title": "Open",
      "color": "#B1B0AF"
    },
    {
      "title": "Ready",
      "color": "#B1B0AF"
    },
    {
      "title": "Approved",
      "color": "#B1B0AF"
    },
    {
      "title": "Exported",
      "color": "#B1B0AF"
    }
  ]

  const projects = [
    {
      "title": "No status",
      "color": "#F4F2F0"
    },
    {
      "title": "No rush",
      "color": "#F4F2F0"
    },
    {
      "title": "Urgent",
      "color": "#F4F2F0"
    },
    {
      "title": "Planning",
      "color": "#F4F2F0"
    },
    {
      "title": "Briefing",
      "color": "#F4F2F0"
    },
    {
      "title": "Review",
      "color": "#F4F2F0"
    },
    {
      "title": "Planning",
      "color": "#F4F2F0"
    },
    {
      "title": "Briefing",
      "color": "#F4F2F0"
    },
    {
      "title": "Review",
      "color": "#F4F2F0"
    }
  ]

  const contacts = [
    {
      "title": "Supplier",
      "color": "#7F5E8B"
    },
    {
      "title": "Client",
      "color": "#A0C485"
    },
    {
      "title": "Prospect",
      "color": "#75A0E6"
    },
    {
      "title": "Ex-supplier",
      "color": "#B1B0AF"
    },
    {
      "title": "Ex-client",
      "color": "#B1B0AF"
    },
    {
      "title": "Prospect lost",
      "color": "#B1B0AF"
    },
  ]

  return (
    <>
      <LabelContainer>

        <Column>
          <Heading>Jobs</Heading>
          {
            jobs.map(label => (
              <Label style={{ background: label.color}}>{label.title}</Label>
            ))
          }
        </Column>

        <Column>
          <Heading>Invoices</Heading>
          {
            invoices.map(label => (
              <Label style={{ background: label.color}}>{label.title}</Label>
            ))
          }
        </Column>

        <Column>
          <Heading>Projects</Heading>
          {
            projects.map(label => (
              <Label style={{ background: label.color, color: '#3C3C3C' }}>{label.title}</Label>
            ))
          }
        </Column>

        <Column>
          <Heading>Contacts</Heading>
          {
            contacts.map(label => (
              <Label style={{ background: label.color}}>{label.title}</Label>
            ))
          }
        </Column>

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
  max-height: 250px;
  overflow-y: scroll;
  padding-right: 1%;

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #DDDBD7;
    border-radius: 100px;
  }
`

const Heading = styled.div`
  text-transform: uppercase;
  margin-bottom: 8px;
`

const Label = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  padding: 6px 0;
  text-align: center;
  border-radius: 2px;
  margin-bottom: 8px;
`
