import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import axios from 'axios';

// https://codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer

import produce from 'immer'

import './projects/dragAndDrop/ProjectEstimates.css'
import EstimateList from './EstimateList';

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
    case "ADD":
      // Copy over root state
      // draft.push({ id: "id3", done: false, body: "Buy bananas" });
  }
});

function TestOrder({ estimateID }) { 

  const [data, setData] = useState([])
  const [estimateData, setEstimateData] = useState()
  const [phases, setPhases] = useState([])
  const [tasks, setTasks] = useState([])
  const [subtasks, setSubtasks] = useState([])
  
  useEffect(() => {
    setPhases([])
    setTasks([])
    setSubtasks([])
    axios.get(`/json/estimates.json`)
      .then(res => {
        res.data.map(item => {
          if (item.id === parseInt(estimateID)) {
            setEstimateData(item)
          }
        })
      }).then(
        axios.get(`/json/estimates/phases.json`)
          .then(res => {
            res.data.map(item => {
              if (item.jobId === parseInt(estimateID)) {
                setPhases(phases => [...phases, item])

                axios.get(`/json/estimates/items.json`)
                  .then(res => {
                    res.data.map(task => {
                      if (item.tasks.includes(task.id)) {
                        setTasks(tasks => [...tasks, task])

                        axios.get(`/json/estimates/subitems.json`)
                          .then(res => {
                            res.data.map(subtask => {
                              if (subtask.taskId === task.id) {
                                setSubtasks(subtasks => [...subtasks, subtask])
                              }
                            })
                          })
                      }
                    })
                  })
              }
            })
          })
      )
  }, []);

  const [state, dispatch] = useReducer(dragReducer, {
    items: data
  });

  const addData = () => {
    console.log('adding...')
    dispatch({
      type: "ADD",
      items: [...data, {
        id: "5f832341cc119a50d1adb9727",
        picture: "http://placehold.it/32x3232",
        name: {
          first: "Goff53",
          last: "Robbin5325s",
        },                                        
      }]
    });
  }

  const onDragEnd = useCallback((result) => {
    console.log(result)
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
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {
        estimateData ? (
          <>
            <EstimateList type={'overview'} data={estimateData.overview} key={estimateData.id} id={estimateID} />
            {phases.map(phase => (
              <>
                <EstimateList type={'title'} data={phase} key={phase.id} id={estimateID} />
                {tasks.map(task => {
                  if (phase.tasks.includes(task.id)) {
                    return (
                    <>
                      <EstimateList type={'item'} data={task} key={task.id} id={estimateID} team={task.team} />
                      {subtasks.map(subtask => {
                        if (subtask.taskId === task.id) {
                          return (
                            <EstimateList type={'subitem'} data={subtask} key={subtask.id} id={estimateID} team={subtask.team} />
                          )
                        }
                      })}
                    </>
                    )
                  }
                }
              )}
              </>
            ))}
          </>
        )
        : null
      }

      {/* {
        estimateData ? (
        <>
          <EstimateList type={'overview'} data={estimateData.overview} key={estimateData.id} id={estimateID} />
          {
            estimateData.stages.map(item => (
              <>
                <EstimateList type={'title'} data={item} key={item.id} id={estimateID} />

                {
                  item.tasks.map(task => (
                    <>
                      <EstimateList type={'item'} data={task} key={task.id} id={estimateID} />

                      {
                        task.subtasks.map(subtask => (
                          <EstimateList type={'subitem'} data={subtask} key={subtask.id} id={estimateID} />
                        ))
                      }
                    </>
                  ))
                }
              </>
            ))
          }
        </>
        )
        : null
      } */}
          
    </div>
  )
}

export default TestOrder
