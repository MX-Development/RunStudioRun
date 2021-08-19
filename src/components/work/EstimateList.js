import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import moment from 'moment'

import DragIcon from '../assets/icons/DragIcon.svg'
import ActionIcon from '../assets/icons/ActionIcon.svg'
import TeamToDelete from '../assets/icons/TeamToDelete.svg'

import { useForm, Controller } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function EstimateList({ type, data, id }) {

  const { handleSubmit, control, setValue } = useForm();
  
  const [edit, setEdit] = useState(null)
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    console.log(id)
    console.log(data)
    // if (id) {
    //   const dataSelect = data.filter(obj => {
    //     return obj.id === parseInt(id)
    //   })

    //   console.log(dataSelect)

    //   setSelectedData(dataSelect[0])
    // }
    setSelectedData(data)
  }, [id]);

  const handleChange = event => {
    console.log(selectedData)
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

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
      setSelectedData({
        ...selectedData,
        startDate: moment(date).format()
      });
    } else if (id === 'endDate') {
      setSelectedDate({
        ...selectedDate,
        endDate: moment(date).format()
      });
      setSelectedData({
        ...selectedData,
        endDate: moment(date).format()
      });
    }
  };

  return (
    <Container small={type === 'subitem' ? true : false}>
      <DragButton>
        <img src={DragIcon} alt="drag icon" />
      </DragButton>

      <Info>
        <Top>
          <div className="title">
            <h3>{ data.title }</h3>
            { 
              type !== 'overview' ?
                <span>Pending</span>
              : null
            }
          </div>
          {
            type !== 'title' && type !== 'overview' ?
              <div className="team">
                <img src={TeamToDelete} alt="team to delete" />
              </div>
            : null
          } 
        </Top>
        {
          type !== 'overview' && type !== 'title' ?
            <Bottom>
              { type === 'item' || type === 'subitem' ? 
                <>
                  <Item width={0.2}>
                    <FormGroup>
                      <FormControl variant="outlined">
                        <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Hours</FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              {...field}
                              value={selectedData ? selectedData.time : null}
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
                              value={selectedData ? selectedData.rate : null}
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
                              value={selectedData ? '$' + selectedData.total : null}
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
                  </Item>
                  <Item width={0.3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <FormGroup>
                        <FormControl variant="outlined">
                          <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>End</FormLabel>
                            <KeyboardDatePicker
                              margin="normal"
                              format="MM/dd/yyyy"
                              value={selectedDate.endDate}
                              onChange={handleDateChange('endDate')}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              name="endDate"
                            />
                        </FormControl>
                      </FormGroup>
                    </MuiPickersUtilsProvider>
                  </Item>
                </>
              : type === 'expense' ?
                <>
                  <Item width={0.1}>
                    <h6>Option</h6>
                    <span>A</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Quantity</h6>
                    <span>000</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Unit cost</h6>
                    <span>$0</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Cost</h6>
                    <span>$0</span>
                  </Item>
                  <Item width={0.1}>
                    <h6>Markup</h6>
                    <span>000%</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Unit price</h6>
                    <span>$0</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Total</h6>
                    <span>$0</span>
                  </Item>
                </>
              : null
              }
            </Bottom>
          : null
        }
      </Info>

      <Description small={type === 'subitem' ? true : false}>
        <p>
          { data.description }
        </p>
      </Description>
      <ActionButton>
        <img src={ActionIcon} alt="action icon" />
      </ActionButton>
    </Container>
  )
}

export default EstimateList

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${props => props.small ? "50px" : "0"};
`

const DragButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;

  > img {
    max-width: 50px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0.5;
  padding: 0 15px;
  background: #fff;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  > .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > .title span {
    opacity: 0.5;
    font-style: italic;
    margin-left: 10px;
  }
`

const Bottom = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 5px;
`

const Item = styled.div`
  flex: ${props => props.width};

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
    top: -5px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    opacity: 0;
  }
`

const Description = styled.div`
  display: flex;
  flex: ${props => props.small ? "0.5525" : "0.5"};
  padding: 15px;
  font-size: 14px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`

const ActionButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    max-height: 50px;
  }
`
