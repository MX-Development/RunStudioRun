import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import Picker from './components/ColorPicker'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

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
                <Typography gutterBottom variant="h4" style={{ fontWeight: '600' }}>Business Name</Typography>
                <p>
                  Address Line<br/>
                  Second Address Line<br/>
                  Country
                </p>
                <Grid container spacing={0} style={{ marginTop: '1rem' }}>  
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Align Left'}
                      labelPlacement="right"
                      style={{ margin: '0', marginRight: '12.5px' }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Align Left'}
                      labelPlacement="right"
                      style={{ margin: '0', marginRight: '12.5px' }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControlLabel
                      control={<Checkbox checked={true} />}
                      label={'Replace STUDIO'}
                      labelPlacement="right"
                      style={{ margin: '0', marginRight: '12.5px', fontSize: '10px !important' }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Header>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="h4" style={{ fontWeight: '600' }}>App URL</Typography>
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
            <Typography variant="h4" style={{ fontWeight: '600' }}>Company Settings</Typography>
            <Picker />
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
                  multiline
                  rows={4}
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
                      control={<Checkbox checked={true} />}
                      label={'As above'}
                      labelPlacement="right"
                      style={{ margin: '0', marginLeft: '12.5px' }}
                    />
                  </FormGroup>
                </div>
                <TextField
                  id="postal_address"
                  placeholder="Where to post stuff"
                  variant="outlined"
                  multiline
                  rows={4}
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
              <Button color="primary">Test</Button>
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

  /* .MuiTypography-root {
    font-size: 10px !important;
  } */
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
