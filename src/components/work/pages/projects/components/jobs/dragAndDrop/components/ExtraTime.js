import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import axios from 'axios'

import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Avatar from '@material-ui/core/Avatar';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ReactComponent as DatePickerIcon } from '../../../../../../../assets/icons/DatePickerIcon.svg'

function ExtraTime({ data, size }) {

  const { control } = useForm();

  useEffect(() => {
    // if (id) {
    //   const dataSelect = data.filter(obj => {
    //     return obj.id === parseInt(id)
    //   })

    //   console.log(dataSelect)

    //   setSelectedData(dataSelect[0])
    // }
    setSelectedData(data)
  }, [data]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  })

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

  const [teamMembers, setTeamMembers] = useState([])

  const fetchData = async () => {

    try {
      axios.get(`/json/settings/team.json`)
      .then(res => {
        setTeamMembers([])
        res.data.forEach(member => {
          setTeamMembers(teamMembers => [...teamMembers, member])
        })
      })

      console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  } 

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container small={size === 'small' ? true : false}>
      <Description small={size === 'small' ? true : false}>
        <p>
          { data.description }
        </p>
      </Description>
      <Info>
        <Bottom>
          <Item width={0.2}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Hours</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.time : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="time"
                />
              </FormControl>
            </FormGroup>
          </Item>
          <Item width={0.2}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.rate : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="rate"
                />
              </FormControl>
            </FormGroup>
          </Item>
          <Item width={0.2}>
            <FormGroup> 
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Total</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.total : ''}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="total"
                />
              </FormControl>
            </FormGroup>
          </Item>
          <Item width={0.3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Start</FormLabel>
                    <KeyboardDatePicker
                      margin="normal"
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
          </Item>
          <Item width={0.3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>End</FormLabel>
                    <KeyboardDatePicker
                      margin="normal"
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
          </Item>
        </Bottom>
          <Members>
            { teamMembers.forEach(member => {
              if (data.team.length > 0 && data.team.includes(member.id)) {
                return (
                  <Avatar alt={ member.name } src={ member.avatar }>
                    M
                  </Avatar>
                )
              }
            })}
          </Members>
      </Info>
    </Container>
  )
}

export default ExtraTime

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0.5;
  padding: 0 15px;
  background: #fff;
  max-height: 50px;
`

const Bottom = styled.div`
  display: flex;
  height: 50px;
`

const Item = styled.div`
  flex: ${props => props.width};
  display: flex;
  align-items: center;

  > h6 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  > span {
    font-size: 16px;
  }

  .MuiOutlinedInput-input {
    border: none !important;
    outline: none;
    padding: 0 !important;
    font-size: 18px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiFormLabel-root {
    font-size: 0.67em;
    margin-bottom: 2px;
    text-transform: uppercase;
    font-weight: 600 !important;
  }

  .MuiFormControl-marginNormal {
    margin: 0;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    opacity: 0;
  }

  .MuiOutlinedInput-adornedStart {
    padding-left: 0;
  }

  .MuiInputBase-input {
    padding: 0;
  }
`

const Description = styled.div`
  display: flex;
  flex: ${props => props.small ? "0.539" : "0.5"};
  padding: 15px;
  font-size: 14px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`

const Members = styled.div`
  display: flex;

  .MuiAvatar-root {
    width: 30px !important;
    height: 30px !important;
    margin-left: 5px;
  }
`
