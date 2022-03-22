import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import {
  useHistory
} from "react-router-dom"

import PageTitle from '../../../layout/pages/PageTitle'

import ProfileBadge from '../../components/ProfileBadge';
import MemberForm from '../yourTeam/components/MemberForm';

function Profile() {

  let history = useHistory()

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/profile.json`)
        .then(res => {
          setSelectedData(res.data[0])
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, [history]);

  return (
    <>
      <PageTitle title={'Your Profile'} />

      <ProfileContainer>   

        <ProfileBadge teamMember={selectedData} />
        <MemberForm 
          addMember={true}
          memberAccess={false} 
          data={selectedData}
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
