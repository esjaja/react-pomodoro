import * as timer from './utils';
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        let _min = props.min ? parseInt(props.min) : 0;
        let _sec = props.sec ? parseInt(props.sec) : 0;
        if(_min === 0 && _sec === 0) _sec = 1;
        let counter = timer.getSeconds(_min, _sec);
        this.state = {
            isActive: false,
            min: _min,
            sec: _sec,
            counter: counter
        }
    }

    componentWillUnmount() {
        this.onPause();
    }

    onStart() {
        this.setState({isActive: true});
        this.timerID = setInterval(() => {
            this.countdown();
        }, 1000)
    }

    onPause() {
        this.setState({isActive: false});
        clearInterval(this.timerID);
    }

    onReset() {
        this.onPause();
        this.setState({
            counter: timer.getSeconds(this.state.min, this.state.sec)
        })
    }

    countdown() {
        let counter = this.state.counter - 1;
        counter = counter < 0 ? 0 : counter;
        
        if(counter === 0) {
            this.onPause();
            if(typeof this.props.timerCopmlete === 'function') this.props.timerCopmlete();
        }
        
        this.setState({
            counter
        })
    }

    handleChange(event) {
        let target = event.target.name;
        let result = parseInt(event.target.value);

        result = isFinite(result) ? result : 0;

        if(target === 'min') {
            result = (result > 99) ? 99 : result;
            result = (result < 0) ? 0 : result;
        }
        else if(target === 'sec') {
            result = (result > 59) ? 59 : result;
            result = (result < 0) ? 0 : result;
        }

        let counter = (event.target.name === 'min') ? timer.getSeconds(result, this.state.sec) : timer.getSeconds(this.state.min, result);
        if(counter === 0) {
            counter = 1;
            result = 1;
        }

        this.setState({
            [event.target.name]: result,
            counter
        })
    }
    
    render() {
        let [min, sec] = timer.getClock(this.state.counter);
        let style = {width: '4rem'};
        let inputStyle = {
			whiteSpace: 'nowrap',
			width: (min.length+1) * 8 + 'px',
			background: 'transparent',
			border: 'none',
            color: 'inherit'
        };
        let isActive = this.state.isActive;
        return(
            <ButtonGroup>
                <Button variant="outline-success">
                    
            <input value={min}  
                style={inputStyle} 
                name='min'
                disabled={isActive}
                onChange={(e) => this.handleChange(e)}></input>:
             <input value={sec}  
                style={inputStyle} 
                name='sec'
                disabled={isActive}
                onChange={(e) => this.handleChange(e)}></input>
                </Button>
                {this.state.isActive ? 
                    <Button style={style} variant="warning" onClick={() => this.onPause()}>Pause</Button> :
                    <Button style={style} variant="success" onClick={() => this.onStart()}>Start</Button>
                }
                <Button variant="info" onClick={() => this.onReset()}>Reset</Button>
                { typeof this.props.handleRemove === 'function' &&
                    <Button variant="outline-danger" onClick = {() => this.props.handleRemove()}>x</Button>
                }
            </ButtonGroup>
        );
    }
}

export default Timer;