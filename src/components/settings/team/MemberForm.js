import React, { useState } from 'react'
import styled from 'styled-components'

import AvailableHours from '../profile/components/AvailableHours';

import { useForm, Controller } from "react-hook-form"

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

function MemberForm() {

  const { handleSubmit, control } = useForm();

  const onSubmit = data => { 
    console.log(data)
  }

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  const [selectedData, setSelectedData] = useState(null)

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const [state, setState] = useState({
    all: true
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">

      <Grid container spacing={4}> 
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>  

            <Grid item xs={12} sm={12}> 
              <h5>Your Profile</h5>
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
              <h5>Change Password</h5>
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

            <Grid item xs={12} sm={12}>
              <h5>Team Member Access</h5>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="Dashboard"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Jobs"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Estimates"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Purchases"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Invoices"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Contacts"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Reports"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="View Contacts"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4} style={{ padding: '2px' }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.all}
                      onChange={handleChange}
                      name="all"
                    />
                  }
                  label="Edit Your Profile"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-gray">Update</button>
              </div>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

      </FormControl>

      <ProfileFooter>
        <Link to="/team/add" className="btn btn-light-gray" style={{ marginRight: '12px' }}>Add team member</Link>
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
