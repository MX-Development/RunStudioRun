import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import moment from 'moment'

import axios from 'axios';

import List from '../List'

import { useHistory, useParams, useLocation } from "react-router-dom";

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
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Projects({ add }) {

  const columns = [
    { field: 'projectInfo', type: 'string', flex: 0.4, headerName: 'Project',
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{
            lineHeight: '1.3'
          }}>{params.row.projectName}</p>
          <p 
            style={{
              lineHeight: '1.3',
              color: '#B1B0AF',
              fontSize: '12px',
              textDecoration: 'underline'
            }}
            onClick={showCompany}
          >{params.row.companyName}</p>
        </div>
      )
    },
    { field: 'description', type: 'string', flex: 0.5 },
    { field: 'team', type: 'string', flex: 0.1 },
    { field: 'enteredDate', type: 'string', flex: 0.2, headerName: 'Entered' },
    { field: 'dueDate', type: 'string', flex: 0.2, headerName: 'Due Date' },
    { field: 'action', type: 'string', flex: 0.2 },
    { field: 'status', type: 'string', flex: 0.2 },
  ]

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState(false);

  const { handleSubmit, control, setValue } = useForm();
  const onSubmit = data => console.log(data);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/projects.json`)
        .then(res => {
          setData(res.data)

          axios.get(`https://kendrix.kendrix.website/json/companies.json`)
            .then(res => {
              setCompanies(res.data)
            })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

    setIsLoading(false);
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

  const history = useHistory();
  const location = useLocation();
  
  const showCompany = (e) => {
    e.stopPropagation();
  
    console.log('company')
    history.push(`/companies/1`);
  }

  const modalContent = (        
    <>     
      <p style={{ marginBottom: '20px' }}>
        Add ‘expenses’ that constitute part of the project whereby you can add also your admin or commission fees. Note these are not time related costs.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">
          <Grid container spacing={2}>  
            
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>What are you working on?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="What are you working on?"
                        variant="outlined"
                        {...field}
                        value={''}
                      />
                    )}
                    control={control}
                    name="title"
                  />
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
                      />
                    )}
                    control={control}
                    name="description"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company</FormLabel>
                  <Select
                    value={'Select...'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="">
                      <em>Select...</em>
                    </MenuItem>
                    { 
                      companies ? 
                        companies.map(company => (
                          <MenuItem value={company.companyName} key={company.id}>{company.companyName}</MenuItem>
                        ))
                      : null
                    }
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                  <Select
                    value={'Select...'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="">
                      <em>Select...</em>
                    </MenuItem>
                    <MenuItem value={'standard'}>Standard</MenuItem>
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
            </div>
            <div className="btn-right">
              <button type="submit" className="btn btn-dark-gray btn-right">Delete</button>
              <button className="btn btn-gold btn-right">Save</button>
            </div>
          </div>
        </div>

      </form>
    </>
  )

  return (
    <List title={'Projects'} columns={columns} data={data} modalTitle={'New Project'} modalContent={modalContent} add={add ? true : false} />
  )
}

export default Projects

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
