import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import List from '../layout/tables/List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import {
  useHistory
} from "react-router-dom"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

// Define table columns
const columns = [
  { field: 'fullName', type: 'string', flex: 0.2, headerName: 'Name' },
  { field: 'phone', type: 'string', flex: 0.15 },
  { field: 'email', type: 'string', flex: 0.15 },
  { field: 'companyName', type: 'string', flex: 0.15, headerName: 'Company' },
  { field: 'notes', type: 'string', flex: 0.4 },
]

function People({ add, importing, syncing }) {

  let history = useHistory()

  const [data, setData] = useState([])
  const [companies, setCompanies] = useState([])

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/people.json`)
        .then(res => {
          setData(res.data)

          axios.get(`/json/companies.json`)
            .then(res => {
              setCompanies(res.data)
            })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, [history]);

  // Get person's ID from URL query when a person is selected
  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected company on the front-end
  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === selectedID
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, selectedID, data]);

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value
    });
  }

  // On submit form
  const onSubmit = data => { 
    console.log(selectedData)
  }

  // Delete item from database
  const deleteItem = () => {
    console.log('Delete item with ID: ', selectedData.id);
  }

  // Modal content for syncing
  const modalSync = (
    <>
      <h3 style={{ marginBottom: '10px' }}>Allow Run Studio Run to access your contacts</h3>
      <p>
      Allowing will sync your iCal or Google contacts.
      </p>
      <div className="modal-footer">
        <div className="btn-group">
          <div className="btn-left">
            <button className="btn btn-light-gray btn-left">Cancel</button>
          </div>
          <div className="btn-right">
            <button type="submit" className="btn btn-dark-gray btn-right">Sync now</button>
          </div>
        </div>
      </div>
    </>
  )

  // Modal content for importing through CSV
  const modalImport = (
    <>
      <h3 style={{ marginBottom: '10px' }}>Download and edit our sample CSV file</h3>
      <p>
        Download our CSV template file and add the people you want to import. Once you’re done upload your CSV and check each imported correct.
      </p>
      <div className="modal-footer">
        <div className="btn-group">
          <div className="btn-left">
            <button className="btn btn-light-gray btn-left">Cancel</button>
          </div>
          <div className="btn-right">
            <button type="submit" className="btn btn-dark-gray btn-right">SELECT CSV FILE TO UPLOAD</button>
          </div>
        </div>
      </div>
    </>
  )

  // Modal content for person info
  const modalContent = (      
      
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company</FormLabel>
                <Select
                  value={selectedData ? selectedData.companyName : ''}
                  style={{ width: '100%' }}
                  name="companyName"
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
          <Divider />
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Full Name</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="First and last name"
                      {...field}
                      value={selectedData ? selectedData.fullName : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="fullName"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Email</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="you@somehere.com"
                      {...field}
                      value={selectedData ? selectedData.email : null}
                      onChange={handleChange}
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.phone : null}
                      onChange={handleChange}
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Birthday</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="MM/DD/YYYY"
                      {...field}
                      value={selectedData ? selectedData.birthday : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="birthday"
                />
              </FormControl>
            </FormGroup>
          </Grid>

          <Divider />

          <Grid item xs={12} style={{ paddingBottom: '0' }}>
            <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Communication preferences</FormLabel>
          </Grid>

          <Grid item xs={4} style={{ paddingBottom: '0' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.all : null}
                    onChange={handleChange}
                    name="communicationPrefs.all"
                  />
                }
                label="Select all"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.email : null}
                    onChange={handleChange}
                    name="email"
                  />
                }
                label="Email"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4} style={{ paddingBottom: '0' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.phone_call : null}
                    onChange={handleChange}
                    name="phone_call"
                  />
                }
                label="Phone Call"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.text_sms : null}
                    onChange={handleChange}
                    name="text_sms"
                  />
                }
                label="Text / SMS"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4} style={{ paddingBottom: '0' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.google_chat : null}
                    onChange={handleChange}
                    name="google_chat"
                  />
                }
                label="Google Chat"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.skype_messenger : null}
                    onChange={handleChange}
                    name="skype_messenger"
                  />
                }
                label="Skype / Messenger"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: '0' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.post : null}
                    onChange={handleChange}
                    name="post"
                  />
                }
                label="Post"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} style={{ paddingTop: '0' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedData ? selectedData.communicationPrefs.marketing_emails : null}
                    onChange={handleChange}
                    name="marketing_emails"
                  />
                }
                label="Consent to receiving marketing emails & collateral"
              />
            </FormGroup>
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Notes</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Important things to remember"
                      {...field}
                      value={selectedData ? selectedData.notes : null}
                      multiline
                      rows={4}
                      onChange={handleChange}
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
            <button type="button" className="btn btn-dark-gray btn-right" onClick={() => deleteItem()}>Delete</button>
            <button type="submit" className="btn btn-gold btn-right">Save</button>
          </div>
        </div>
      </div>

    </form>
  )

  return (
    <>
      <List 
        title={'People'} 
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/people/add`) }
          },
          {
            "label": "Export",
            "action": function() { alert('Export...') }
          },
          {
            "label": "Print",
            "action": function() { alert('Print...') }
          }
        ]}
        columns={columns} 
        data={data} 
        modalTitle={importing ? 'Import People' : syncing ? 'Sync contacts' : selectedData ? selectedData.fullName : ''} 
        modalContent={importing ? modalImport : syncing ? modalSync : modalContent} 
        add={add ? true : false} 
        openModal={importing ? true : syncing ? true : false} 
      />
    </>
  )
}

export default People

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--gold);
  margin-top: 10px;
  margin-bottom: 10px;
`

