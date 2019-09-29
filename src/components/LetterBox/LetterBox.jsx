import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Letter from '../Letter/Letter';
import classes from './letterBox.module.scss';

const LetterBox = ({ letters, id, label }) => {
  return (
    <div className={classes.container}>
      <p>{label}</p>
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
    </div>
  );
};

export default LetterBox;
