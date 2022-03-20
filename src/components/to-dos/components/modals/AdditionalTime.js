import React, { useState, useEffect } from 'react'

import moment from 'moment'

import axios from 'axios';
 
import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ReactComponent as DatePickerIcon } from '../../../assets/icons/DatePickerIcon.svg'

function AdditionalTime() {

  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  const [data, setData] = useState([])
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {

    try {
      await axios.get(`/json/projects.json`)
        .then(res => {
          setData(res.data)
          setProjects(res.data);
        })

      await axios.get(`/json/team.json`)
        .then(res => {
          setTeamMembers(res.data);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchData()
  }, []);

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(moment(data.startDate).format()),
    endDate: new Date(moment(data.startDate).format())
  });

  const handleDateChange = (id) => (date) => {
    if (id === 'startDate') {
      setSelectedDate({
        ...selectedDate,
        startDate: moment(date).format()
      });
    } else if (id === 'endDate') {
      setSelectedDate({
        ...selectedDate,
        endDate: moment(date).format()
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">
          <Grid container spacing={2}>  
            
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Select the project</FormLabel>
                  <Select
                    value={'Select...'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="Select...">
                      <em>Select...</em>
                    </MenuItem>
                    { 
                      projects && projects.length > 0 ? 
                      projects.map(project => (
                          <MenuItem value={project.companyName} key={project.id}>{project.companyName}</MenuItem>
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Add Team Member</FormLabel>
                  <Select
                    value={'none'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="none">
                      <em>Choose the unfortunate soul to complete this task</em>
                    </MenuItem>
                    { 
                      teamMembers && teamMembers.length > 0 ? 
                      teamMembers.map(member => (
                          <MenuItem value={member.id} key={member.id}>{member.name}</MenuItem>
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Project Description</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Enter a brief description or what you intend in working on to allow a client to clearly understand the work you will do."
                        {...field}
                        value={''}
                        multiline
                        rows={4}
                      />
                    )}
                    control={control}
                    name="description"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                  <Select
                    value={'Rate'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={120}>120</MenuItem>
                    <MenuItem value={130}>130</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Time scheduled</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="0hr/00m"
                        {...field}
                        value={''}
                      />
                    )}
                    control={control}
                    name="cost"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Start</FormLabel>
                      <KeyboardDatePicker
                        margin="none"
                        format="MM/dd/yyyy"
                        value={selectedDate.startDate}
                        onChange={handleDateChange('startDate')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        name="startDate"
                        keyboardIcon={<DatePickerIcon />}
                        InputAdornmentProps={{ position: 'start' }}
                      />
                  </FormControl>
                </FormGroup>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>End</FormLabel>
                      <KeyboardDatePicker
                        margin="none"
                        format="MM/dd/yyyy"
                        value={selectedDate.startDate}
                        onChange={handleDateChange('endDate')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        name="endDate"
                        keyboardIcon={<DatePickerIcon />}
                        InputAdornmentProps={{ position: 'start' }}
                      />
                  </FormControl>
                </FormGroup>
              </MuiPickersUtilsProvider>
            </Grid>

          </Grid>
        </FormControl>

        <div className="modal-footer">
          <div className="btn-group">
            <div className="btn-left">
              <button className="btn btn-light-gray btn-left">Cancel</button>
              <button type="button" className="btn btn-dark-gray btn-right">View Job</button>
            </div>
            <div className="btn-right">
              <button type="submit" className="btn btn-gold btn-right">Save Time</button>
            </div>
          </div>
        </div>

      </form>
    </>
  )
}

export default AdditionalTime