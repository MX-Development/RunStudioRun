import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

import moment from 'moment'

import axios from 'axios';

import './ToDos.css'

import CardPlayButton from '../assets/icons/CardPlayButton.svg'
import CardStopButton from '../assets/icons/CardStopButton.svg'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'

import Clock from '../assets/icons/Clock.svg'

import Modal from 'react-modal';
Modal.setAppElement('#root');

function KanbanBoard() {

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

  const activeSlideRef = useRef(null);

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

          const tasks = res.data
          tasks.map(task => {
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

  const handleDateClick = () => {
    console.log('test')
  }

  const changeMember = event => {
    const memberID = event.target.value
    history.push(`/to-do/${memberID}`)
  }

  const changeEvent = () => {
    console.log("Change event");
    let newEvents = [];
    events.forEach((event, index) => {
      if (index === 2) {
        event.start = "2021-08-29T12:15:23+02:00";
      }
      newEvents.push(event);
    })
    console.log(newEvents);
    setEvents([]);
    setEvents(newEvents);
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
          <h2>Additional Time</h2>
          
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
              style={{ width: '100%', background: '#fff' }}
              onChange={changeMember}
            >
              <MenuItem value="">
                <em>Select member</em>
              </MenuItem>
              <MenuItem value={'Taso Katsionis'} key={1}>Taso Katsionis</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <AdditionalTime onClick={() => setIsOpen(true)}>
          <img src={Clock} alt="clock icon" />
        </AdditionalTime>
        {/* <h1 onClick={() => changeEvent()}>Halo</h1> */}
      </MemberSelect>

      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridWeek"
        droppable={true}
        allDaySlot={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        eventOrder={false}
        weekends={false}
        eventClick={handleDateClick}
        eventContent={renderEventContent}
        eventDragStart={function( info ) {
          console.log(info)
        }}
        eventDragStop={function( info ) {
          console.log(info)
        }}
        dayHeaderFormat={{
          weekday: 'long'
        }}
        dayHeaderContent={renderHeaderContent}
        dayCellContent={renderDayContent}
        events={events}
        eventDidMount={
          function(info) {
            console.log('Event did mount')
          }
        }
      />
    </div>
  )
}

export default KanbanBoard

// const eventDragging = (info) => {
//   info.el.querySelector('.event-container').classList.add('dragged')
//   info.el.querySelector('.event-container').style.transform = 'rotate(45deg)'
// }

// const eventStopDragging = (info) => {
//   info.el.querySelector('.event-container').classList.remove('dragged')
//   info.el.querySelector('.event-container').style.background = '#fff'
// }

function renderEventContent(eventInfo) {

  let totalTime = eventInfo.event.extendedProps.time
  let timeWorked = eventInfo.event.extendedProps.time_worked
  let remaining = totalTime - timeWorked
  let percentage = timeWorked / totalTime * 100

  return (
    <div className="event-container" style={{ height: `${totalTime / 25}px` }}>
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
`

const AdditionalTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50px;
  width: 30px;
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
