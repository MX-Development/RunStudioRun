import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

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

import ModalBox from '../ModalBox'

const columns = [
  { field: 'fullName', type: 'string', flex: 0.3 },
  { field: 'phone', type: 'string', flex: 0.2 },
  { field: 'email', type: 'string', flex: 0.3 },
  { field: 'companyName', type: 'string', flex: 0.2 },
  { field: 'notes', type: 'string', flex: 0.4 },
]

function People({ add }) {

  const [openModal, setOpenModal] = useState(false)

  const [data, setData] = useState([])
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/people.json`)
      .then(res => {
        setData(res.data)
      })
    axios.get(`https://kendrix.kendrix.website/json/companies.json`)
      .then(res => {
        setCompanies(res.data)
      })

      if (add) {
        setOpenModal(!openModal)
      }
  }, []);

  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control, setValue } = useForm();
  const onSubmit = data => console.log(data);

  const [selectedData, setSelectedData] = useState(null)

  const [commPreferences, setCommPreferences] = useState({
    all: false,
    marketing_emails: false,
    email: false,
    phone_call: false,
    google_chat: false,
    post: false,
    text_sms: true,
    skype_messenger: false
  });

  useEffect(() => {
    if (id) {
      console.log(selectedID)
      console.log(id)
      const dataSelect = data.filter(obj => {
        return obj.id == selectedID
      })

      setSelectedData(dataSelect[0])
      console.log(dataSelect[0])

      setCommPreferences({
        all: true,
        phone_call: true
      })
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
                <Select
                  value={selectedData ? selectedData.companyName : ''}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>Select a company</em>
                  </MenuItem>
                  { 
                    companies ? 
                      companies.map(company => (
                        <MenuItem value={company.companyName} key={company.id}>{company.companyName}</MenuItem>
                      ))
                    : null
                  }
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Job Title</FormLabel>
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
                  name="job_title"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Full Name</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="First and last name"
                      {...field}
                      value={selectedData ? selectedData.fullName : ''}
                    />
                  )}
                  control={control}
                  name="full_name"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Email</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="you@somehere.com"
                      {...field}
                      value={selectedData ? selectedData.email : null}
                    />
                  )}
                  control={control}
                  name="email"
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
                      value={selectedData ? selectedData.phone : null}
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
                <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Birthday</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="MM/DD/YYYY"
                      {...field}
                      value={selectedData ? selectedData.birthday : null}
                    />
                  )}
                  control={control}
                  name="birthday"
                />
              </FormControl>
            </FormGroup>
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <h3>Communication Preferences</h3>
          </Grid>

          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.all}
                    onChange={handleChange}
                    name="all"
                  />
                }
                label="Select all"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.marketing_emails}
                    onChange={handleChange}
                    name="marketing_emails"
                  />
                }
                label="Consent to receiving marketing emails & collateral"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.email}
                    onChange={handleChange}
                    name="email"
                  />
                }
                label="Email"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.phone_call}
                    onChange={handleChange}
                    name="phone_call"
                  />
                }
                label="Phone Call"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.google_chat}
                    onChange={handleChange}
                    name="google_chat"
                  />
                }
                label="Google Chat"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.post}
                    onChange={handleChange}
                    name="post"
                  />
                }
                label="Post"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.text_sms}
                    onChange={handleChange}
                    name="text_sms"
                  />
                }
                label="Text / SMS"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commPreferences.skype_messenger}
                    onChange={handleChange}
                    name="skype_messenger"
                  />
                }
                label="Skype / Messenger"
              />
            </FormGroup>
          </Grid>

          <Divider />

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
    <>
      <ModalBox modalOpened={openModal} modalTitle={'Add/Edit People'}>
        { modalContent }
      </ModalBox>
      <List title={'People'} columns={columns} data={data} modalTitle={'Add/Edit People'} modalContent={modalContent} />
    </>
  )
}

export default People

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--gold);
  margin-top: 10px;
`
