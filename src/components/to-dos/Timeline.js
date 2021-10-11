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

import axios from 'axios';

function Timeliner() {

  const groups = [
    { 
      id: 1, title: 'group 1' 
    }, 
    { 
      id: 2, title: 'group 2'
    }
  ]
  
  const items = [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment(),
      end_time: moment().add(1, 'hour'),
      itemTitleKey: 'test123',
      itemProps: {
        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
        'data-custom-attribute': 'Random content',
        'aria-hidden': true,
        onDoubleClick: () => { console.log('You clicked double!') },
        className: 'weekend',
        style: {
          background: 'fuchsia'
        }
      }
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour')
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour')
    }
  ]

  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      >
  <TimelineHeaders>
    <SidebarHeader>
      {({ getRootProps }) => {
        return <div {...getRootProps()}>Left</div>
      }}
    </SidebarHeader>
    <SidebarHeader variant="right" headerData={{someData: 'extra'}}>
      {({ getRootProps, data }) => {
        return <div {...getRootProps()}>Right {data.someData}</div>
      }}
    </SidebarHeader>
    <DateHeader unit="primaryHeader" />
    <DateHeader />
  </TimelineHeaders>
  <TimelineMarkers>
    <TodayMarker />
    <CustomMarker date={moment()}>
      {/* custom renderer for this marker */}
      {({ styles, date }) => {
        const customStyles = {
          ...styles,
          backgroundColor: 'deeppink',
          width: '40px'
        }
        return <div style={customStyles} />
      }}
    </CustomMarker>
    <CursorMarker />
  </TimelineMarkers>
      </Timeline>
    </div>
  )
}

export default Timeliner
