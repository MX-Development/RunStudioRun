import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import styled from 'styled-components'

// https://codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer

import produce from 'immer'

import './ProjectEstimates.css'

import PhaseTitle from './components/PhaseTitle';
import Task from './components/Task';
import Expense from './components/Expense';
import AddNav from '../AddNav'
import PlusIcon from '../../../assets/icons/PlusIcon.svg'

import DragIcon from '../../../assets/icons/DragIcon.svg'
import ActionButton from './components/ActionButton'
import ExtraTime from './components/ExtraTime'

const dragReducer = produce((draft, action) => {
  console.log(action);
  console.log(draft);
  switch (action.type) {
    case "MOVE": 
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      let [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
      break;
    case "MOVE_UP": 
      break;
    case "ADD":
      draft['items'].splice(action.items.length, 0, action.items[action.items.length - 1]);
      break;
    case 'UPDATE':
      draft['items'] = action.items;
      break
    default: return
    }
});

function ProjectEstimates({ estimateID, itemType }) { 

  const [idToAdd, setIdToAdd] = useState(2);
  
  const optionsToAdd = (options) => {

    for (const [key, value] of Object.entries(options)) {

      if (value !== true) return

      if (key === 'overview') {

        const newID = idToAdd * idToAdd + 1;
        
        const item = {
          "id": newID,
          "type": "overview",
          "title": "Overview",
          "description": "Overview 1 description",
          "tasks": [1, 2]
        }
    
        setData(data => [...data, item]);
    
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      if (key === 'phase') {

        const newID = idToAdd * idToAdd + 2;
        
        const item = {
          "id": newID,
          "type": "phase",
          "title": "Phase 1 title",
          "description": "Phase 1 description",
          "tasks": [1, 2]
        }
    
        setData(data => [...data, item]);
    
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      if (key === 'task') {

        const newID = idToAdd * idToAdd + 3;
        
        const item = {
          "id": newID,
          "type": "task",
          "title": "Task title",
          "description": "Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.",
          "time": 0,
          "time_worked": 0,
          "rate": 0,
          "total": 0,
          "startDate": "2021-08-18T09:15",
          "endDate": "2021-08-21T17:00",
          "team": []
        }
    
        setData(data => [...data, item]);
    
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      if (key === 'subtask') {

        const newID = idToAdd * idToAdd + 4;
        
        const item = {
          "id": newID,
          "type": "subtask",
          "title": "Subtask title 1",
          "description": "Subtask description 1",
          "time": 75,
          "rate": 150,
          "total": 200,
          "startDate": "2021-08-21T14:15",
          "endDate": "2021-08-21T17:00",
          "team": [1, 4]
        }

        setData(data => [...data, item]);
  
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      if (key === 'expense') {

        const newID = idToAdd * idToAdd + 5;
        
        const item = {
          "id": newID,
          "type": "expense",
          "title": "Expense title 1",
          "description": "Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.",
          "time": 6500,
          "time_worked": 1500,
          "rate": 150,
          "total": 200,
          "startDate": "2021-08-18T09:15",
          "endDate": "2021-08-21T17:00",
          "team": [1, 4],
          "subitems": []
        }
        

        setData(data => [...data, item]);
  
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      if (key === 'additional_time') {

        const newID = idToAdd * idToAdd + 6;
        
        const item = {
          "id": newID,
          "type": "additional_time",
          "title": "Additional time",
          "description": "This is for the time that the client asked for another revision even though",
          "time": 0,
          "time_worked": 0,
          "rate": 0,
          "total": 0,
          "startDate": "2022-08-18T09:15",
          "endDate": "2022-08-21T17:00",
          "team": []
        }
    
        setData(data => [...data, item]);
    
        dispatch({
          type: "ADD",
          items: [...data, item]
        });

      }

      setIdToAdd(idToAdd + 1);
    }

  }

  const [addNav, setAddNav] = useState(false)

  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log('hallo');

    try {
      await axios.get(`/json/estimates/full_estimates.json`)
        .then(res => {
          console.log(res);
          setData(res.data[0].item)
          dispatch({ type: 'UPDATE', items: res.data[0].item })
        })

        console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }

  }

  useEffect(() => {
    fetchData()
  }, []);

  const [state, dispatch] = useReducer(dragReducer, {
    items: data
  });

  // const addData = () => {

  //   const newID = data[data.length - 1].id + 1;
    
  //   const newTask = {
  //     "id": newID,
  //     "type": "task",
  //     "title": "Task title",
  //     "description": "Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor.",
  //     "time": 0,
  //     "time_worked": 0,
  //     "rate": 0,
  //     "total": 0,
  //     "startDate": "2021-08-18T09:15",
  //     "endDate": "2021-08-21T17:00",
  //     "team": []
  //   }

  //   setData(data => [...data, newTask]);

  //   dispatch({
  //     type: "ADD",
  //     items: [...data, newTask]
  //   });
  //   setAmountAdded(amountAdded + 1);
  // }

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);
  
  const fireAction = (data, snapshot) => {
    console.log(data);
    console.log(snapshot);
    switch(data) {
      case 'move_up':
        console.log('Move item up');
        dispatch({
          type: "MOVE_UP"
        });
        break;
      case 'move_down':
        console.log('Move item down');
        break;
      default: return
    }
  }

  return (
    <>
      { 
        itemType === 'estimate' ?
        <DividerWithIcon>
          <img src={PlusIcon} alt="" onClick={() => setAddNav(!addNav)} />
          <AddNav show={addNav} addOptions={optionsToAdd} />
        </DividerWithIcon>
        : itemType === 'additional_time' ?
        <DividerWithIcon>
          <h6>Extra time</h6>
        </DividerWithIcon>
        : null
      }

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>

        <DragDropContext onDragEnd={onDragEnd}>
          {
            itemType === 'estimate' ?
            <Droppable droppableId="items" type="PERSON">
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={snapshot.isDraggingOver ? 'dragging-over' : null}
                  >
                    {state.items?.map((item, index) => {
                      if (item.type === 'additional_time') return;
                      return (
                        <Draggable key={item.id} draggableId={(item.id).toString()} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                className={snapshot.isDragging ? 'dragging' : null}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div 
                                  className="dragger-content"
                                >
                                  <div {...provided.dragHandleProps}>
                                    <DragButton className={item.type === 'subtask' ? 'padded' : ''}>
                                      <img src={DragIcon} alt="drag icon" />
                                    </DragButton>
                                  </div>
                                  {(() => {
                                    switch(item.type) {
                                      case 'overview':
                                        return <PhaseTitle data={item} />
                                      case 'phase':
                                        return <PhaseTitle data={item} />
                                      case 'task':
                                        return <Task data={item} />
                                      case 'subtask':
                                        return <Task data={item} size={'small'} />
                                      case 'expense':
                                        return <Expense data={item} />
                                      default: return
                                    }
                                  })()}
                                  <ActionButton setAction={(data, snapshot) => fireAction(data, snapshot)} snapshot={provided} />
                                </div>
                              </div>
                            ); 
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            : itemType === 'additional_time' ?
            <Droppable droppableId="extra_time" type="PERSON">
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={snapshot.isDraggingOver ? 'dragging-over' : null}
                  >
                    {state.items?.map((item, index) => {
                      if (item.type !== 'additional_time') return;
                      return (
                        <Draggable key={item.id} draggableId={(item.id).toString()} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                className={snapshot.isDragging ? 'dragging' : null}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div 
                                  className="dragger-content"
                                >
                                  <div {...provided.dragHandleProps}>
                                    <DragButton className={item.type === 'subtask' ? 'padded' : ''}>
                                      <img src={DragIcon} alt="drag icon" />
                                    </DragButton>
                                  </div>
                                  {(() => {
                                    switch(item.type) {
                                      case 'additional_time':
                                        return <ExtraTime data={item} />
                                      default: return
                                    }
                                  })()}
                                  <ActionButton setAction={(data, snapshot) => fireAction(data, snapshot)} snapshot={provided} />
                                </div>
                              </div>
                            ); 
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          : null }

        </DragDropContext>
      </div>
    </>
  )
}

export default ProjectEstimates

const DividerWithIcon = styled.div`
  width: 100%;
  height: 1px;
  background: #DDDBD7;
  position: relative;
  margin: 30px 0;
  
  :hover {
    cursor: pointer;
  }

  > img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 32px;
  }

  > h6 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    background: #F4F2F0;
    padding: 10px;
  }
`

const DragButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;

  > img {
    max-width: 50px;
  }

  &.padded {
    margin-left: 50px;
  }
`
