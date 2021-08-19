import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import PageTitle from '../layout/PageTitle'

import Avatar from '@material-ui/core/Avatar';

function Profile() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const [state, setState] = useState({
    job_nr_req: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <PageTitle title={'Your Profile'} />

      <ProfileContainer>   

        <MemberAvatar>
          <Avatar alt="" src="">
            MM
          </Avatar>
          <MemberInfo>
            <h5>Full Name</h5>
            <span>Position</span> 
          </MemberInfo>
        </MemberAvatar>

        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl component="fieldset">

          <Grid container spacing={2}> 
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>  

                <Grid item xs={12} sm={12}>
                  <h3>Your Profile</h3>
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
                
                <Grid item xs={12} sm={12}>
                  <h3>Hours I’m available to work</h3>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>  

                <Grid item xs={12} sm={12}>
                  <h3>Change Password</h3>
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

              </Grid>
            </Grid>
          </Grid>

          </FormControl>

        </form>
        
      </ProfileContainer>
    </>
  )
}

export default Profile

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  width: 66.6%;
`

const DaysAvailable = styled.div`
  display: flex;
  justify-content: space-between;
`

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`
