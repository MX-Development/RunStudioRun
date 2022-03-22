import React from 'react'
import styled from 'styled-components'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../config/firebase'

import Avatar from '@material-ui/core/Avatar';

function ProfileBadge({ teamMember }) {

  const [user] = useAuthState(auth)

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <MemberAvatar>
        <AvatarContainer>
          <Avatar alt={ teamMember ? teamMember.name : user?.displayName } src={ teamMember ? teamMember?.avatar : user?.photoURL }>
            { teamMember ? teamMember.name?.charAt(0) : user?.displayName?.charAt(0) } 
          </Avatar>
          <Overlay onClick={(e) => uploadAvatar()}>
            <span>Upload</span>
          </Overlay>
        </AvatarContainer>
        <MemberInfo>
          <h5>{ teamMember ? teamMember.name : user?.displayName } <Badge>Admin</Badge></h5>
          <p>Position</p> 
          <button style={{ marginTop: '10px', width: 'fit-content' }} className="btn gray-border">Change admin</button>
        </MemberInfo>
      </MemberAvatar>
    </div>
  )
}

export default ProfileBadge

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .MuiAvatar-root {
    width: 100px !important;
    height: 100px !important;
  }
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
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
`

const Badge = styled.div`
  padding: 5px 15px;
  background: #B1B0AF;
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  border-radius: 2px;
  margin-left: 10px;
`
