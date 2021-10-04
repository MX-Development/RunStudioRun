import React, { useEffect, useState } from 'react'

import axios from 'axios';

import List from '../List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

const columns = [
  { field: 'rateName', type: 'string', flex: 0.3 },
  { field: 'rateDescription', type: 'string', flex: 0.5 },
  { 
    field: 'standard', type: 'number', flex: 0.1, headerName: 'The Rate',
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `$${valueFormatted}`;
    }
  },
  { 
    field: 'tier_1', type: 'number', flex: 0.1, headerName: 'Tier 1', 
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `$${valueFormatted}`;
    }
  },
  { 
    field: 'tier_2', type: 'number', flex: 0.1, headerName: 'Tier 2', 
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `$${valueFormatted}`;
    }
  },
  { 
    field: 'tier_3', type: 'number', flex: 0.1, headerName: 'Tier 3', 
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `$${valueFormatted}`;
    }
  }
]

function ItemsTasks({ add }) {
  const [data, setData] = useState([])

  const fetchData = async () => {

    try {
      await axios.get(`https://kendrix.kendrix.website/json/items_tasks.json`)
        .then(res => {
          setData(res.data)
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);


  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control } = useForm();
  const onSubmit = data => { 
    console.log(selectedData)
  }

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === selectedID
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, data, selectedID]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  const modalContent = (     
    <>
      <p style={{ marginBottom: '20px' }}>
        These items and tasks are added to your estimates and invoices, and can be adjusted at any time after being added. The items that you don’t sell by the hour are called expenses.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">
          <Grid container spacing={2}>  

            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Item Name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Design Development"
                        {...field}
                        value={selectedData ? selectedData.rateName : null}
                      />
                    )}
                    control={control}
                    name="item_name"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Description</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Enter the task description or what you intend in working on to allow a client to clearly understand the work you will do."
                        {...field}
                        value={selectedData ? selectedData.rateDescription : null}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="description"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={9}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>What is the hourly rate for this item?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="120.00"
                        {...field}
                        value={selectedData ? selectedData.standard : null}
                      />
                    )}
                    control={control}
                    name="hourly_rate"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                  <Select
                    value={'Standard'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={'Standard'}>Standard</MenuItem>
                    <MenuItem value={1}>Tier 1</MenuItem>
                    <MenuItem value={2}>Tier 2</MenuItem>
                    <MenuItem value={3}>Tier 3</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
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
      <List title={'Items & Tasks'} columns={columns} data={data} modalTitle={'Add/Edit Item & Task'} modalContent={modalContent} add={add ? true : false} nocolor={true} />
    </>
  )
}

export default ItemsTasks
