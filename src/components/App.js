import React from 'react';
import CustomHeading from './Layout/CustomHeading.jsx';
import { Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import Timer from './Timer/Timer.jsx';
var App = () => {
	return (
		<>
			<Container fluid={true} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>HELLO</Navbar.Brand>
            </Navbar>
				<Row noGutters={true}>
					<Col>
                        <Timer min='5' sec='3' handleRemove></Timer>
                    </Col>
					<Col></Col>
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
