import React from 'react'
import { useForm } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function TimeBlocks() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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

          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_req} onChange={handleChange} name="job_nr_req" />}
                label="No job numbers required"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_auto} onChange={handleChange} name="job_nr_auto" />}
                label="Assign job numbers automatically"
              />
              <FormControlLabel
                control={<Checkbox checked={state.job_nr_combo} onChange={handleChange} name="job_nr_combo" />}
                label="Use a combination of job numbers and the client prefix"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <div className="helper" style={{ marginBottom: '10px' }}>Note – you can change the numbers below if you have accidentally created a job, estimate or invoice and deleted it.</div>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>JOB NUMBER</FormLabel>
            <FormGroup row>
              <TextField
                id="job_nr"
                defaultValue="J-2017"
                variant="outlined"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>ESTIMATE NUMBER</FormLabel>
            <FormGroup row>
              <TextField
                id="estimate_nr"
                defaultValue="E-2017"
                variant="outlined"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>INVOICE NUMBER</FormLabel>
            <FormGroup row>
              <TextField
                id="invoice_nr"
                defaultValue="INV-2017"
                variant="outlined"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="time_blocks">MINIMUM TIME BLOCKS</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={state.time_grid} onChange={handleChange} name="time_grid" />}
                label="Time Grid"
              />
              <FormControlLabel
                control={<Checkbox checked={state.min_15} onChange={handleChange} name="min_15" />}
                label="15 minutes"
              />
              <FormControlLabel
                control={<Checkbox checked={state.min_30} onChange={handleChange} name="min_30" />}
                label="30 minutes"
              />
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

export default TimeBlocks
