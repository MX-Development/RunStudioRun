import React, { useState } from 'react'
import styled from 'styled-components'
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import './Reports.css';

import PageTitle from '../layout/PageTitle'

function Reports() {

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [showButton, setShowButton] = useState(false);

  function checkButton(selected) {
    console.log(selected)
    const selectedStartDate = selected[0].startDate
    const selectedEndDate = selected[0].endDate

    if (selectedStartDate !== selectedEndDate) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  return (
    <>
      <PageTitle title={'Reports'} />

      <TypeSelector>
        <Item>
          Summary
        </Item>
        <Item>
          Detailed
        </Item>
        <Item>
          Weekly
        </Item>
      </TypeSelector>

      <FilterSelector>
        <p>Filter</p>
        <Item>
          Team
        </Item>
        <Item>
          Client
        </Item>
        <Item>
          Project
        </Item>
        <Item>
          Task
        </Item>
        <Item>
          Expense
        </Item>
      </FilterSelector>

      <DateRangePicker
        onChange={item => {
          setSelectedRange([item.selection])
          checkButton([item.selection])
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={selectedRange}
        direction="horizontal"
      />

      <PickerFooter className={showButton ? 'shown' : ''}>
        <button className="btn btn-gold">Generate report</button>
      </PickerFooter>
    </>
  )
}

export default Reports

const TypeSelector = styled.div`
  display: flex;
`

const FilterSelector = styled.div`
  display: flex;
`

const Item = styled.button`
  display: flex;
`

const PickerFooter = styled.div`
  background: #fff;
  padding: 0 20px 20px;
  width: 890px;
  justify-content: flex-end;
  display: none;

  &.shown {
    display: flex;
  }
`
