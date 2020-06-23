import React from 'react';
export const ToggleTodo = ({isDone, text, onClick, children}) => {
    var TAG = isDone ? 's' : 'span';

    return (
        <li className='todo-li'>
            <TAG onClick={() => onClick()}>{text || children}</TAG>
            <a 
            className='todo-delete-button'
            onClick={() => onClick('remove')}>x</a>
        </li>
    );
}