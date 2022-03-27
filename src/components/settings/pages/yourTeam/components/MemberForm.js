import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import AvailableHours from '../../yourProfile/components/AvailableHours';

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

function MemberForm({ memberAccess, addMember, data }) {

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected company on the front-end
  useEffect(() => {
    setSelectedData(data)
  }, [data]);

  const accessOptions = [
    {
      "id": 1,
      "title": "Dashboard",
      "checked": false
    },
    {
      "id": 2,
      "title": "View Jobs",
      "checked": false
    },
    {
      "id": 3,
      "title": "View Estimates",
      "checked": false
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
      "checked": false
    },
    {
      "id": 7,
      "title": "View Reports",
      "checked": false
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
  ]

  const { handleSubmit, control } = useForm();

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  // const handleChange = event => {
  //   var items = accessOptions;
  //   items[event.target.id - 1].checked = !items[event.target.id - 1].checked;
  //   setAccessOptions([...items]);
  // }

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On change team member access checkbox
  const handleAccess = event => {
    const checks = document.querySelectorAll('[name^="item"]');
    let checkedItems = [];
    checks.forEach(item => {
      if (item.checked) {
        if (checkedItems.indexOf(item.id) === -1) {
          checkedItems.push(parseInt(item.id))
        }
      }
    })

    setSelectedData({
      ...selectedData,
      'access': checkedItems
    });
  }

  const updatePassword = event => {
    console.log('Updating password...');
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
                    name="name"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Job Title</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Are you the leader of the pack?"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.jobTitle : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="jobTitle"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Email</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="you@somehere.com"
                        variant="outlined"
                        type="email"
                        {...field}
                        value={selectedData ? selectedData.email : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="email"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Phone</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="000-000-0000"
                        variant="outlined"
                        type="tel"
                        {...field}
                        value={selectedData ? selectedData.phone : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="phone"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Billable rate</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="What are they worth"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.billableRate : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="billableRate"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Cost rate</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="What it costs us"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.costRate : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="costRate"
                    defaultValue=""
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
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Don’t choose 1234"
                        variant="outlined"
                        type="password"
                        {...field}
                        value={selectedData ? selectedData.password : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="password"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>New Password</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="We know you chose 1234"
                        variant="outlined"
                        type="password"
                        {...field}
                        value={selectedData ? selectedData.new_password : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="new_password"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Confirm Password</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Remember what you chose?"
                        variant="outlined"
                        type="password"
                        {...field}
                        value={selectedData ? selectedData.confirm_password : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="confirm_password"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-gray" onClick={() => updatePassword()}>Update</button>
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
                  accessOptions.map((item, index) => {
                    let checked = false;
                    if (selectedData?.access?.includes(item.id)) {
                      checked = true;
                    }
                    return (
                      <Grid item xs={4} style={{ padding: '2px' }} key={index}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleAccess}
                                id={item.id}
                                name={`item[${index}]`}
                              />
                            }
                            label={item.title}
                          />
                        </FormGroup>
                      </Grid>
                    )
                  })
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
