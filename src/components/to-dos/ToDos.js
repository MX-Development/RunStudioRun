import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

import moment from 'moment'

import axios from 'axios';

import './ToDos.css'

import { useParams } from "react-router-dom"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'

import Clock from '../assets/icons/Clock.svg'
import Ellipsis from '../assets/icons/CardEllipsis.svg'

import AdditionalTime from './components/modals/AdditionalTime';
import EditTask from './components/modals/EditTask';
 
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Calendar({ action, taskID }) {
  
  let { member_id } = useParams();

  const calendarRef = React.createRef()

  useEffect(() => {
    if (action === 'edit') {
      // Edit task
      
    }
  }, [action]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
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
  const [teamMembers, setTeamMembers] = useState([])
  const fetchData = async () => {

    try {
      await axios.get(`/json/settings.json`)
        .then(res => {
          setUserSettings(res.data);
        })

      await axios.get(`/json/team.json`)
        .then(res => {
          setTeamMembers(res.data);
        })

      await axios.get(`/json/estimates/items.json`)
        .then(res => {
          setEvents([])

          const tasks = res.data;
          tasks.forEach((task, index) => {
            let taskObject = {
              id: task.id,
              title: task.title, 
              start: moment(task.startDate).format(),
              end: moment(task.startDate).add(task.time, 'seconds').format(),
              description: task.description,
              time: task.time,
              time_worked: task.time_worked,
              jobTitle: 'Job Title',
              jobId: task.jobId,
              projectId: task.projectId,
              editable: true,
              taskID: task.id,
              eventDurationEditable: true
            }

            console.log(task.team);
            console.log(parseInt(member_id));
            if (task.team.includes(parseInt(member_id))) {
              setEvents(events => [...events, taskObject])
            }

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

    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".dragabble-task",
        eventData: function(eventEl) {
          console.log('Event data: ', eventEl);
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let time = eventEl.getAttribute("data-time");
          let time_worked = eventEl.getAttribute("data-time-worked");
          let description = eventEl.getAttribute("data-description");
          let jobId = eventEl.getAttribute("data-job-id");
          let projectId = eventEl.getAttribute("data-project-id");
          return {
            title: title,
            id: id,
            time: time,
            time_worked: time_worked,
            description: description,
            jobId: jobId,
            projectId: projectId,
            editable: true,
            eventDurationEditable: true
          };
        }
      })
    }
  }, [member_id])

  const handleEventClick = () => {
    console.log('handleEventClick')
  }

  const changeMember = event => {
    console.log('Active member: ', member_id);
    const memberID = event.target.value
    history.push(`/to-do/member/${memberID}`)
  }

  const [events, setEvents] = useState([])
  const [eventsMounted, setEventsMounted] = useState([]);

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

    const headerDay = moment(info.event.start).format('YYYY-MM-DD');

    let totalDayTime = 0;

    let allDaysFilled = [];

    eventsOnMap.forEach(ev => {

      const eventDay = moment(ev.start).format('YYYY-MM-DD');
      allDaysFilled.push(eventDay);

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

    const allHeaders = document.querySelectorAll(`[data-date]`);
    allHeaders.forEach(head => {
      const date = head.getAttribute('data-date');
      if (allDaysFilled.includes(date)) return;
 
      if (head) {
        const header = document.querySelector(`[data-date="${date}"]`);
        header.querySelector('.time-worked').innerHTML = `0h`;  
        header.querySelector('.bar').style.width = `0%`; 
      } 
    })


    const header = document.querySelector(`[data-date="${headerDay}"]`);
    if (!header) return;

    const percentage = parseInt(totalDayTime) / 8 * 100;

    header.querySelector('.time-worked').innerHTML = `${totalDayTime.toFixed(1)}h`;  

    if (percentage < 35) {
      header.querySelector('.bar').style.width = `${percentage}%`; 
      header.querySelector('.bar').style.background = `#77E0CC`; 
      header.querySelector('.time-total').style.color = `#fff`; 
      header.querySelector('.time-total').innerHTML = `8h`;  
    } else if (percentage > 35 && percentage < 100) {
      header.querySelector('.bar').style.width = `${percentage}%`; 
      header.querySelector('.bar').style.background = `var(--gold)`; 
      header.querySelector('.time-total').style.color = `var(--text-gray)`; 
      header.querySelector('.time-total').innerHTML = `8h`;  
    } else {
      // You have overworked for the day
      header.querySelector('.bar').style.width = `100%`; 
      header.querySelector('.bar').style.background = `#DE5454`; 
      header.querySelector('.time-worked').innerHTML = `Over Worked!`;  
      header.querySelector('.time-total').innerHTML = `${totalDayTime.toFixed(1)}h`;  
      header.querySelector('.time-total').style.color = `#FFFFFF`; 
    }
  }

  const deleteBtn = React.createRef()

  function deleteTime(eventInfo) {

    var calendar = calendarRef.current.getApi();

    setIsOpen(true)

    setModalContent(
      <>
        <ModalHeading>
          <h2>Delete? Are you sure?</h2>
        </ModalHeading>

        <div className="modal-footer">
          <div className="btn-group">
            <div className="btn-left">
              <button className="btn btn-light-gray btn-left" onClick={() => closeModal()}>Cancel</button>
            </div>
            <div className="btn-right">
              <button type="submit" className="btn btn-gold btn-right" onClick={() => confirmDelete(eventInfo)} ref={deleteBtn}>Delete</button>
            </div>
          </div>
        </div>
      </>
    )

    // Close delete modal
    function closeModal() {
      setIsOpen(false)
    }

    // Delete event from calendar
    function confirmDelete(eInfo) {

      const selectedEvent = calendar.getEventById(eInfo.event.id);
      selectedEvent.remove();

      deleteBtn.current.click();

      setIsOpen(false)
    }
  }

  function commitTime(eventInfo) {

    setModalContent(
      <>
        <ModalHeading>
          <h2>Commit Time</h2>
        </ModalHeading>
        <AdditionalTime />
      </>
    )

    setIsOpen(!modalIsOpen)

  }

  function editTask(eventInfo) {

    console.log('Edit task: ', eventInfo);

    setModalContent(
      <>
        <ModalHeading>
          <h2>Task</h2>
        </ModalHeading>
        <EditTask eventInfo={eventInfo} />
      </>
    )

    setIsOpen(!modalIsOpen)

  }

  const [actionNav, setActionNav] = useState({
    open: false,
    id: null
  });
  
  const openNav = (id) => {
    setActionNav({
      open: !actionNav.open,
      id: id
    })
  }

  function renderEventContent(eventInfo) {
  
    let totalTime = eventInfo.event.extendedProps.time
    let timeWorked = eventInfo.event.extendedProps.time_worked
    // let remaining = totalTime - timeWorked
    let percentage = timeWorked / totalTime * 100

    // Change event day header
    setDayHeader(eventInfo);
  
    return (
      <>
        <ActionNav className={actionNav.id === eventInfo.event._instance.defId && actionNav.open === true ? 'active' : ''}>
          <ActionItem onClick={() => commitTime(eventInfo)}>
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
            <div className="event-action" onClick={() => openNav(eventInfo.event._instance.defId)}>
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
          { modalContent }
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
              value={member_id}
              style={{ width: '100%', background: 'var(--white)' }}
              onChange={changeMember}
            >
              <MenuItem value="" disabled>
                <em>Select member</em>
              </MenuItem>
              {
                teamMembers?.map(member => (
                  <MenuItem value={member.id} key={member.id}>{ member.name }</MenuItem>
                ))
              }
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
        events={events}
        eventDragStop={function( info ) {
          let parent = info.el.parentNode;
          

          parent.classList.add('not-dragged');
        }}
        eventChange={function (changeInfo) {
          renderHeaderContent(changeInfo);
        }}
        eventStartEditable={true}
        eventDidMount={info => mountEvent(info)}
      />
    </div>
  )
}

export default Calendar

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
