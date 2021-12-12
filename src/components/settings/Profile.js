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
        <MemberForm />

      </ProfileContainer>
    </>
  )
}

export default Profile

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`

const AvatarContainer = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  border-radius: 50%;
  transition: opacity .25s ease-in-out;
  z-index: 5;
  color: #fff;

  > span {
    font-size: 14px;
  }

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > h5 {
    margin-bottom: 5px;
    font-weight: bold;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  width: 66.6%;
`
