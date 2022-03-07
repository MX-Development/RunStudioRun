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
import Ellipsis from '../assets/icons/CardEllipsis.svg'

import AdditionalTime from './components/AdditionalTime';
 
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Calendar({ action, taskID }) {

  const calendarRef = React.createRef()

  useEffect(() => {
    if (action === 'edit') {
      // Edit task
      
    }
  }, [action]);

  const [actionNav, setActionNav] = useState(false);

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
              end: moment(task.startDate).add(task.time, 'seconds').format(),
              description: task.description,
              time: task.time,
              time_worked: task.time_worked,
              jobTitle: 'Job Title',
              editable: true,
              taskID: task.id,
              eventDurationEditable: true
            }

            setEvents(events => [...events, taskObject])
          })
        })
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {

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

  const [events, setEvents] = useState([])
  const [eventsMounted, setEventsMounted] = useState([]);

  useEffect(() => {
    console.log('Events: ', events);
  }, [events]);

  // When event is moved/added - not resized
  const mountEvent = (info) => {

    const eventID = info.event._def.publicId;

    // Check if event with ID is already in array
    const exists = eventsMounted.filter(ev => parseInt(ev._def.publicId) === parseInt(eventID))
    
    if (exists.length > 0) {
      // Event does exist in array - update it
      const updatedEvents = eventsMounted.filter((ev) => ev._def.publicId !== info.event._def.publicId);
      setEventsMounted([...updatedEvents, info.event])
    } else {
      // Event doesn't exist in array - push it
      setEventsMounted(eventsMounted => [...eventsMounted, info.event])
    }
  }

  // Render day header content on load
  function renderHeaderContent(eventInfo) {  
    return (
      <div className="table-heading">
        <div className="day">
          { eventInfo.text } 
        </div>
        <div className="time-bar">
          <span className="bar" style={{ width: '0%' }}></span>
          <span className="time-worked">0h</span>
          <span className="time-total">8h</span>
        </div>
      </div>
    )
  }

  const setDayHeader = (info) => {

    let calendarApi = calendarRef.current.getApi()
    const eventsOnMap = calendarApi.getEvents();
    console.log('Events on calendar: ', eventsOnMap);

    const headerDay = moment(info.event.start).format('YYYY-MM-DD');

    let totalDayTime = 0;

    eventsOnMap.map(ev => {

      const eventDay = moment(ev.start).format('YYYY-MM-DD');

      // Return when event date is not the same as changed event
      if (eventDay !== headerDay) return;

      // Set start time
      const startTime = moment(ev.start);
      let endTime;
      // Check if end time exists - if not it means that the card has not been resized yet, so end time = start time + 1 hour
      if (ev.end) {
        endTime = moment(ev.end);
      }

      let eventTime;
      if (endTime) {
        eventTime = moment.duration(endTime.diff(startTime));
        const hours = parseInt(eventTime.asHours());
        const minutes = parseInt(eventTime.asMinutes()) % 60;

        eventTime = hours + (minutes / 60);
        totalDayTime = totalDayTime + eventTime;
      } else {
        eventTime = 1;
        totalDayTime = totalDayTime + 1;
      }
    })

    const header = document.querySelector(`[data-date="${headerDay}"]`);
    let timeWorked = header.querySelector('.time-worked').innerHTML;
    timeWorked = timeWorked.replace('h', '');
    timeWorked = parseInt(timeWorked);

    const percentage = parseInt(totalDayTime) / 8 * 100;

    header.querySelector('.time-worked').innerHTML = `${totalDayTime.toFixed(1)}h`;  

    if (percentage < 100) {
      header.querySelector('.bar').style.width = `${percentage}%`; 
      header.querySelector('.bar').style.background = `var(--gold)`; 
      header.querySelector('.time-total').style.color = `var(--text-gray)`; 
    } else {
      // You have overworked for the day
      header.querySelector('.bar').style.width = `100%`; 
      header.querySelector('.bar').style.background = `#DE5454`; 
      header.querySelector('.time-worked').innerHTML = `Over Worked!`;  
      header.querySelector('.time-total').innerHTML = `${totalDayTime.toFixed(1)}h`;  
      header.querySelector('.time-total').style.color = `#FFFFFF`; 
    }
  }

  function deleteTime(eventInfo) {
    console.log('Delete time', eventInfo);
    console.log('All events', events);

    let calendarApi = calendarRef.current.getApi()
    const selectedEvent = calendarApi.getEventById(eventInfo.event.id);
    selectedEvent.remove();
  }

  function editTask(eventInfo) {
    const taskID = eventInfo.event._def.extendedProps.taskID;
    console.log(taskID);
    
    history.push(`/items-and-tasks/${taskID}`)
  }

  function renderEventContent(eventInfo) {
  
    let totalTime = eventInfo.event.extendedProps.time
    let timeWorked = eventInfo.event.extendedProps.time_worked
    // let remaining = totalTime - timeWorked
    let percentage = timeWorked / totalTime * 100
  
    function openNav() {
      setActionNav(!actionNav)
    }

    // Change event day header
    setDayHeader(eventInfo);
  
    return (
      <>
        <ActionNav className={actionNav ? 'active' : ''}>
          <ActionItem onClick={() => setIsOpen(!modalIsOpen)}>
            Commit Time
          </ActionItem>
          <ActionItem onClick={() => editTask(eventInfo)}>
            View & Edit
          </ActionItem>
          <ActionItem onClick={() => deleteTime(eventInfo)}>
            Delete Time
          </ActionItem>
        </ActionNav>
        <div className="event-container">
          <div className="event-header">
            <h5>{eventInfo.event.title}</h5>
            <h6 style={{ fontWeight: '500', margin: '2.5px 0' }}>{eventInfo.event.extendedProps.jobTitle}</h6>
            <span className="type" style={{ fontWeight: '400' }}>Client</span>
            <div className="event-action" onClick={openNav}>
              <img src={Ellipsis} alt="action icon" />
            </div>
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
      </>
    )
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
            <h2>Commit Time</h2>
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
        ref={calendarRef}
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

          // parent.classList.remove('not-dragged');
        }}
        eventResize={function(event, info) {
          // event.setExtendedProp('time_worked', 'hallo')
        }}
        eventDragStop={function( info ) {
          let parent = info.el.parentNode;
          

          parent.classList.add('not-dragged');
        }}
        eventChange={function (changeInfo) {
          // console.log(changeInfo);
          const timeWorked = changeInfo.event.extendedProps['time_worked'];
          // if (timeWorked !== )
          renderHeaderContent(changeInfo);

          // changeInfo.event.setExtendedProp('time_worked', 1000);
        }}
        eventStartEditable={true}
        eventDidMount={info => mountEvent(info)}
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

function renderDayContent(eventInfo) {
  
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

const ActionNav = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  transform: translate(-25%,-50%);
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 4px 4px 4px 4px;
  padding: 10px;
  background: var(--white);
  z-index: 999;
  left: -9999px;
  opacity: 0;
  transition: opacity .35s ease-in-out;

  &.active {
    opacity: 1;
    left: auto;
    right: 0;
    transition: opacity .35s ease-in-out;
  }
`

const ActionItem = styled.button`
  padding: 7.5px 10px;
  text-decoration: none;
  color: #292724;
  font-size: 14px;
  display: flex;
  word-wrap: none;
  border: none;
  background: transparent;
  white-space: nowrap;
  transition: background .35s ease-in-out;

  &:hover {
    cursor: pointer;
    background: #F4F2F0;
    transition: background .35s ease-in-out;
  }
`
