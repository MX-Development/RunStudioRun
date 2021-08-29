import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

import moment from 'moment'

import axios from 'axios';

import './ToDos.css'

import Clock from '../assets/icons/Clock.svg'

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
      await axios.get(`https://kendrix.kendrix.website/json/estimates/items.json`)
        .then(res => {
          setData(res.data)
          setEvents([])

          console.log(res.data)

          const tasks = res.data
          tasks.map(task => {
            console.log(task)
            let taskObject = {
              title: task.title, 
              start: moment(task.startDate).format(),
              end: moment(task.startDate).add(task.time, 'minutes').format(),
              description: task.description,
              time: moment.duration(task.time, "minutes").asSeconds(),
              jobTitle: 'Job Title',
              editable: true,
              eventDurationEditable: true
            }

            setEvents(events => [...events, taskObject])

            console.log(events)
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
    
    let draggableEl = document.getElementById("task-list")
    new Draggable(draggableEl, {
      itemSelector: ".dragabble-task",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        let time = eventEl.getAttribute("data-time");
        let description = eventEl.getAttribute("data-description");
        return {
          title: title,
          id: id,
          time: time,
          description: description,
          editable: true,
          eventDurationEditable: true
        };
      }
    })
  }, [])

  const handleDateClick = () => {
    console.log('test')
  }

  return (
    <>
      <FullCalendar
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        droppable={true}
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
        dayCellContent={renderDayContent}
        events={events}
        eventDidMount={
          function(info) {
            // console.log(info.event.extendedProps);
            console.log('Event did mount')
            renderHeaderContent(info, 'testing')
          }
        }
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
          <span>Remaining <strong>{seconds ? new Date(seconds * 1000).toISOString().substr(11, 5) : null}h</strong></span>
        </div>
      </div>
    </div>
  )
}

function renderHeaderContent(eventInfo, fftesten) {
  console.log(eventInfo)
  return (
    <div className="table-heading">
      <div className="day">
        { eventInfo.text } { fftesten }
      </div>
      <div className="time-bar">
        <span className="bar"></span>
        <span className="time-worked">5h15m</span>
        <span className="time-total">7h330m</span>
      </div>
    </div>
  )
}

function renderDayContent(eventInfo) {
  console.log(eventInfo)
}
