import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

import moment from 'moment'

import axios from 'axios';

import './ToDos.css'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'

import Clock from '../assets/icons/Clock.svg'

import AdditionalTime from './components/AdditionalTime';
 
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Calendar() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const centerModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '550px'
    },
  };

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const history = useHistory();
  const [events, setEvents] = useState([])

  const [userSettings, setUserSettings] = useState([])
  const fetchData = async () => {

    try {
      await axios.get(`/json/settings.json`)
        .then(res => {
          setUserSettings(res.data);
        })

      await axios.get(`/json/estimates/items.json`)
        .then(res => {
          setEvents([])

          const tasks = res.data
          tasks.forEach(task => {
            let taskObject = {
              title: task.title, 
              start: moment(task.startDate).format(),
              end: moment(task.startDate).add(task.time, 'minutes').format(),
              description: task.description,
              time: task.time,
              jobTitle: 'Job Title',
              editable: true,
              eventDurationEditable: true
            }

            setEvents(events => [...events, taskObject])
          })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    console.log(userSettings);
    console.log(userSettings.slot_intervals)
  }, [userSettings]);

  useEffect(() => {
    fetchData()
    
    let draggableEl = document.getElementById("task-list")
    new Draggable(draggableEl, {
      itemSelector: ".dragabble-task",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        let time = eventEl.getAttribute("data-time");
        let time_worked = eventEl.getAttribute("data-time-worked");
        let description = eventEl.getAttribute("data-description");
        return {
          title: title,
          id: id,
          time: time,
          time_worked: time_worked,
          description: description,
          editable: true,
          eventDurationEditable: true
        };
      }
    })
  }, [])

  const handleEventClick = () => {
    console.log('handleEventClick')
  }

  const changeMember = event => {
    const memberID = event.target.value
    history.push(`/to-do/${memberID}`)
  }

  return (
    <div style={{ position: 'relative' }}>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={centerModal}
        contentLabel="Example Modal"
      >
        <ModalBody>
          <ModalHeading>
            <h2>Additional Time</h2>
            {/* { modalAction ? modalAction : null} */}
          </ModalHeading>
          <AdditionalTime />
        </ModalBody>
      </Modal>
    
      <MemberSelect>
        <FormGroup>
          <FormControl variant="outlined">
            <Select
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
              value={'Taso Katsionis'}
              style={{ width: '100%', background: 'var(--white)' }}
              onChange={changeMember}
            >
              <MenuItem value="">
                <em>Select member</em>
              </MenuItem>
              <MenuItem value={'Taso Katsionis'} key={1}>Taso Katsionis</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <AddTime onClick={() => setIsOpen(true)}>
          <img src={Clock} alt="clock icon" />
        </AddTime>
      </MemberSelect>

      <FullCalendar
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        droppable={true}
        allDaySlot={false}
        // customButtons={{
        //   myCustomButton: {
        //     text: 'custom!',
        //     click: function() {
        //       alert('clicked the custom button!');
        //     }
        //   }
        // }}
        headerToolbar={{
          left: 'prev,next today title',
          right: ''
        }}
        weekends={false}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        scrollTime={'08:45:00'}
        slotDuration={userSettings.slot_intervals ? userSettings.slot_intervals : `00:30:00`}
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
        eventDragStart={function( info ) {
          let parent = info.el.parentNode;

          console.log(info.jsEvent.target)

          // parent.classList.remove('not-dragged');
        }}
        eventResize={function(event, info) {
          console.log(event);
          console.log(info);
          // event.setExtendedProp('time_worked', 'hallo')
        }}
        eventDragStop={function( info ) {
          console.log(info);
          let parent = info.el.parentNode;

          parent.classList.add('not-dragged');
        }}
        eventChange={function (changeInfo) {
          console.log(changeInfo);
          const timeWorked = changeInfo.event.extendedProps['time_worked'];
          // if (timeWorked !== )
          renderHeaderContent(changeInfo);

          // changeInfo.event.setExtendedProp('time_worked', 1000);
        }}
        eventStartEditable={true}
        eventDidMount={
          function(info) {
            let parent = info.el.parentNode;

            parent.classList.remove('not-dragged');
          }
        }
      />
    </div>
  )
}

export default Calendar

// const eventDragging = (info) => {
//   info.el.querySelector('.event-container').classList.add('dragged')
//   info.el.querySelector('.event-container').style.transform = 'rotate(45deg)'
// }

// const eventStopDragging = (info) => {
//   info.el.querySelector('.event-container').classList.remove('dragged')
//   info.el.querySelector('.event-container').style.background = 'var(--white)'
// }

function renderEventContent(eventInfo) {

  let totalTime = eventInfo.event.extendedProps.time
  let timeWorked = eventInfo.event.extendedProps.time_worked
  // let remaining = totalTime - timeWorked
  let percentage = timeWorked / totalTime * 100

  return (
    <div className="event-container">
      <div className="event-header">
        <h5>{eventInfo.event.title}</h5>
        <h6 style={{ fontWeight: '500', margin: '2.5px 0' }}>{eventInfo.event.extendedProps.jobTitle}</h6>
        <span className="type" style={{ fontWeight: '400' }}>Client</span>
      </div>
      <div className="event-description">
        <p>
          {eventInfo.event.extendedProps.description}
        </p>
      </div>
      <div className="event-footer">
        <div className="event-time">
          <div className="time-meta">
            <span>{(new Date(timeWorked * 1000)).toUTCString().match(/(\d:\d\d:)/)[0].replace(':', 'h').replace(':', 'm')}</span>
            <span>{(new Date(totalTime * 1000)).toUTCString().match(/(\d:\d\d:)/)[0].replace(':', 'h').replace(':', 'm')}</span>
          </div>
          <div className="card-time">
            <span className="total-bar"></span>
            <span className="worked-bar" style={{ width: percentage + '%' }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderHeaderContent(eventInfo) {
  console.log('Event info: ', eventInfo)
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

function renderDayContent(eventInfo) {
  // console.log(eventInfo)
}

const MemberSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  top: 3px;
  width: 250px;

  > .MuiFormGroup-root {
    width: 100%;
  }
`

const AddTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 50px;
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin-left: 10px;

  &:hover { 
    cursor: pointer;
  }
`

const ModalBody = styled.div`
  position: relative;

  > h2 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 15px;
  }
` 

const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`
