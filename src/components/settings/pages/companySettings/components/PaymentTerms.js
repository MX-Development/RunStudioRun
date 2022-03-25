import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { useForm, Controller } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function PaymentTerms() {

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/companySettings/payment_terms.json`)
        .then(res => {
          setSelectedData(res.data)
          console.log(res.data);
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

    // First part of name attribute
    let nameSubject = event.target.name.split(`['`)[0];
    let item = event.target.name.split(`']`)[0].split(`['`)[1];
    let subject = selectedData[nameSubject];

    let items = {...subject};

    items[item] = event.target.checked;

    setSelectedData({
      ...selectedData,
      [nameSubject]: items
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

          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['30_invoice_date'] : null} />}
                label="30 days from invoice date"
                onChange={changePostal}
                name="terms['30_invoice_date']"
              /> 
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['30_invoice_eom'] : null} />}
                label="30 days from end of month"
                onChange={changePostal}
                name="terms['30_invoice_eom']"
              /> 
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['14_invoice_date'] : null} />}
                label="14 days from invoice date"
                onChange={changePostal}
                name="terms['14_invoice_date']"
              /> 
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['7_invoice_date'] : null} />}
                label="7 days from invoice date"
                onChange={changePostal}
                name="terms['7_invoice_date']"
              /> 
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['cod'] : null} />}
                label="COD / Payment prior to delivery"
                onChange={changePostal}
                name="terms['cod']"
              /> 
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.terms['other'] : null} />}
                label="Other"
                onChange={changePostal}
                name="terms['other']"
              /> 
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormGroup>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="Other"
                    {...field}
                    value={selectedData?.otherContent}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="otherContent"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h5>Rates</h5>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Standard</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="Other"
                    {...field}
                    value={selectedData?.standard}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="standard"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 1</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="Other"
                    {...field}
                    value={selectedData?.tier_1}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="tier_1"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 2</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="Other"
                    {...field}
                    value={selectedData?.tier_2}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="tier_2"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 3</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="Other"
                    {...field}
                    value={selectedData?.tier_3}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="tier_3"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h5>Tax</h5>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="GST/VAT %"
                    {...field}
                    value={selectedData?.vat}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="vat"
              />
            </FormGroup>
          </Grid>

        </Grid>
      </FormControl>

    </form>
  )
}

export default PaymentTerms
