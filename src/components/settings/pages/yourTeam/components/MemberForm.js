import React, { useState } from 'react'
import styled from 'styled-components'

import AvailableHours from '../../yourProfile/components/AvailableHours';

import { useForm } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import {
  Link
} from "react-router-dom"

function MemberForm({ memberAccess, addMember }) {

  const [accessOptions, setAccessOptions] = useState([
    {
      "id": 1,
      "title": "Dashboard",
      "checked": true
    },
    {
      "id": 2,
      "title": "View Jobs",
      "checked": true
    },
    {
      "id": 3,
      "title": "View Estimates",
      "checked": true
    },
    {
      "id": 4,
      "title": "View Purchases",
      "checked": false
    },
    {
      "id": 5,
      "title": "View Invoices",
      "checked": false
    },
    {
      "id": 6,
      "title": "View Contacts",
      "checked": true
    },
    {
      "id": 7,
      "title": "View Reports",
      "checked": true
    },
    {
      "id": 8,
      "title": "View Contacts",
      "checked": false
    },
    {
      "id": 9,
      "title": "Edit Your Profile",
      "checked": false
    }
  ])

  const { handleSubmit } = useForm();

  const onSubmit = data => { 
    console.log(data)
  }

  const handleChange = event => {
    var items = accessOptions;
    items[event.target.id - 1].checked = !items[event.target.id - 1].checked;
    setAccessOptions([...items]);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">

      <Grid container spacing={4}> 
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>  

            <Grid item xs={12} sm={12}> 
              <h4 style={{ fontWeight: '600' }}>Your Profile</h4>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Full Name</FormLabel>
                  <TextField
                    id="full_name"
                    placeholder="First and last name"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Job Title</FormLabel>
                  <TextField
                    id="job_title"
                    placeholder="Are you the leader of the pack?"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Email</FormLabel>
                  <TextField
                    id="email"
                    placeholder="you@somehere.com"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Phone</FormLabel>
                  <TextField
                    id="phone"
                    placeholder="000-000-0000"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Billable rate</FormLabel>
                  <TextField
                    id="billable_rate"
                    placeholder="What are they worth"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Cost rate</FormLabel>
                  <TextField
                    id="cost_rate"
                    placeholder="What it costs us"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            
            <AvailableHours />

          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>  

            <Grid item xs={12} sm={12}>
              <h4 style={{ fontWeight: '600' }}>Change Password</h4>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Current Password</FormLabel>
                  <TextField
                    id="password"
                    placeholder="Don’t choose 1234"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>New Password</FormLabel>
                  <TextField
                    id="new_password"
                    placeholder="We know you chose 1234"
                    variant="outlined"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Confirm Password</FormLabel>
                  <TextField
                    id="confirm_password"
                    placeholder="Remember what you chose?"
                    variant="outlined"
                    helperText="Password strength: strong"
                  />
                </FormControl>
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-gray">Update</button>
              </div>
            </Grid>

          {
            memberAccess ?

              <>
                <Grid item xs={12} sm={12}>
                  <h4 style={{ fontWeight: '600' }}>Team Member Access</h4>
                </Grid>
                {
                  accessOptions ?
                  accessOptions.map((item, index) => (
                    <Grid item xs={4} style={{ padding: '2px' }} key={index}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.checked}
                              onChange={handleChange}
                              id={item.id}
                              name={`item[${index}]`}
                            />
                          }
                          label={item.title}
                        />
                      </FormGroup>
                    </Grid>
                  ))
                  : null
                }
              </>

            : null
          }

          </Grid>
        </Grid>
      </Grid>

      </FormControl>

      <ProfileFooter>
        { addMember ?
        <Link to="/team/add" className="btn btn-light-gray" style={{ marginRight: '12px' }}>Add team member</Link>
        : null }
        <button type="submit" className="btn btn-gold">Save profile</button>
      </ProfileFooter>

    </form>
  )
}

export default MemberForm

const ProfileFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`
