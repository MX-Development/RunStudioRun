import React, { useCallback, useReducer } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
    break;
    case "ADD":
      // Copy over root state
      // draft.push({ id: "id3", done: false, body: "Buy bananas" });
    break;
    default: return
    }
});

function ProjectEstimates() { 

  const data = [
    {
      id: "5f832341cc119a50d1adb972",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Goff",
        last: "Robbins",
      },
    },
    {
      id: "5f832341cc119a50d1adb973",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Mike",
        last: "Hendriks",
      },
    },
    {
      id: "5f832341cc119a50d1adb2333",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Piet",
        last: "Gofert",
      },
    }
  ]

  const data2 = [
    {
      id: "5f832341cc119a50d1adb97223",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Goff",
        last: "Robbins",
      },
    },
    {
      id: "5f832341cc119a50d1adb973zczcx",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Mike",
        last: "Hendriks",
      },
    },
    {
      id: "5f832341cc119a50d1addfsdb2333",
      picture: "http://placehold.it/32x32",
      name: {
        first: "Piet",
        last: "Gofert",
      },
    }
  ]

  const [state, dispatch] = useReducer(dragReducer, {
    items: data,
    items2: data2
  });

  // const addData = () => {
  //   console.log('adding...')
  //   dispatch({
  //     type: "ADD",
  //     items: [...data, {
  //       id: "5f832341cc119a50d1adb9727",
  //       picture: "http://placehold.it/32x3232",
  //       name: {
  //         first: "Goff53",
  //         last: "Robbin5325s",
  //       },                                        
  //     }]
  //   });
  // }

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
      {/* <button type="button" onClick={() => addData()}>Add item</button> */}

      {/* <EstimateTitle /> */}
      
      <EstimateList type={'title'} title={'Stage/phase title'} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? 'dragging-over' : null}
              >
                {state.items?.map((person, index) => {
                  return (
                    <Draggable key={person.id} draggableId={person.id} index={index}>
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
                              <EstimateList type={'item'} />
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


      
        <EstimateList type={'title'} title={'Stage/phase title'} />

        <Droppable droppableId="items2" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? 'dragging-over' : null}
              >
                {state.items2?.map((person, index) => {
                  console.log('test')
                  return (
                    <Draggable key={person.id} draggableId={person.id} index={index}>
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
                              <EstimateList type={'expense'} />
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
  )
}

export default ProjectEstimates
