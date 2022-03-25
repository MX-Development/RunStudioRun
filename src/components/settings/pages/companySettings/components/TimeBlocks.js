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

function TimeBlocks() {

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/companySettings/job_numbers.json`)
        .then(res => {
          setSelectedData(res.data)
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

          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.jobNumbers['not_required'] : null} />}
                label="No job numbers required"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="jobNumbers['not_required']"
              /> 
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.jobNumbers['auto'] : null} />}
                label="Assign job numbers automatically"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="jobNumbers['auto']"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.jobNumbers['combination'] : null} />}
                label="Use a combination of job numbers and the client prefix"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="jobNumbers['combination']"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <div className="helper" style={{ marginBottom: '10px' }}>Note – you can change the numbers below if you have accidentally created a job, estimate or invoice and deleted it.</div>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>JOB NUMBER</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="J-2017"
                    {...field}
                    value={selectedData?.jobNumber}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="jobNumber"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>ESTIMATE NUMBER</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="E-2017"
                    {...field}
                    value={selectedData?.estimateNumber}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="estimateNumber"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel style={{ lineHeight: '1.4', fontSize: '.85em' }}>INVOICE NUMBER</FormLabel>
            <FormGroup row>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    placeholder="INV-2017"
                    {...field}
                    value={selectedData?.invoiceNumber}
                    onChange={handleChange}
                  />
                )}
                control={control}
                name="invoiceNumber"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="time_blocks">MINIMUM TIME BLOCKS</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.timeBlocks['time_grid'] : null} />}
                label="Time Grid"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="timeBlocks['time_grid']"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.timeBlocks['min_15'] : null} />}
                label="15 minutes"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="timeBlocks['min_15']"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedData ? selectedData.timeBlocks['min_30'] : null} />}
                label="30 minutes"
                style={{ margin: '0', marginLeft: '12.5px' }}
                onChange={changePostal}
                name="timeBlocks['min_30']"
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
