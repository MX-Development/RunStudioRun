import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import BusinessLogo from '../assets/img/business-logo.svg'
import { MenuItem, Select } from '@material-ui/core';

function BusinessInformation() {

  const { handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
                <h3>Business Name</h3>
                <p>
                  Address Line<br/>
                  Second Address Line<br/>
                  Country
                </p>
              </div>
            </Header>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h3>App URL</h3>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <TextField
                  id="app_url"
                  placeholder="https://akd.app.runstudiorun.net"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Company Settings</h3>
            <ColorPicker>
              <span>Your Colour</span>
              <Color />
            </ColorPicker>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Country</FormLabel>
                <Select
                  value={age}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Currency</FormLabel>
                <Select
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Name</FormLabel>
                <TextField
                  id="company_name"
                  placeholder="This is what appears on your paperwork"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Alternative Phone</FormLabel>
                <TextField
                  id="alt_phone"
                  placeholder="000-000-0000"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Physical Address</FormLabel>
                <TextField
                  id="physical_address"
                  placeholder="Where people can see you"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Postal Address</FormLabel>
                <TextField
                  id="postal_address"
                  placeholder="Where to post stuff"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Tax Number (Appears on Estimates & Invoices)</FormLabel>
                <TextField
                  id="tax_nr"
                  placeholder="Australian business number (ABN) or equivalent (VAT)"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Website</FormLabel>
                <TextField
                  id="website"
                  placeholder="Interwebs"
                  variant="outlined"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Prefix</FormLabel>
                <TextField
                  id="website"
                  placeholder="Add a 3 letter representation of the company"
                  variant="outlined"
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
    }

    img {
      width: 100%;
    }
  }

  > .business-info {
    margin-left: 15px;
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

const ColorPicker = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
    font-size: 12px;
    font-weight: 100;
  }
`

const Color = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #FCDB6E;
`