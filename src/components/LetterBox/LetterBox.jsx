import React from 'react';
import classes from './letterBox.module.scss';
import Letter from '../Letter/Letter';
import { Droppable } from 'react-beautiful-dnd';

const LetterBox = ({ letters, id }) => {
  return (
    <Droppable droppableId={id} direction='horizontal'>
      {(provided, snapshot) => (
        <div
          className={classes.wrapper}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {letters.map((el, index) => (
            <Letter text={el} index={index} key={el.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default LetterBox;
