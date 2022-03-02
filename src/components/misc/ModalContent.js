import React from 'react'

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
import { compareAsc } from 'date-fns';
import { ReactComponent as DatePickerIcon } from '../assets/icons/DatePickerIcon.svg'

function ModalContent({ formElements }) {

  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  return (           
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  

        {
          formElements ?
          formElements.map(el => {

            return (
              <Grid item xs={el.columns}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>{ el.label }</FormLabel>
                    {(() => {
                      switch (el.type) {
                        case 'textfield':
                          return (
                            <Controller
                              render={({ field }) => (
                                <TextField
                                  variant="outlined"
                                  placeholder={el.placeholder}
                                  value={el.value}
                                  {...field}
                                />
                              )}
                              control={control}
                              name={el.name}
                            />
                          )
                        case 'select':
                          return (
                            <Controller
                              render={({ field }) => (
                                <Select
                                  value={el.value ? el.value : ''}
                                  style={{ width: '100%' }}
                                  {...field}
                                >
                                  <MenuItem value={el.placeholder}>
                                    <em>{ el.placeholder }</em>
                                  </MenuItem>
                                  { 
                                    el.options && el.options.length > 0 ? 
                                      el.options.map((option, index) => (
                                        <MenuItem value={option.value} key={index}>{ option.label }</MenuItem>
                                      ))
                                    : null
                                  }
                                </Select>
                              )}
                              control={control}
                              name={el.name}
                            />
                          )
                        default:
                          return null;
                      }
                    })()}
                  </FormControl>
                </FormGroup>
              </Grid>
            )
          }) : null
        }
          

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
  )
}

export default ModalContent