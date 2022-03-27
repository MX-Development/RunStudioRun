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

// Define table columns
const columns = [
  { field: 'expenseName', type: 'string', flex: 0.3, headerName: 'Expense' },
  { field: 'description', type: 'string', flex: 0.6 },
  { field: 'cost', type: 'string', flex: 0.2 },
  { field: 'markup', type: 'string', flex: 0.2 },
  { field: 'sell', type: 'string', flex: 0.3 }, 
]

function Expenses({ add }) {

  let history = useHistory()

  const [data, setData] = useState([])

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/work/expenses.json`)
        .then(res => {
          setData(res.data)
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [history]);

  // Get expense's ID from URL query when an expense is selected
  let { id } = useParams();
  const selectedID = id;
  
  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected company on the front-end
  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
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

  // Modal content for expense info
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Expense Name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Name of the expense"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.expenseName : null}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="expenseName"
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
                        placeholder="Enter the expense description"
                        {...field}
                        value={selectedData ? selectedData.description : null}
                        onChange={handleChange}
                        multiline
                        rows={4}
                      />
                    )}
                    control={control}
                    name="description"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>How much do you buy the goods?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="How much"
                        {...field}
                        value={selectedData ? selectedData.cost : null}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="cost"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>What is your markup?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="How much do you want to make?"
                        {...field}
                        value={selectedData ? selectedData.markup : null}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="markup"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Total Sell Rate is shown includes cost plus the markup</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Total"
                        {...field}
                        value={selectedData ? selectedData.sell : null}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="sell"
                    defaultValue=""
                  />
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
        title={'Expenses'} 
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/expenses/add`) }
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
        modalTitle={'Add/Edit Expenses'} 
        modalContent={modalContent} 
        add={add ? true : false} 
        nocolor={true} 
      />
    </>
  )
}

export default Expenses
