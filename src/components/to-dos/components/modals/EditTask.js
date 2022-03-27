import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

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

function EditTask({ eventInfo }) {

  const { handleSubmit, control } = useForm();
  
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {

    try {

      await axios.get(`/json/settings/team.json`)
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

  const handleDateChange = (id) => (date) => {
    if (id === 'startDate') {
      setSelectedData({
        ...selectedData,
        startDate: moment(date).format('YYYY-MM-DD')
      });
    } else if (id === 'endDate') {
      setSelectedData({
        ...selectedData,
        endDate: moment(date).format('YYYY-MM-DD')
      });
    }
  };
  
  const history = useHistory();

  function viewJob() {
    const jobId = eventInfo.event._def.extendedProps.jobId;
    const projectId = eventInfo.event._def.extendedProps.projectId;
    
    history.push(`/projects/${projectId}/jobs/${jobId}`)
  }

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState({
    member: 2,
    description: "Lorem ipsum dolor",
    rate: 120,
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    time_scheduled: "00hr/30m"
  })

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On submit form
  const onSubmit = data => { 
    console.log(selectedData)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">
          <Grid container spacing={2}>  
            
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Team Members</FormLabel>
                  <Select
                    value={selectedData.member}
                    name="member"
                    style={{ width: '100%' }}
                    onChange={handleChange}
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Job Description</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Enter a brief description or what you intend in working on to allow a client to clearly understand the work you will do."
                        {...field}
                        value={selectedData ? selectedData.description : ''}
                        onChange={handleChange}
                        multiline
                        rows={4}
                      />
                    )}
                    control={control}
                    name="description"
                    readonly
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                  <Select
                    value={selectedData ? selectedData.rate : ''}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    name="rate"
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
                        onChange={handleChange}
                        value={selectedData.time_scheduled}
                      />
                    )}
                    control={control}
                    name="time_scheduled"
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
                        value={selectedData.startDate}
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
                        value={selectedData.endDate}
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
              <button type="button" className="btn btn-dark-gray btn-right" onClick={viewJob}>View Job</button>
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

export default EditTask