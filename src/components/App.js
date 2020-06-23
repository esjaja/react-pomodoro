import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SessionController from './SessionController.jsx';

var App = () => {

	return (
		<Container fluid>
			<Navbar className="page-header" fixed="top">
				<Navbar.Brand>Pomodoro</Navbar.Brand>
			</Navbar>
			<Row style={{ height: '100vh' }}>
				<Col></Col>
				<Col xl={4} lg={6} xs={8} md={6}>
					<SessionController></SessionController>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};

export default App;
