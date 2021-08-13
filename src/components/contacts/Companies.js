import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import List from '../List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

const data = [
  {
    id: 1,
    company: 'Bad Boy Burgers 1',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  },
  {
    id: 2,
    company: 'Bad Boy Burgers 2',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  },
  {
    id: 3,
    company: 'Bad Boy Burgers 3',
    phone: '02 8123 1234',
    website: 'www.bbburgers.com.au',
    physical_address: 'Chatswood NSW',
    notes: 'These are notes to help with managing the client. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo…'
  }
];

const columns = [
  { field: 'company', type: 'string' },
  { field: 'phone', type: 'string' },
  { field: 'website', type: 'string' },
  { field: 'physical_address', type: 'string' },
  { field: 'notes', type: 'string', flex: 0.3 },
  { field: '', type: 'string', width: 50 }
]

function Companies() {

  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control, setValue } = useForm();
  const onSubmit = data => console.log(data);

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const modalContent = (        
      
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Company</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Business Name"
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.company : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="company"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.phone : ''}
                    />
                  )}
                  control={control}
                  name="phone"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Alternative Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.alt_phone : null}
                    />
                  )}
                  control={control}
                  name="alt_phone"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Website</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Interwebs"
                      {...field}
                      value={selectedData ? selectedData.website : null}
                    />
                  )}
                  control={control}
                  name="website"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Physical Address</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where people can see you"
                      {...field}
                      value={selectedData ? selectedData.physical_address : null}
                    />
                  )}
                  control={control}
                  name="physical_address"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Postal Address</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where to post stuff"
                      {...field}
                      value={selectedData ? selectedData.postal_address : null}
                    />
                  )}
                  control={control}
                  name="postal_address"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Company Tax Number</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Australian business number (ABN) or equivalent (VAT)"
                      {...field}
                      value={selectedData ? selectedData.company_tax_number : null}
                    />
                  )}
                  control={control}
                  name="company_tax_number"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Notes</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Important things to remember"
                      {...field}
                      value={selectedData ? selectedData.notes : null}
                    />
                  )}
                  control={control}
                  name="notes"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={9}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Company Prefix</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Add a 3 letter representation of the company"
                      {...field}
                      value={selectedData ? selectedData.prefix : null}
                    />
                  )}
                  control={control}
                  name="prefix"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={3}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Rate</FormLabel>
                <Select
                  value={'Rate'}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>

        </Grid>
      </FormControl>

      <div className="modal-footer">
        <div className="btn-group">
          <div className="btn-left">
            <button className="btn btn-light-gray btn-left">Cancel</button>
          </div>
          <div className="btn-right">
            <button type="submit" className="btn btn-dark-gray btn-right">Delete</button>
            <button className="btn btn-gold btn-right">Save</button>
          </div>
        </div>
      </div>

    </form>
  )

  return (
    <List title={'Companies'} columns={columns} data={data} modalTitle={'Add/Edit Company'} modalContent={modalContent} />
  )
}

export default Companies

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
