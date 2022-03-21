import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import Board from 'react-trello'

import '../ToDos.css'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'

import Clock from '../../assets/icons/Clock.svg'

import Modal from 'react-modal';
import MyCard from './components/MyCard'
import MyHeader from './components/MyHeader'
Modal.setAppElement('#root');

function Trello() {

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

  const handleDateClick = () => {
    //To add a card
    eventBus.publish({type: 'ADD_CARD', laneId: 'monday', card: 
    {
      id: '11', 
      title: 'Task234', 
      client: 'Client',
      prefix: 'Project prefix',
      time: 1000,
      time_worked: 700,
      description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
      label: '30 mins',
    }})
  }

  const changeMember = event => {
    const memberID = event.target.value
    history.push(`/to-do/${memberID}`)
  }

  const [eventBus, setEventBus] = useState(undefined);

  const data = {
    lanes: [
      {
        id: 'monday',
        title: 'Monday',
        label: '2/2',
        cards: [
          {
            id: '1', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 1000,
            hexBlock: '8EC862',
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '14', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 500,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '2', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 750,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          }
        ]
      },
      {
        id: 'tuesday',
        title: 'Tuesday',
        label: '2/2',
        cards: [
          {
            id: '3', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 250,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '4', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 800,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          }
        ]
      },
      {
        id: 'wednesday',
        title: 'Wednesday',
        label: '2/2',
        cards: [
          {
            id: '5', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 725,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '6', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 750,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          }
        ]
      },
      {
        id: 'thursday',
        title: 'Thursday',
        label: '2/2',
        cards: [
          {
            id: '7', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 950,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '8', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 150,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          }
        ]
      },
      {
        id: 'friday',
        title: 'Friday',
        label: '2/2',
        cards: [
          {
            id: '9', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 600,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          },
          {
            id: '10', 
            title: 'Task', 
            client: 'Client',
            prefix: 'Project prefix',
            time: 975,
            time_worked: 700,
            description: 'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.', 
            label: '30 mins',
          }
        ]
      },
    ]
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
        <AdditionalTime onClick={() => setIsOpen(true)}>
          <img src={Clock} alt="clock icon" />
        </AdditionalTime>
        {/* <h1 onClick={() => changeEvent()}>Halo</h1> */}
      </MemberSelect>

      <button type="button" onClick={handleDateClick}>Test</button>

      <Board 
        data={data} 
        components={{
          Card: MyCard,
          LaneHeader: MyHeader
        }}
        style={{
          background: 'transparent'
        }}
        laneStyle={{
          background: 'transparent'
        }}
        cardStyle={{
          borderRadius: 0, 
          marginBottom: 15,
          borderLeft: '6px solid gold'
        }}
        eventBusHandle={setEventBus}
      />
    </div>
  )
}

export default Trello

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
  background: var(--white);
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
