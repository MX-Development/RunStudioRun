import React from 'react'
import { useForm } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function PaymentTerms() {

  const { handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const [state, setState] = React.useState({
    job_nr_req: true,
    job_nr_auto: true,
    job_nr_combo: false,

    time_grid: true,
    min_15: false,
    min_30: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  

          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_req} onChange={handleChange} name="job_nr_req" />}
                label="30 days from invoice date"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_auto} onChange={handleChange} name="job_nr_auto" />}
                label="30 days from end of month"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_combo} onChange={handleChange} name="job_nr_combo" />}
                label="14 days from invoice date"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_req} onChange={handleChange} name="job_nr_req" />}
                label="7 days from invoice date"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_auto} onChange={handleChange} name="job_nr_auto" />}
                label="COD / Payment prior to delivery"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_combo} onChange={handleChange} name="job_nr_combo" />}
                label="Other"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormGroup>
              <TextField
                id="other"
                placeholder="Other"
                variant="outlined"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h3>Rates</h3>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Standard</FormLabel>
            <FormGroup row>
              <TextField
                id="job_nr"
                placeholder="$100"
                variant="outlined"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 1</FormLabel>
            <FormGroup row>
              <TextField
                id="estimate_nr"
                placeholder="$100"
                variant="outlined"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 2</FormLabel>
            <FormGroup row>
              <TextField
                id="invoice_nr"
                placeholder="$100"
                variant="outlined"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>Tier 3</FormLabel>
            <FormGroup row>
              <TextField
                id="invoice_nr"
                placeholder="$100"
                variant="outlined"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h3>Tax</h3>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormGroup row>
              <TextField
                id="vat"
                placeholder="GST/VAT %"
                variant="outlined"
              />
            </FormGroup>
          </Grid>

        </Grid>
      </FormControl>

    </form>
  )
}

export default PaymentTerms
