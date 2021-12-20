import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import {
  Link
} from "react-router-dom"

import PageTitle from '../layout/PageTitle'

import Avatar from '@material-ui/core/Avatar';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import AvailableHours from './profile/components/AvailableHours';
import ProfileBadge from './components/ProfileBadge';
import MemberForm from './team/MemberForm';

function Profile() {

  const [user] = useAuthState(auth)

  return (
    <>
      <PageTitle title={'Your Profile'} />

      <ProfileContainer>   

        <ProfileBadge />
        <MemberForm 
          addMember={true}
          memberAccess={false} 
        />

      </ProfileContainer>
    </>
  )
}

export default Profile

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  width: 66.6%;
`
