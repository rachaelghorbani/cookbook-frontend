import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap'
import '../App.css'

class Header extends React.Component {
    
	render() {
		return (
            <Jumbotron fluid className="jumbo mb-0">
			{/* <div className="overlay">
                <Container>
                <h1>HEADER GOES HERE!</h1>
                </Container>
			</div> */}
            </Jumbotron>
		);
	}
}

export default Header;
