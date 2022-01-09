import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import moment from 'moment'

import axios from 'axios';

import List from '../List'
import ProjectListing from './ProjectListing'

import PageTitle from '../layout/PageTitle'

import { useHistory } from "react-router-dom";
 
import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

import { useSelector, useDispatch } from "react-redux";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { compareAsc } from 'date-fns';
import Label from '../settings/components/Label';

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
            onClick={(e) => {
              e.stopPropagation()
              if (companies) {
                let c = companies.filter((company) => company === params.row.companyName);
                let companyID = c[0].id;
                showCompany(companyID)
              }
            }}
          >{params.row.companyName}</p>
        </div>
      )
    },
    { field: 'description', type: 'string', flex: 0.85 },
    { field: 'team', type: 'string', flex: 0.15 },
    { field: 'enteredDate', type: 'string', flex: 0.15, headerName: 'Entered' },
    { field: 'dueDate', type: 'string', flex: 0.15, headerName: 'Due Date' },
    { field: 'action', type: 'string', flex: 0.15,
    renderCell: (params) => (
      <Label 
        type={params.row.status} 
        background={'#A0C485'} 
        defaultValue={'Label'}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      />
    ) },
    { field: 'status', type: 'string', flex: 0.15,
    renderCell: (params) => (
      <Label 
        type={params.row.status} 
        background={'#B1B0AF'} 
        defaultValue={'Label'}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      />
    )},
  ]

  const [data, setData] = useState([])
  const [projects, setProjects] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [companyProjects, setCompanyProjects] = useState(null);

  const order = useSelector((state) => state.order.showOrdered);
  const [showOrdered, setShowOrdered] = useState(order);

  useEffect(() => {
    setShowOrdered(order)
  }, [order]);

  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  const fetchData = async () => {

    try {
      await axios.get(`https://kendrix.kendrix.website/json/projects.json`)
        .then(res => {
          setData(res.data)
          console.log(res.data);
          setProjects(res.data);

          let companies = [];
          res.data.forEach(project => {
            var companyExists = companies.findIndex(x => x == project.companyName); 

            if (companyExists === -1) companies.push(project.companyName)
          })

          setCompanies(companies);

          // axios.get(`https://kendrix.kendrix.website/json/companies.json`)
          //   .then(res => {
          //     // companies.push(res.data);
          //   })

          // setData(res.data)
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

  const history = useHistory();
  
  const showCompany = (id) => {  
    history.push(`/companies/${id}`);
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
    <>
      <List 
        title={'Projects'}  
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/companies/add`) }
          },
          {
            "label": "Export",
            "action": function() { alert('Export...') }
          },
          {
            "label": "Print",
            "action": function() { alert('Print...') }
          }
        ]}
        columns={columns} 
        data={data} 
      />

      {
        showOrdered ?
          companies ?
            companies.map((company, index) => {
              let companyProjects = [];
              projects.forEach(project => {
                if (project.companyName === company) {
                  companyProjects.push(project);
                }
              })
              return (
                <ProjectListing 
                  title={'Projects'}  
                  buttons={[
                    {
                      "label": "Add",
                      "action": function() { history.push(`/companies/add`) }
                    },
                    {
                      "label": "Export",
                      "action": function() { alert('Export...') }
                    },
                    {
                      "label": "Print",
                      "action": function() { alert('Print...') }
                    }
                  ]}
                  company={company} 
                  columns={columns} 
                  data={companyProjects} 
                  headerButton={'Print'} 
                  modalTitle={'New Project'} 
                  modalContent={modalContent} 
                  add={add ? true : false} 
                />
              ) 
            })
          : <h1>No companies</h1> 
      : null
    }

    </>
  )
}

export default Projects

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    border: 1px solid #B1B0AF;
    color: #B1B0AF;
    border-radius: 2px;
    background: transparent;
    font-size: 12px;
    padding: 4px 6px;

    &:hover {
      cursor: pointer;
    }
  }
`
