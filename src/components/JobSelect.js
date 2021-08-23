import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios';

function JobSelect() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/jobs.json`)
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
  }, [])

  return (
    <>
    {
      data.map(job => {
        <JobItem>
          Test
        </JobItem>
      })
    }
    </>
  )
}

export default JobSelect

const JobItem = styled.div`
  
`
