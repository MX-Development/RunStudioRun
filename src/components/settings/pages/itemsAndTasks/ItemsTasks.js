import React, { useEffect, useState } from 'react'

import axios from 'axios';

import List from '../../../layout/tables/List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import {
  useHistory
} from "react-router-dom"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

// Define table columns
const columns = [
  { field: 'rateName', type: 'string', flex: 0.3, headerName: 'Item/task' },
  { field: 'rateDescription', type: 'string', flex: 0.5, headerName: 'Description' },
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

  let history = useHistory()
  
  const [data, setData] = useState([])

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/items_tasks.json`)
        .then(res => {
          setData(res.data)
        })
        
    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, [history]);

  const [openModal, setOpenModal] = useState(false);

  // Get item's ID from URL query when an item is selected
  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected item on the front-end
  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === selectedID
      })

      setSelectedData(dataSelect[0])
      setOpenModal(true);
    }
  }, [id, data, selectedID]);

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  // Delete item from database
  const deleteItem = () => {
    console.log('Delete item with ID: ', selectedData.id);
  }

  // Modal content for items and tasks info
  const modalContent = (     
    <>
      <p style={{ marginBottom: '20px' }}>
        These items and tasks are added to your estimates and invoices, and can be adjusted at any time after being added. The items that you don???t sell by the hour are called expenses.
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
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="rateName"
                    defaultValue=""
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
                        multiline
                        rows={4}
                      />
                    )}
                    control={control}
                    name="rateDescription"
                    defaultValue=""
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
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="standard"
                    defaultValue=""
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
                    onChange={handleChange}
                    name="standard"
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
              <button type="button" className="btn btn-dark-gray btn-right" onClick={() => deleteItem()}>Delete</button>
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
        title={'Items & Tasks'} 
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/items-and-tasks/add`) }
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
        modalTitle={'Add/Edit Item & Task'} 
        modalContent={modalContent} 
        add={add ? true : false} 
        nocolor={true} 
        openModal={openModal}
      />
    </>
  )
}

export default ItemsTasks
