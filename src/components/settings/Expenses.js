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

import ModalBox from '../ModalBox'

const columns = [
  { field: 'expense_name', type: 'string', flex: 0.3 },
  { field: 'description', type: 'string', flex: 0.6 },
  { field: 'cost', type: 'string', flex: 0.2 },
  { field: 'markup', type: 'string', flex: 0.2 },
  { field: 'sell', type: 'string', flex: 0.3 }, 
]

function Expenses({ add }) {

  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/expenses.json`)
        .then(res => {
          setData(res.data)
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

  let { id } = useParams();
  const selectedID = id;

  const { handleSubmit, control, setValue } = useForm();
  const onSubmit = data => console.log(data);

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id]);

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Expense Name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Name of the expense"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.expenseName : null}
                      />
                    )}
                    control={control}
                    name="expenseName"
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
                  <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>How much do you buy the goods?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="How much"
                        {...field}
                        value={selectedData ? selectedData.cost : null}
                      />
                    )}
                    control={control}
                    name="cost"
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
                      />
                    )}
                    control={control}
                    name="markup"
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
                      />
                    )}
                    control={control}
                    name="sell"
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
              <button type="submit" className="btn btn-dark-gray btn-right">Delete</button>
              <button className="btn btn-gold btn-right">Save</button>
            </div>
          </div>
        </div>

      </form>
    </>
  )

  return (
      
    isLoading ? 
    'Loading...'
    :
    <>
      <List title={'Expenses'} columns={columns} data={data} modalTitle={'Add/Edit Expenses'} modalContent={modalContent} add={add ? true : false} />
    </>
      
  )
}

export default Expenses
