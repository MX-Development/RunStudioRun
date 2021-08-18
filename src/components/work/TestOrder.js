import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import axios from 'axios';

// https://codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer

import produce from 'immer'

import './ProjectEstimates.css'
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
  const [estimateStructure, setEstimateStructure] = useState()
  useEffect(() => {
    axios.get(`https://kendrix.kendrix.website/json/estimates.json`)
      .then(res => {
        res.data.map(item => {
          if (item.id == estimateID) {
            console.log(item.id)
            console.log(item)
            setEstimateStructure(item.structure)
          }
        })
        }
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
        estimateStructure ? (
        <>
          <EstimateList type={'overview'} data={estimateStructure.overview} key={123312} />
          {
            estimateStructure.stages.map(item => (
              <>
                <EstimateList type={'title'} data={item} key={item.id} />

                {
                  item.tasks.map(task => (
                    <>
                      <EstimateList type={'item'} data={task} key={task.id} />

                      {
                        task.subtasks.map(subtask => (
                          <EstimateList type={'subitem'} data={subtask} key={subtask.id} />
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
      }
          
    </div>
  )
}

export default TestOrder
