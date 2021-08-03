import React from 'react'
import styled from 'styled-components'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import PageTitle from '../layout/PageTitle'
import FilterOption from './FilterOption'

import Table from '../Table'
import TableRows from '../TableRows'

function Projects() {

  const tableData = [
    { 
      title: 'OCT0919 - Credentials Document',
      company: 'Octogon Design',
      description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
      dateEntered: '1 Sep 2017',
      dueDate: '30 Sep 2017',
      status: 'ongoing'
    },
    { 
      title: 'OCT0919 - Credentials Document',
      company: 'Octogon Design',
      description: 'Enter the job description and if you’d like the client to understand what you will be working on select the tick to publish this description in your estimate. This window is character limited…',
      dateEntered: '1 Sep 2017',
      dueDate: '30 Sep 2017',
      status: 'ongoing'
    }
  ]

  return (
    <>
      <PageTitle title={'Projects'} />

      <FilterBar> 
        <FilterOption title={'Project'} Icon={ArrowDownwardIcon} width={25} />
        <FilterOption title={'Description'} Icon={ArrowDownwardIcon} width={35} />
        <FilterOption title={'Team'} Icon={ArrowDownwardIcon} width={5} />
        <FilterOption title={'Entered'} Icon={ArrowDownwardIcon} width={5} />
        <FilterOption title={'Due Date'} Icon={ArrowDownwardIcon} width={5} />
        <FilterOption title={'Action'} Icon={ArrowDownwardIcon} width={5} />
        <FilterOption title={'Status'} Icon={ArrowDownwardIcon} width={10} />
        <FilterOption title={'Test'} Icon={ArrowDownwardIcon} width={5} />
      </FilterBar>

      <Table>
        {/* 
          TODO: Add team members
          TODO: Add action 
        */}
        <TableRows data={tableData} />
      </Table>
    </>
  )
}

export default Projects

const FilterBar = styled.div`
  display: flex;
  background: #DDDBD780;
  margin-bottom: 20px;
  padding: 10px;
`
