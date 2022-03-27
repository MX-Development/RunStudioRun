import React, { useEffect, useState } from 'react'

import axios from 'axios';

import List from '../../../layout/tables/List'
import { useParams } from 'react-router-dom'

import {
  useHistory
} from "react-router-dom"

import ProfileBadge from '../../components/ProfileBadge';
import MemberForm from './components/MemberForm';

// Define table columns
const columns = [
  { field: 'name', type: 'string', flex: 0.3 },
  { field: 'phone', type: 'string', flex: 0.2 },
  { field: 'email', type: 'string', flex: 0.3 },
  { field: 'company', type: 'string', flex: 0.2 },
  { field: 'notes', type: 'string', flex: 0.4 },
  { field: 'subscription', type: 'string', flex: 0.2 }
]

function YourTeam({ add }) {

  let history = useHistory()

  const [data, setData] = useState([])

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/team.json`)
        .then(res => {
          setData(res.data)
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

  // Get team member's ID from URL query when a member is selected
  let { id } = useParams();
  const selectedID = id;

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // Set selected data depending on selected member on the front-end
  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, data, selectedID]);

  // Modal content for team member popup
  const modalContent = (         
    <>
      <ProfileBadge teamMember={selectedData} />

      <MemberForm 
        addMember={false}
        memberAccess={true} 
        data={selectedData}
      />
    </>
  )

  return (
    <>
      <List 
        title={'Your Team'} 
        buttons={[
          {
            "label": "Add",
            "action": function() { history.push(`/team/add`) }
          },
          {
            "label": "Print",
            "action": function() { alert('Print...') }
          }
        ]}
        columns={columns} 
        data={data} 
        modalTitle={'Add/Edit Team Member'} 
        modalContent={modalContent} 
        size={'large'} 
        add={add ? true : false} 
        defaultcolor={true} 
      />
    </>
  )
}

export default YourTeam
