import React from 'react';

export const ToggleTodo = ({isDone, text, onClick, children}) => {
    var TAG = isDone ? 's' : 'span';
    var style = {
        // border: 'solid 1px black', 
        margin: '0px',
        padding: '5px',
        boxSizing: 'border-box',
        display: 'block',
        fontSize: '20px'
    }
    return (
        <li>
            <TAG style={style} onClick={() => onClick()}>{text || children}</TAG>
        </li>
    );
}