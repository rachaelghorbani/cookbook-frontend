import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Container} from 'react-bootstrap'
import styled from 'styled-components'
import Food from '../assets/food.jpg'

const Styles = styled.div`
.jumbo {
    background-image: url(${Food}) no-repeat fixed-bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
}
`
class Header extends React.Component {



    
	render() {
		return (
            <Styles>
            <Jumbotron fluid className="jumbo">
                <div className="overlay"></div>
                <Container>
                    <h1>Welcome</h1>
                </Container>

            </Jumbotron>
            </Styles>
			// <div className="header">
            //     <h1>HEADER GOES HERE!</h1>
			// </div>
		);
	}
}

export default Header;
