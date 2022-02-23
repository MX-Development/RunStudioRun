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

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": 
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
      break;
    case "ADD":
      draft['items'].splice(action.items.length, 0, action.items[action.items.length - 1]);
      break;
    case 'UPDATE':
      console.log(action)
      console.log(action.items)
      draft['items'] = action.items;
      break
    default: return
    }
});

function ProjectEstimates({ estimateID }) { 

  const [idToAdd, setIdToAdd] = useState(2);
  
  const optionsToAdd = (options) => {

    for (const [key, value] of Object.entries(options)) {

      console.log(idToAdd);

      if (value === true) {

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

      }

      setIdToAdd(idToAdd + 1);
    }

  }

  const [addNav, setAddNav] = useState(false)

  const [data, setData] = useState([]);

  const fetchData = async () => {

    try {
      await axios.get(`https://kendrix.kendrix.website/json/estimates/full_estimates.json`)
        .then(res => {
          // setData(res.data[0].item)
          // dispatch({ type: 'UPDATE', items: res.data[0].item })
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

  return (
    <>
      <DividerWithIcon>
        <img src={PlusIcon} alt="" onClick={() => setAddNav(!addNav)} />
        <AddNav show={addNav ? true : false} addOptions={optionsToAdd} />
      </DividerWithIcon>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="items" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={snapshot.isDraggingOver ? 'dragging-over' : null}
                >
                  {state.items?.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={(item.id).toString()} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={snapshot.isDragging ? 'dragging' : null}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div 
                                className="dragger-content"
                              >
                                {
                                  item.type === 'overview' ?
                                    <PhaseTitle data={item} /> :
                                  item.type === 'phase' ?
                                    <PhaseTitle data={item} /> :
                                  item.type === 'task' ?
                                    <Task data={item} /> :
                                  item.type === 'subtask' ?
                                    <Task data={item} size={'small'} /> :
                                  item.type === 'expense' ?
                                    <Expense data={item} />
                                  : null
                                }
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
`
