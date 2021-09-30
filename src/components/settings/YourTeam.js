import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import List from '../List'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';

const columns = [
  { field: 'name', type: 'string', flex: 0.3 },
  { field: 'phone', type: 'string', flex: 0.2 },
  { field: 'email', type: 'string', flex: 0.3 },
  { field: 'company', type: 'string', flex: 0.2 },
  { field: 'notes', type: 'string', flex: 0.4 },
  { field: 'subscription', type: 'string', flex: 0.2 }
]

function YourTeam({ add }) {

  const [user] = useAuthState(auth)

  const [data, setData] = useState([])

  const fetchData = async () => {

    try {
      await axios.get(`https://kendrix.kendrix.website/json/team.json`)
        .then(res => {
          setData(res.data)
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, data, selectedID]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const [state, setState] = useState({
    all: true
  });

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const modalContent = (         
    <>
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
          <h3>Full Name</h3>
          <p>Position</p> 
        </MemberInfo>
      </MemberAvatar>

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">

        <Grid container spacing={4}> 
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>  

              <Grid item xs={12} sm={12}>
                <h3>Your Profile</h3>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Full Name</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          placeholder="First and last name"
                          variant="outlined"
                          {...field}
                          value={selectedData ? selectedData.name : ''}
                          onChange={handleChange}
                        />
                      )}
                      control={control}
                      name="full_name"
                      defaultValue=""
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

              { days.map(day => (
                <Grid item sm={2}>
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

              <Grid item xs={12} sm={12}>
                <h3>Team Member Access</h3>
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

            </Grid>
          </Grid>
        </Grid>

        </FormControl>

      </form>
    </>
  )

  return (
    <>
      <List title={'Your Team'} columns={columns} data={data} modalTitle={'Add/Edit Team Member'} modalContent={modalContent} size={'large'} add={add ? true : false} />
    </>
  )
}

export default YourTeam

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

  > h3 {
    margin-bottom: 5px;
  }
`
