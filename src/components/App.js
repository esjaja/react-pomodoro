import React from 'react';
import CustomHeading from './Layout/CustomHeading.jsx';
import { Container, Row, Col, Card, Navbar, Nav, Button, ListGroup } from 'react-bootstrap';
import Timer from './Timer/Timer.jsx';
import {Sidebar} from './Layout/Sidebar.jsx';
import {ToggleTodo} from './Layout/ToggleTodo.jsx';
import SessionController from './SessionController.jsx';
import Todo from './Todo.jsx';
var App = () => {

	var [isDone, setDone] = React.useState(true);

	function toggleDone() {
		setDone(!isDone);
	}

	let containerStyle = {
		// paddingLeft: 0,
		// paddingRight: 0
	}
	let show = true
	return (
		<>
			<Container fluid={true} style={containerStyle} >
       
				<Navbar fixed="top" bg="dark" variant="dark">
					<Navbar.Brand>HELLO</Navbar.Brand>
				</Navbar>
				<Row style={{height: '100vh'}}>     
					{show && <Col xs={3} height={'100vh'}>
						<Sidebar width={300} height={'100vh'}>
							<ListGroup>
								<ListGroup.Item>HE</ListGroup.Item>
								<ListGroup.Item>HE</ListGroup.Item>
								<ListGroup.Item>HE</ListGroup.Item>
								<ListGroup.Item>HE</ListGroup.Item>
								<ListGroup.Item>HE</ListGroup.Item>
							</ListGroup>
						</Sidebar>
					</Col>
					}
					<Col xs={6}>
						<SessionController wantToDo="Watch netflix"></SessionController>
					</Col>
					<Col>
						<CustomHeading level="3" text="123">
							HELLO
						</CustomHeading>
						<Card>
                            <Card.Body>123</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default App;
