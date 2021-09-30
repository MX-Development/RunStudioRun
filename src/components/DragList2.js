import React, { useCallback, useReducer } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// https://codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer

import produce from 'immer'

// import './DragList.css'

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
    break;
    default: return;
  }
});

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

function DragList2() {

  const [state, dispatch] = useReducer(dragReducer, {
    items: data,
  });

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
      display: 'flex'
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
                              <img
                                src={person.picture}
                                className="dragger-icon"
                                alt="person picture"
                              />
                              <span>
                                {person.name.first} {person.name.last}
                              </span>
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
                              <img
                                src={person.picture}
                                className="dragger-icon"
                                alt="person picture"
                              />
                              <span>
                                {person.name.first} {person.name.last}
                              </span>
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

export default DragList2
