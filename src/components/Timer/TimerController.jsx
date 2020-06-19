import React, {useState} from 'react';
import Timer from './Timer.jsx';

var TimerController = (props) => {
    [min, setMin] = useState(props.min);
    [sec, setSec] = useState(props.sec);
}