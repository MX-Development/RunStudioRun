import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm, Controller } from "react-hook-form"

import axios from 'axios';

import ColorPicker from '../../../components/ColorPicker'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import BusinessLogo from '../../../../assets/img/business-logo.svg'
import { MenuItem, Select } from '@material-ui/core';

function BusinessInformation() {

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)
  const [countries, setCountries] = useState(null)
  const [currencies, setCurrencies] = useState(null)

  // Fetch data from JSON files
  const fetchData = () => {
    try {
      axios.get(`/json/settings/companySettings/company_settings.json`)
        .then(res => {
          setSelectedData(res.data)
        })

      axios.get(`/json/countries.json`)
        .then(res => {
          setCountries(res.data)
        })

      axios.get(`/json/currencies.json`)
        .then(res => {
          setCurrencies(res.data)
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, []);

  const { handleSubmit, control } = useForm();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12} sm={12}>
            <Header>
              <div className="business-image">
                <UploadContainer>
                  <img src={BusinessLogo} alt="logo" />
                  <UploadFilter>
                    <span>Upload</span>
                  </UploadFilter>
                </UploadContainer>
                <small>Image size 000 x 000 px (JPG/PNG)</small>
              </div>
              <div className="business-info">
                <h4 className="gutterBottom" style={{ fontWeight: '600' }}>{ selectedData?.companyName }</h4>
                <p>
                  { selectedData?.physicalAddress }
                </p>
                <Grid container spacing={0} style={{ marginTop: '1rem' }}>  
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Align Left'}
                      labelPlacement="end"
                      style={{ margin: '0', marginRight: '12.5px' }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Align Right'}
                      labelPlacement="end"
                      style={{ margin: '0', marginRight: '12.5px' }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Replace STUDIO'}
                      labelPlacement="end"
                      style={{ margin: '0', marginRight: '12.5px', fontSize: '10px !important' }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Header>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h4 style={{ fontWeight: '600' }}>App URL</h4>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <TextField
                  id="app_url"
                  placeholder={`https://akd.app.runstudiorun.net`}
                  variant="outlined"
                  value={`https://${selectedData?.companyPrefix.toLowerCase()}.app.runstudiorun.net`}
                />
              </FormControl>
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ fontWeight: '600' }}>Company Settings</h4>
            <ColorPicker />
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Country</FormLabel>
                <Select
                  value={selectedData?.country}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  { countries?.map((c, index) => (
                    <MenuItem key={index} value={c.code}>{ c.name }</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Currency</FormLabel>
                <Select
                  value={selectedData?.currency}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  { currencies?.map((c, index) => (
                    <MenuItem key={index} value={c.cc}>{ c.cc }</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Name</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="This is what appears on your paperwork"
                      variant="outlined"
                      {...field}
                      value={selectedData?.companyName}
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
                      placeholder="000-000-0000"
                      variant="outlined"
                      type="tel"
                      {...field}
                      value={selectedData?.phone}
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
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Alternative Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="000-000-0000"
                      variant="outlined"
                      type="tel"
                      {...field}
                      value={selectedData?.altPhone}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="altPhone"
                  defaultValue=""
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
                      placeholder="Where people can see you"
                      variant="outlined"
                      {...field}
                      multiline
                      rows={4}
                      value={selectedData?.physicalAddress}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="physicalAddress"
                  defaultValue=""
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
                      placeholder="Where to post stuff"
                      variant="outlined"
                      {...field}
                      rows={4}
                      disabled={selectedData ? selectedData.postalSame : null}
                      value={selectedData ? selectedData.postalSame ? selectedData.physicalAddress : selectedData.postalAddress : null}
                      multiline
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="postalAddress"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Tax Number (Appears on Estimates & Invoices)</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Australian business number (ABN) or equivalent (VAT)"
                      variant="outlined"
                      {...field}
                      value={selectedData?.companyTaxNumber}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="companyTaxNumber"
                  defaultValue=""
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
                      placeholder="Interwebs"
                      variant="outlined"
                      {...field}
                      value={selectedData?.website}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="website"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Prefix</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Add a 3 letter representation of the company"
                      variant="outlined"
                      {...field}
                      value={selectedData?.companyPrefix}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="companyPrefix"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">Save</button>
            </div>
          </Grid>

        </Grid>
      </FormControl>

    </form>
  )
}

export default BusinessInformation

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  > .business-image {
    display: flex;
    flex-direction: column;
    
    > small {
      margin-top: 10px;
      font-size: 12px;
    }

    img {
      width: 100%;
    }
  }

  > .business-info {
    margin-left: 15px;

    p {
      font-size: 14px;
    }
  }

  .MuiCheckbox-root {
    padding: 0;
    margin-right: 5px;
  }
`

const UploadContainer = styled.div`
  position: relative;
  display: flex;
`

const UploadFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &:hover {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    cursor: pointer;
  }

  > span {
    margin-top: 3px;
  }
`
