import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const TodoList = ({ task, deleteTodo, toggleComplete }) => {
  return (
    <div className='Todo'>
      <p className={`${task.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(task.id)}>
        {task.description}
      </p>
      <div className='divIcon'>
        <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} />
        <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default TodoList;
