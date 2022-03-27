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
      await axios.get(`/json/settings/labels.json`)
        .then(res => {
          setJobLabels(res.data[0].jobs);
          setProjectLabels(res.data[0].projects);
        })

    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchLabels()
  }, []);

  // Define table columns
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
              if (allCompanies) {
                let c = allCompanies.filter((company) => company.id === params.row.companyId);
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

  const [data, setData] = useState([])
  const [projects, setProjects] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [rates, setRates] = useState([]);
  const [companies, setCompanies] = useState(null);
  const [allCompanies, setAllCompanies] = useState(null);

  const order = useSelector((state) => state.order.showOrdered);
  const [showOrdered, setShowOrdered] = useState(order);

  useEffect(() => {
    setShowOrdered(order)
  }, [order]);

  const fetchData = async () => {

    try {
      await axios.get(`/json/work/projects.json`)
        .then(res => {
          setData(res.data);
          setProjects(res.data);

          let companies = [];
          res.data.forEach(project => {
            var companyExists = companies.findIndex(x => x === project.companyName); 

            if (companyExists === -1) companies.push(project.companyName)
          })

          setCompanies(companies);

          axios.get(`/json/contacts/companies.json`)
            .then(res => {
              setAllCompanies(res.data);
            })

          axios.get(`/json/work/jobs.json`)
            .then(res => {
              setJobs(res.data);
            })
        })

      // Fetch payment terms for the rates
      axios.get(`/json/settings/companySettings/payment_terms.json`)
        .then(res => {
          setRates(res.data.rates);
        })

    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchData()
  }, []);

  const history = useHistory();
  
  const showCompany = (id) => {  
    history.push(`/companies/${id}`);
  }

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  })

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

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

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  const changeAction = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;

    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].action = labelId;
    });

    setData(newArr);

    console.log('Update project action');
  };

  const changeStatus = (event) => {
    const projectId = event.target.name;
    const labelId = event.target.value;

    let newArr = [...data];
    data.forEach(() => {
      newArr[projectId - 1].status = labelId;
    });

    setData(newArr);
    
    console.log('Update project status');
  };

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
                        value={selectedData ? selectedData.projectName : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="projectName"
                    defaultValue=""
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
                        value={selectedData ? selectedData.description : ''}
                        onChange={handleChange}
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
                    value={selectedData ? selectedData.companyName : ''}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    name="companyName"
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
                    value={selectedData ? selectedData.rate : ''}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    name="rate"
                  >
                    <MenuItem value="Select...">
                      <em>Select...</em>
                    </MenuItem>
                    { 
                      rates && rates.length > 0 ? 
                        rates.map(rate => (
                          <MenuItem value={rate.id} key={rate.id}>{rate.title}</MenuItem>
                        ))
                      : null
                    }
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
                        placeholder="in minutes"
                        {...field}
                        value={selectedData ? selectedData.timeScheduled : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="timeScheduled"
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
                        value={selectedData ? selectedData.startDate : ''}
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
                        value={selectedData ? selectedData.endDate : ''}
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
              <button type="submit" className="btn btn-gold btn-right">Save</button>
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
