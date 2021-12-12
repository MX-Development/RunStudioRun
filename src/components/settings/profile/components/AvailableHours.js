import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function AvailableHours() {

  const { handleSubmit, control } = useForm();

  const [state, setState] = useState({
    job_nr_req: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  return (
    <>
      <Grid item xs={12} sm={12}>
        <h5>Hours I’m available to work</h5>
      </Grid>

      { days.map((day, index) => (
        <Grid item sm={2} key={index}>
          <>
          <FormGroup>
            { state.type }
            <FormControlLabel
              control={<Checkbox checked={true} name={`day_${day}`} />}
              label={day[0].toUpperCase() + day.substring(1)}
              labelPlacement="top"
              style={{ margin: '0' }}
            />
          </FormGroup>
          <FormControl variant="outlined">
            <Controller
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  type="number"
                  {...field}
                  value={0}
                  onChange={handleChange}
                />
              )}
              control={control}
              name={`day_hours_${day}`}
            />
          </FormControl>
          </>
        </Grid>
      ))}
    </>
  )
}

export default AvailableHours
