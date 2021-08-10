import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

import './Calendar.css'

import Clock from './assets/icons/Clock.svg'

function Calendar() {

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
        eventDragStart={(info) => eventDragging(info)}
        eventDragStop={(info) => eventStopDragging(info)}
        scrollTime={'09:00:00'}
        slotDuration={'00:15:00'}
        slotLabelInterval={'01:00'}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false
        }}
        dayHeaderFormat={{
          weekday: 'long'
        }}
        dayHeaderContent={renderHeaderContent}
        events={[
          { 
            title: 'Task 1', 
            start: '2021-08-11T10:30:00',
            end: '2021-08-11T12:30:00',
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.',
            editable: true,
            eventDurationEditable: true,
            extendedProps: {
              department: 'BioChemistry'
            }
          },
          { 
            title: 'Task 2', 
            start: '2021-08-13T10:30:00',
            end: '2021-08-13T12:30:00',
            description: 'Lecture',
            editable: true,
            eventDurationEditable: true 
          },
          { 
            title: 'Task 3', 
            start: '2021-08-13T20:45:00',
            end: '2021-08-13T21:00:00',
            description: 'Lecture',
            editable: true,
            eventDurationEditable: true 
          },
          { 
            title: 'Task 3', 
            start: '2021-08-13T20:30:00',
            end: '2021-08-13T20:45:00',
            description: 'Lecture',
            editable: true,
            eventDurationEditable: true 
          }
        ]}
        eventDidMount={function(info) {
          console.log(info.event.extendedProps);
        }}
      />
    </>
  )
}

export default Calendar

const eventDragging = (info) => {
  info.el.querySelector('.event-container').classList.add('dragged')
}

const eventStopDragging = (info) => {
  info.el.querySelector('.event-container').classList.remove('dragged')
}

function renderEventContent(eventInfo) {
  // console.log(eventInfo)
  return (
    <div className="event-container">
      <div className="event-header">
        <h3>{eventInfo.event.title}</h3>
        <h6>PROJECT PREFIX / Job Name</h6>
        <span className="type">Client</span>
      </div>
      <div className="event-description">
        <p>
          {eventInfo.event.extendedProps.description}
        </p>
      </div>
      <div className="event-footer">
        <div className="remaining">
          <img src={Clock} alt="Clock icon" />
          <span>Remaining <strong>0hr00m</strong></span>
        </div>
      </div>
    </div>
  )
}

function renderHeaderContent(eventInfo) {
  console.log(eventInfo)
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
