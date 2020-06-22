import React from 'react';
import Timer from './Timer/Timer.jsx';
import Todo from './Todo.jsx';
import {Badge} from 'react-bootstrap';
import _ from 'lodash';

export default class SessionController extends React.Component {
	constructor(props) {
		super(props);
		this.todoId = 0;
		this.state = {
			wantToDo: this.props.wantToDo || 'enjoy the rest!',
			needToDo: this.props.needToDo || 'focus on current task',
			focusTime: this.props.focusTime || 25,
            breakTime: this.props.breakTime || 5,
            additionalBreakTime: 0,
            longBreakTime: this.props.longBreakTime || 20,
			longBreakSessions: this.props.longBreakSessions || 4,
			todo: [],
			currentSession: 0,
			isInFocusMode: true,
			todoText: '',
        };
	}

	onTimerSuccess() {
		if (this.state.isInFocusMode) {
			this.setState({
				currentSession: this.state.currentSession + 1,
				isInFocusMode: false,
			});
		} else {
			this.setState({
				isInFocusMode: true,
			});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleToggleTodo(id, remove) {
		console.log(remove)
		console.log(id)
		var todos = this.state.todo.slice();
		if(remove === 'remove') {
			todos = todos.filter((item) => item.id !== id);
		}
		else {
			todos = todos.map((item) => {
				if (item.id === id) {
					item.isDone = !item.isDone;
				}
				return item;
			});
		}
		this.setState({
			todo: todos,
		});
	}

	handleKeyDown(event) {
		let todos = this.state.todo.slice();
		if (event.key === 'Enter') {
			if (this.state.todoText.length === 0) return;
			this.todoId += 1;
			todos.push({
				id: this.todoId,
				text: this.state.todoText,
				isDone: false,
			});

			this.setState({
				todo: todos,
				todoText: '',
			});
		}
    }
    
    handleSkip(addedTime) {
        let addedMin = Math.floor(addedTime / 60);
        this.setState({
            additionalBreakTime: addedMin
        })
    }

	render() {
		let text = <HeadingBadge 
        level="1" 
        isInFocusMode={this.state.isInFocusMode}
        needToDo={this.state.needToDo}
        wantToDo={this.state.wantToDo}
        ></HeadingBadge>


        let breakTime = ((this.state.currentSession % 4) === 0) ? this.state.longBreakTime : this.state.breakTime;
        breakTime += this.state.additionalBreakTime;
		let timer = this.state.isInFocusMode ? (
			<Timer key={this.state.focusTime} min={this.state.focusTime} timerCopmlete={() => this.onTimerSuccess()} />
		) : (
			<Timer handleSkip={(add) => {this.handleSkip(add)}} key={breakTime} min={breakTime} timerCopmlete={() => this.onTimerSuccess()} />
		);

		return (
			<>
            {text}
				
				{timer}
				<p>Current Session: {this.state.currentSession}</p>
                
                <p>Oops! Some new idea flew in my mind. Don't worry, just note it down here...</p>
				<input
					type="text"
					name="todoText"
					autoComplete="off"
					value={this.state.todoText}
                    placeholder='note down something'
					onChange={(e) => this.handleChange(e)}
					onKeyDown={(e) => this.handleKeyDown(e)}
				></input>
				<Todo 
                todo={this.state.todo} 
                headerText='Pop-up thoughts'
                toggleTodo={(id, remove) => this.handleToggleTodo(id, remove)}></Todo>
			</>
		);
	}
}

var HeadingBadge = ({level, isInFocusMode, children, needToDo, wantToDo}) => {
    let description = isInFocusMode ? 'Go on! This task is to ' : 'Good job! Take some rest or ';
    let badgeText = isInFocusMode ? needToDo : wantToDo;
    let H = 'h' + level;
    return (
        <H>
            {description} 
            <Badge variant="secondary"> {badgeText} </Badge>
            ...
            {children}
        </H>
    )
}