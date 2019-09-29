import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classes from './letter.module.scss';


const Letter = ({ text, index }) => {
  return (
    <Draggable draggableId={text.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.wrapper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {text.letter}
        </div>
      )}
    </Draggable>
  );
};

export default Letter;
