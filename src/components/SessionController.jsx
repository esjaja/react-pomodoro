import React from 'react';
import Timer from './Timer/Timer.jsx';
import Todo from './Todo.jsx';
import {Badge, Form, Container, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

export default class SessionController extends React.Component {
	constructor(props) {
		super(props);
		this.todoId = 0;
		this.state = {
			wantToDo: this.props.wantToDo || 'enjoy the rest!',
			needToDo: this.props.needToDo || 'things I need to do',
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
				isInFocusMode: true
			});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleToggleTodo(id, remove) {
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
		let text = (
			<HeadingBadge
				level="1"
				isInFocusMode={this.state.isInFocusMode}
				needToDo={this.state.needToDo}
				wantToDo={this.state.wantToDo}
				handleChange={(e) => this.handleChange(e)}
			></HeadingBadge>
		);

		let breakTime =
			this.state.currentSession % 4 === 0 ? this.state.longBreakTime : this.state.breakTime;
		breakTime += this.state.additionalBreakTime;
		let timer = this.state.isInFocusMode ? (
			<Timer
				key={this.state.focusTime}
				min={this.state.focusTime}
				timerCopmlete={() => this.onTimerSuccess()}
			/>
		) : (
			<Timer
				handleSkip={(add) => {
					this.handleSkip(add);
				}}
				key={breakTime}
				min={breakTime}
				timerCopmlete={() => this.onTimerSuccess()}
			/>
		);

		return (
			<Container>
				{text}
				{timer}
				<Col style={{ marginTop: '10px', marginBottom: '10px' }}>
					<h4>
						<Badge className="session" size="lg" variant="secondary">
							Current Session <Badge variant="light">{this.state.currentSession}</Badge>
						</Badge>
					</h4>
				</Col>
				<Form.Control
					className="add-task-input"
					type="text"
					name="todoText"
					autoComplete="off"
					value={this.state.todoText}
					placeholder="+ Add new task ..."
					onChange={(e) => this.handleChange(e)}
					onKeyDown={(e) => this.handleKeyDown(e)}
				></Form.Control>
				<Todo
					todo={this.state.todo}
					headerText="Todo"
					toggleTodo={(id, remove) => this.handleToggleTodo(id, remove)}
				></Todo>
			</Container>
		);
	}
}

var HeadingBadge = ({level, isInFocusMode, children, needToDo, wantToDo, handleChange}) => {
    let description = isInFocusMode ? 'Focus on ' : 'Good job! Take a rest or ';
    let badgeText = isInFocusMode ? needToDo : wantToDo;
    let H = 'h' + level;
    let inputStyle = {
		whiteSpace: 'nowrap',
		background: 'transparent',
		border: 'none',
		color: 'inherit',
		fontSize: 'inherit',
		fontFamily: 'inherit',
		fontWeight: 'inherit',
		textAlign: 'center'
	};
	let inputName = isInFocusMode ? 'needToDo' : 'wantToDo';
	
	return (
        <H className='task-container'>
            <span className='task-text'>{description}</span> 
            <Badge className='task-badge' variant="secondary"> 
			<input
				style={inputStyle}
				value={badgeText}
				name={inputName}
				onChange={(e) => handleChange(e)}
			>
			</input> 	
			</Badge>
            {children}
        </H>
    )
}