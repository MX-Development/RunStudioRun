import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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

import ModalBox from '../ModalBox'

const columns = [
  { field: 'companyName', type: 'string', headerName: 'Company', flex: 0.2 },
  { field: 'phone', type: 'string', flex: 0.15 },
  { field: 'website', type: 'string', flex: 0.15 },
  { field: 'physicalAddress', type: 'string', headerName: 'Physical Address', flex: 0.15 },
  { field: 'notes', type: 'string', flex: 0.4 }
]

function Companies({ add, importing }) {

  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/companies.json`)
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

  const onSubmit = data => { 
    console.log(selectedData)
  }

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      console.log('Company ID is in URL')
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

  const modalImport = (
    <>
      <h3 style={{ marginBottom: '10px' }}>Download and edit our sample CSV file</h3>
      <p>
        Download our CSV template file and add the companies you want to import. Once you’re done upload your CSV and check each imported correct.
      </p>
      <div className="modal-footer">
        <div className="btn-group">
          <div className="btn-left">
            <button className="btn btn-light-gray btn-left">Cancel</button>
          </div>
          <div className="btn-right">
            <button type="submit" className="btn btn-dark-gray btn-right">SELECT CSV FILE TO UPLOAD</button>
          </div>
        </div>
      </div>
    </>
  )

  const modalContent = (        
      
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl component="fieldset">
        <Grid container spacing={2}>  
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      placeholder="Business Name"
                      variant="outlined"
                      {...field}
                      value={selectedData ? selectedData.companyName : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="company"
                  defaultValue=""
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.phone : ''}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="phone"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Alternative Phone</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="000-000-0000"
                      {...field}
                      value={selectedData ? selectedData.altPhone : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="alt_phone"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Website</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Interwebs"
                      {...field}
                      value={selectedData ? selectedData.website : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="website"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Physical Address</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where people can see you"
                      {...field}
                      value={selectedData ? selectedData.physicalAddress : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="physical_address"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Postal Address</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Where to post stuff"
                      {...field}
                      value={selectedData ? selectedData.postalAddress : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="postal_address"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Tax Number</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Australian business number (ABN) or equivalent (VAT)"
                      {...field}
                      value={selectedData ? selectedData.companyTaxNumber : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="company_tax_number"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Notes</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Important things to remember"
                      {...field}
                      value={selectedData ? selectedData.notes : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="notes"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={9}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Company Prefix</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      placeholder="Add a 3 letter representation of the company"
                      {...field}
                      value={selectedData ? selectedData.companyPrefix : null}
                      onChange={handleChange}
                    />
                  )}
                  control={control}
                  name="prefix"
                />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={3}>
            <FormGroup>
              <FormControl variant="outlined">
                <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Rate</FormLabel>
                <Select
                  value={'Rate'}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={120}>120</MenuItem>
                  <MenuItem value={130}>130</MenuItem>
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
  )

  return (
    <>
      <List 
        title={'Companies'} 
        columns={columns} 
        data={data} 
        modalTitle={importing ? 'Import Companies' : 'Add/Edit Company'} 
        modalContent={importing ? modalImport : modalContent} 
        add={add ? true : false} 
        openModal={importing ? true : false} 
      />
    </>
  )
}

export default Companies

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
