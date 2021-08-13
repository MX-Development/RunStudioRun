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
import { MenuItem, Select } from '@material-ui/core'

const data = [
  {
    id: 1,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  },
  {
    id: 2,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  },
  {
    id: 3,
    item: 'Design Development',
    description: 'For the development of 2 to 3 design options ready for client review/approval…',
    rate: '$150.00',
    tier_1: '$130.00',
    tier_2: '$120.00',
    tier_3: '$110.00'
  }
];

const columns = [
  { field: 'item', type: 'string', flex: 0.3 },
  { field: 'description', type: 'string', flex: 0.5 },
  { field: 'rate', type: 'string', flex: 0.1 },
  { field: 'tier_1', type: 'string', flex: 0.1, headerName: 'Tier 1' },
  { field: 'tier_2', type: 'string', flex: 0.1, headerName: 'Tier 2' },
  { field: 'tier_3', type: 'string', flex: 0.1, headerName: 'Tier 3' }
]

function ItemsTasks() {

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
        These items and tasks are added to your estimates and invoices, and can be adjusted at any time after being added. The items that you don’t sell by the hour are called expenses.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl component="fieldset">
          <Grid container spacing={2}>  

            <Grid item xs={12}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Item Name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Design Development"
                        {...field}
                        value={selectedData ? selectedData.item_name : null}
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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Description</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="Enter the task description or what you intend in working on to allow a client to clearly understand the work you will do."
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
            <Grid item xs={9}>
              <FormGroup>
                <FormControl variant="outlined">
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>What is the hourly rate for this item?</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        placeholder="120.00"
                        {...field}
                        value={selectedData ? selectedData.hourly_rate : null}
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
                  <FormLabel style={{ lineHeight: '2', fontWeight: '400 !important' }}>Rate</FormLabel>
                  <Select
                    value={'Rate'}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
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
    <List title={'Items & Tasks'} columns={columns} data={data} modalTitle={'Add/Edit Item & Task'} modalContent={modalContent} />
  )
}

export default ItemsTasks

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
