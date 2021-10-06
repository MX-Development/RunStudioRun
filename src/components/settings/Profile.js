import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import styled from 'styled-components'

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

import PageTitle from '../layout/PageTitle'

import Avatar from '@material-ui/core/Avatar';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

function Profile() {

  const [user] = useAuthState(auth)

  const { handleSubmit, control } = useForm();

  const onSubmit = data => { 
    console.log(data)
  }

  const [state, setState] = useState({
    job_nr_req: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  return (
    <>
      <PageTitle title={'Your Profile'} />

      <ProfileContainer>   

        <MemberAvatar>
          <AvatarContainer>
            <Avatar alt={ user?.displayName } src={ user?.photoURL }>
              { user?.displayName.charAt(0) } 
            </Avatar>
            <Overlay onClick={(e) => uploadAvatar()}>
              <span>Upload</span>
            </Overlay>
          </AvatarContainer>
          <MemberInfo>
            <h5>Full Name</h5>
            <p>Position</p> 
          </MemberInfo>
        </MemberAvatar>

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
                
                <Grid item xs={12} sm={12}>
                  <h5 style={{ marginTop: '16px' }}>Hours I’m available to work</h5>
                </Grid>

                { days.map((day, index) => (
                  <Grid item sm={2} key={index}>
                    <>
                    <FormGroup>
                      { state.type }
                      <FormControlLabel
                        control={<Checkbox checked={true} name={`day_${day}`} />}
                        label={day[0].toUpperCase() + day.substring(1)}
                        labelPlacement="top"
                        style={{ margin: '0' }}
                      />
                    </FormGroup>
                    <FormControl variant="outlined">
                      <Controller
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            {...field}
                            value={0}
                            onChange={handleChange}
                          />
                        )}
                        control={control}
                        name={`day_hours_${day}`}
                      />
                    </FormControl>
                    </>
                  </Grid>
                ))}

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
        
      </ProfileContainer>
    </>
  )
}

export default Profile

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`

const AvatarContainer = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  border-radius: 50%;
  transition: opacity .25s ease-in-out;
  z-index: 5;
  color: #fff;

  > span {
    font-size: 14px;
  }

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > h5 {
    margin-bottom: 5px;
    font-weight: bold;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  width: 66.6%;

  h5 {
    font-weight: bold;
  }
`

const ProfileFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`
