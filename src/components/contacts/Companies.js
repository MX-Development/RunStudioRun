import React, { useEffect, useState } from 'react'

import Picker from '../settings/components/ColorPicker'

import axios from 'axios';

import List from '../layout/tables/List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import {
  useHistory
} from "react-router-dom"

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

// Define table columns
const columns = [
  { field: 'companyName', type: 'string', headerName: 'Company', flex: 0.2 },
  { field: 'phone', type: 'string', flex: 0.15 },
  { field: 'website', type: 'string', flex: 0.15 },
  { field: 'physicalAddress', type: 'string', headerName: 'Physical Address', flex: 0.15 },
  { field: 'notes', type: 'string', flex: 0.4 }
]

function Companies({ add, importing }) {

  let history = useHistory()

  const [data, setData] = useState([])

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/companies.json`)
        .then(res => {
          setData(res.data)
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, [history]);

  // Get company's ID from URL query when a company is selected
  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected company on the front-end
  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, data, selectedID]);

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On change checkbox for postal address same as physical address
  const changePostal = (event) => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.checked 
    });
  }

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  // Delete item from database
  const deleteItem = () => {
    console.log('Delete item with ID: ', selectedData.id);
  }

  // Modal content for importing CSV file
  const modalImport = (
    <>
      <h3 style={{ marginBottom: '10px' }}>Download and edit our sample CSV file</h3>
      <p>
        Download our CSV template file and add the companies you want to import. Once you’re done upload your CSV and check each imported correct.
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

  // Modal content for company info
  const modalContent = (        
      
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Business Name"
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.companyName : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="companyName"
                  defaultValue=""
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
                      value={selectedData ? selectedData.phone : ''}
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Alternative Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.altPhone : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="altPhone"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Website</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Interwebs"
                      {...field}
                      value={selectedData ? selectedData.website : null}
                      onChange={handleChange}
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Physical Address</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where people can see you"
                      {...field}
                      value={selectedData ? selectedData.physicalAddress : null}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      name="physicalAddress"
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Postal Address</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={selectedData ? selectedData.postalSame : null} />}
                      label={'As above'}
                      labelPlacement="end"
                      style={{ margin: '0', marginLeft: '12.5px' }}
                      onChange={changePostal}
                      name="postalSame"
                    />
                  </FormGroup>
                </div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where to post stuff"
                      {...field}
                      onChange={handleChange}
                      disabled={selectedData ? selectedData.postalSame : null}
                      value={selectedData ? selectedData.postalSame ? selectedData.physicalAddress : selectedData.postalAddress : null}
                      multiline
                      rows={4}
                      name="postalAddress"
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Tax Number</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Australian business number (ABN) or equivalent (VAT)"
                      {...field}
                      value={selectedData ? selectedData.companyTaxNumber : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="companyTaxNumber"
                />
              </FormControl>
            </FormGroup>
          </Grid>
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
                      onChange={handleChange}
                      multiline
                      rows={4}
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
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Prefix</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Add a 3 letter representation of the company"
                      {...field}
                      value={selectedData ? selectedData.companyPrefix : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="companyPrefix"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={3}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                <Select
                  value={selectedData ? selectedData.rate : null}
                  style={{ width: '100%' }}
                  name="rate"
                  onChange={handleChange}
                >
                  <MenuItem value={''}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"100"}>100</MenuItem>
                  <MenuItem value={"120"}>120</MenuItem>
                  <MenuItem value={"130"}>130</MenuItem>
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
        title={'Companies'}  
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/companies/add`) }
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
        modalTitle={importing ? 'Import Companies' : 'Add/Edit Company'} 
        modalAction={<Picker position={'bottom'} />}
        modalContent={importing ? modalImport : modalContent} 
        add={add ? true : false} 
        openModal={importing || id !== undefined ? true : false} 
      />
    </>
  )
}

export default Companies
