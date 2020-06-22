import React from 'react';
import { ToggleTodo } from './Layout/ToggleTodo.jsx';
import {Accordion, Button, Card} from 'react-bootstrap';
// import {todo} from './todo';
import _ from 'lodash';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleTodo(id, remove) {
        this.props.toggleTodo(id, remove);
    }

    render() {
        let todoList = <ol>
                {
                _.map(this.props.todo, (item) => {
                    return <ToggleTodo 
                        key={item.id} 
                        isDone={item.isDone} 
                        onClick={(remove) => this.toggleTodo(item.id, remove)}
                        >
                        {item.text}
                    </ToggleTodo>
                })
                }
                </ol>;
        let toRender = this.props.noHeader ? todoList : <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            {this.props.headerText}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>{todoList}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>;
        return (
			<>
				{toRender}
			</>
		);
    }

}