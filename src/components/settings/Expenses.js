import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import List from '../List'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const data = [
  {
    id: 1,
    expense_name: 'Digital 1 Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 2,
    expense_name: 'Digital 2 Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 3,
    expense_name: 'Digital 3 Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  },
  {
    id: 4,
    expense_name: 'Digita 4 Printing',
    description: 'For the printing of 100 x A4 double sided flyers, printed on 150gsm gloss stock…',
    cost: '$500.00',
    markup: '30%',
    sell: '$650.00'
  }
];

const columns = [
  { field: 'expense_name', type: 'string', flex: 0.3 },
  { field: 'description', type: 'string', flex: 0.6 },
  { field: 'cost', type: 'string', flex: 0.2 },
  { field: 'markup', type: 'string', flex: 0.2 },
  { field: 'sell', type: 'string', flex: 0.3 }, 
]

function Expenses() {

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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Expense Name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        placeholder="Name of the expense"
                        variant="outlined"
                        {...field}
                        value={selectedData ? selectedData.expense_name : ''}
                        onChange={handleChange}
                      />
                    )}
                    control={control}
                    name="expense_name"
                    defaultValue=""
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Description</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Enter the expense description"
                        {...field}
                        value={selectedData ? selectedData.description : ''}
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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>How much do you buy the goods?</FormLabel>
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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>What is your markup?</FormLabel>
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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Total Sell Rate is shown includes cost plus the markup</FormLabel>
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
    <List title={'Expenses'} columns={columns} data={data} modalTitle={'Add/Edit Expenses'} modalContent={modalContent} />
  )
}

export default Expenses

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
