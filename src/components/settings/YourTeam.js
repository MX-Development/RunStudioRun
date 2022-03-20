import React, { useEffect, useState } from 'react'

import axios from 'axios';

import List from '../List'
import { useParams } from 'react-router-dom'

import {
  useHistory
} from "react-router-dom"

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

  let history = useHistory()

  const [data, setData] = useState([])

  const fetchData = async () => {

    try {
      await axios.get(`/json/team.json`)
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

  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    if (id) {
      const dataSelect = data.filter(obj => {
        return obj.id === parseInt(selectedID)
      })

      setSelectedData(dataSelect[0])
    }
  }, [id, data, selectedID]);

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
