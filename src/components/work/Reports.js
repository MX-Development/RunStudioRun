import React from 'react'
import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import PageTitle from '../layout/PageTitle'

function Reports() {

  function handleSelect(ranges) {
    console.log(ranges)
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  return (
    <>
      <PageTitle title={'Reports'} />

      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
    </>
  )
}

export default Reports
