import React, { useState, useEffect } from 'react'

import moment from 'moment'

import axios from 'axios';

import List from '../../../../../layout/tables/List'
import ProjectListing from './ProjectListing'

import { useHistory } from "react-router-dom";
 
import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

import { useSelector } from "react-redux";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ReactComponent as DatePickerIcon } from '../../../../../assets/icons/DatePickerIcon.svg'

import Label from '../../../../../settings/components/Label';

function Projects({ add }) {

  const [jobLabels, setJobLabels] = useState([])
  const [projectLabels, setProjectLabels] = useState([])

  const fetchLabels = async () => {

    try {
      await axios.get(`/json/labels.json`)
        .then(res => {
          setJobLabels(res.data[0].jobs);
          setProjectLabels(res.data[0].projects);
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchLabels()
  }, []);

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
    { field: 'description', type: 'string', flex: 0.85, sortable: false },
    { field: 'team', type: 'string', flex: 0.15, sortable: false },
    { field: 'enteredDate', type: 'string', flex: 0.15, headerName: 'Entered' },
    { field: 'dueDate', type: 'string', flex: 0.15, headerName: 'Due' },
    { field: 'action', type: 'string', flex: 0.15,
    renderCell: (params) => (  
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={params.row.action}
        className="label-select"
        name={`${params.row.id}`}
        label="Job status"
        onChange={changeAction}
      >
        {
          projectLabels.map(label => (
            <MenuItem value={label.id} key={label.id}>
              <Label 
                type={params.row.action} 
                background={label.background}
                color={label.color} 
                defaultValue={label.title}
                name={`label[${label.id}]`}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              />
            </MenuItem>
          ))
        }
      </Select>
    ) },
    { field: 'status', type: 'string', flex: 0.15,
    renderCell: (params) => (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={params.row.status}
        name={`${params.row.id}`}
        className="label-select"
        label="Job status"
        onChange={changeStatus}
      >
        {
          jobLabels.map(label => (
            <MenuItem value={label.id} key={label.id}>
              <Label 
                type={params.row.status} 
                background={label.background} 
                color={label.color} 
                defaultValue={label.title}
                name={`label[${label.id}]`}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              />
            </MenuItem>
          ))
        }
      </Select>
    )},
  ]

  const changeAction = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;

    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].action = labelId;
    });

    setData(newArr);
  };

  const changeStatus = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;

    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].status = labelId;
    });

    setData(newArr);
  };

  const [data, setData] = useState([])
  const [projects, setProjects] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState(null);
  const [allCompanies, setAllCompanies] = useState(null);

  const order = useSelector((state) => state.order.showOrdered);
  const [showOrdered, setShowOrdered] = useState(order);

  useEffect(() => {
    setShowOrdered(order)
  }, [order]);

  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  const fetchData = async () => {

    try {
      await axios.get(`/json/projects.json`)
        .then(res => {
          setData(res.data)
          console.log(res.data);
          setProjects(res.data);

          let companies = [];
          res.data.forEach(project => {
            var companyExists = companies.findIndex(x => x === project.companyName); 

            if (companyExists === -1) companies.push(project.companyName)
          })

          setCompanies(companies);

          axios.get(`/json/companies.json`)
            .then(res => {
              console.log('Companies: ', res.data)
              setAllCompanies(res.data);
            })

          axios.get(`/json/jobs.json`)
            .then(res => {
              console.log('Jobs: ', res.data)
              setJobs(res.data);
            })

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
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company</FormLabel>
                  <Select
                    value={'Select...'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="Select...">
                      <em>Select...</em>
                    </MenuItem>
                    { 
                      allCompanies && allCompanies.length > 0 ? 
                        allCompanies.map(company => (
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
            "action": function() { history.push(`/projects/add`) }
          },
          {
            "label": "Print",
            "action": function() { alert('Print...') }
          }
        ]}
        columns={columns} 
        data={data} 
        modalTitle={'New Project'} 
        modalContent={modalContent} 
        add={add ? true : false} 
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
                      "action": function() { history.push(`/projects/add`) }
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
                  jobs={jobs}
                  headerButton={'Print'} 
                  modalTitle={'New Project'} 
                  modalContent={modalContent} 
                  add={add ? true : false} 
                />
              ) 
            })
          : <h1>Loading companies...</h1> 
      : null
    }

    </>
  )
}

export default Projects
