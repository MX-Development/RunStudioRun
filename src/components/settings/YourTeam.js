import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import List from '../List'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

import { useForm, Controller } from "react-hook-form"
import { useParams } from 'react-router-dom'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';
import ProfileBadge from './components/ProfileBadge';
import MemberForm from './team/MemberForm';

const columns = [
  { field: 'name', type: 'string', flex: 0.3 },
  { field: 'phone', type: 'string', flex: 0.2 },
  { field: 'email', type: 'string', flex: 0.3 },
  { field: 'company', type: 'string', flex: 0.2 },
  { field: 'notes', type: 'string', flex: 0.4 },
  { field: 'subscription', type: 'string', flex: 0.2 }
]

function YourTeam({ add }) {

  const [user] = useAuthState(auth)

  const [data, setData] = useState([])

  const fetchData = async () => {

    try {
      await axios.get(`https://kendrix.kendrix.website/json/team.json`)
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
  const onSubmit = data => console.log(data);

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
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

  const [state, setState] = useState({
    all: true
  });

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  const modalContent = (         
    <>
      <ProfileBadge teamMember={selectedData} />

      <MemberForm 
        addMember={false}
        memberAccess={true} 
      />
    </>
  )

  return (
    <>
      <List title={'Your Team'} columns={columns} data={data} modalTitle={'Add/Edit Team Member'} modalContent={modalContent} size={'large'} add={add ? true : false} defaultcolor={true} />
    </>
  )
}

export default YourTeam
