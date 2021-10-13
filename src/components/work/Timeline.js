import React, { useState, useEffect } from 'react'
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import './Timeline.css'

import axios from 'axios';

function Timeliner() {

  const groups = [
    { 
      id: 1, title: 'Brand Design', jobNo: 'ACD4209', stackItems: true, height: 120
    }, 
    { 
      id: 2, title: 'Brand Design', jobNo: 'ACD4209', stackItems: true, height: 120
    }
  ]

  const groupRenderer = ({ group }) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span className="title">{group.title}</span>
        <span className="title">{group.jobNo}</span>
      </div>
    )
  }

  const itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    return (
      <div {...getItemProps(item.itemProps)}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
  
        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </div>
  
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
      </div>
    )}
  
  const items = [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment('2021-10-13'),
      end_time: moment('2021-10-21'),
      itemProps: {
        style: {
          background: '#E0BC77',
          border: 'none'
        }
      }
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment('2021-10-14'),
      end_time: moment('2021-10-25'),
      itemProps: {
        style: {
          background: '#E0BC77',
          border: 'none'
        }
      }
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment('2021-10-17'),
      end_time: moment('2021-10-30'),
      itemProps: {
        style: {
          background: '#E0BC77',
          border: 'none'
        }
      }
    }
  ]

  return (
    <div>
      <Timeline
        groups={groups}
        groupRenderer={groupRenderer}
        items={items}
        itemRenderer={itemRenderer}
        defaultTimeStart={moment().add(-6, 'hour')}
        defaultTimeEnd={moment().add(6, 'hour')}
      >

        <TimelineHeaders>
          {/* <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Job</div>
            }}
          </SidebarHeader> */}
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>

        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>

      </Timeline>
    </div>
  )
}

export default Timeliner
