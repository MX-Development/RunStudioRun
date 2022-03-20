import React from 'react'
import styled from 'styled-components'

import PageTitle from '../../layout/PageTitle'

import ProfileBadge from '../components/ProfileBadge';
import MemberForm from '../team/MemberForm';

function Profile() {

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
  background: var(--white);
  padding: 20px;
  width: 66.6%;
`
