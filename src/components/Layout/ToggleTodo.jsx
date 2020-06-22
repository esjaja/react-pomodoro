import React from 'react';
import {Button} from 'react-bootstrap';
export const ToggleTodo = ({isDone, text, onClick, children}) => {
    var TAG = isDone ? 's' : 'span';
    var style = {
        // border: 'solid 1px black', 
        margin: '0px',
        padding: '5px',
    }
    return (
        <li style={style}>
            <TAG onClick={() => onClick()}>{text || children}</TAG>
            <span 
            style={{float: 'right', textAlign: 'center'}} 
            className='delete-button' 
            onClick={() => onClick('remove')}>x</span>
        </li>
    );
}