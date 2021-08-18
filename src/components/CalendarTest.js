import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

import moment from 'moment'

import axios from 'axios';

import './Calendar.css'

import Clock from './assets/icons/Clock.svg'

function Calendar() {
  // title: 'Task', 
  // start: '2021-08-09T09:00:00',
  // end: '2021-08-09T11:00:00',
  // description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.',

  // extendedProps: {
  //   department: 'BioChemistry'
  // }

  const eventOptions = {
    editable: true,
    eventDurationEditable: true,
  }

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])
  const [events, setEvents] = useState([])
  const fetchData = async () => {
    setIsLoading(true);

    try {
      await axios.get(`https://kendrix.kendrix.website/json/estimates.json`)
        .then(res => {
          setData(res.data)
          setEvents([])

          const estimates = res.data
          estimates.map(estimate => {
            estimate.structure.stages.map(event => {
              event.tasks.map(task => {

                let taskObject = {
                  title: task.title, 
                  start: moment(task.startDate).format(),
                  end: moment(task.startDate).add(task.time, 'minutes').format(),
                  description: task.description,
                  time: moment.duration(task.time, "minutes").asSeconds(),
                  jobTitle: estimate.structure.overview,
                  editable: true,
                  eventDurationEditable: true
                }

                console.log(moment(task.startDate).format())
                console.log(moment(task.startDate).add(75, 'minutes').format())

                console.log(event)

                setEvents(events => [...events, taskObject])
              })
            })
          })
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

  const handleDateClick = () => {
    console.log('test')
  }

  return (
    <>
      <FullCalendar
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        allDaySlot={false}
        weekends={false}
        eventClick={handleDateClick}
        eventContent={renderEventContent}
        // eventDragStart={(info) => eventDragging(info)}
        // eventDragStop={(info) => eventStopDragging(info)}
        eventDragStart={function( info ) {
          // info.el.style.transform = 'rotate(45deg)'
        }}
        scrollTime={'08:45:00'}
        slotDuration={'00:15:00'}
        slotLabelInterval={'01:00'}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false
        }}
        businessHours={{
          dow: [1, 2, 3],
          start: '08:00',
          end: '18:00'
        }}
        dayHeaderFormat={{
          weekday: 'long'
        }}
        dayHeaderContent={renderHeaderContent}
        events={events}
        eventDidMount={function(info) {
          console.log(info.event.extendedProps);
        }}
      />
    </>
  )
}

export default Calendar

// const eventDragging = (info) => {
//   info.el.querySelector('.event-container').classList.add('dragged')
//   info.el.querySelector('.event-container').style.transform = 'rotate(45deg)'
// }

// const eventStopDragging = (info) => {
//   info.el.querySelector('.event-container').classList.remove('dragged')
//   info.el.querySelector('.event-container').style.background = '#fff'
// }

function renderEventContent(eventInfo) {

  let seconds = eventInfo.event.extendedProps.time
  console.log(eventInfo)
  return (
    <div className="event-container">
      <div className="event-header">
        <h3>{eventInfo.event.title}</h3>
        <h6 style={{ fontWeight: '500', margin: '2.5px 0' }}>{eventInfo.event.extendedProps.jobTitle}</h6>
        <span className="type" style={{ fontWeight: '400' }}>Client</span>
      </div>
      <div className="event-description">
        <p>
          {eventInfo.event.extendedProps.description}
        </p>
      </div>
      <div className="event-footer">
        <div className="remaining">
          <img src={Clock} alt="Clock icon" />
          <span>Remaining <strong>{new Date(seconds * 1000).toISOString().substr(11, 5)}m</strong></span>
        </div>
      </div>
    </div>
  )
}

function renderHeaderContent(eventInfo) {
  // console.log(eventInfo)
  return (
    <div className="table-heading">
      <div className="day">
        { eventInfo.text }
      </div>
      <div className="time-bar">
        <span className="bar"></span>
        <span className="time-worked">5h15m</span>
        <span className="time-total">7h330m</span>
      </div>
    </div>
  )
}