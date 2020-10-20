import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class NavBar extends React.Component {
    
	render() {
		return (
			<div className="navbar p-0">
				<Navbar className="w-100 m-0" bg="light" expand="lg">
					<Navbar.Brand href="#home">Cookbooks!</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
					<Navbar.Collapse id="basic-navbar-nav" >
                    
           

						<Nav className="mr-auto">
                            {this.props.user.username}
							<Nav.Link ><Link to="/cookbooks">All Cookbooks</Link></Nav.Link>
                            <Nav.Link ><Link to={`/cookbooks/${this.props.user.id}`}>My Cookbooks</Link></Nav.Link>
                            <Nav.Link><Link to="/cookbooks/new">New Cookbook</Link></Nav.Link>
                            <Nav.Link><Link to="/recipes/new">New Recipe</Link></Nav.Link>
                            <Nav.Link><Link to="/" onClick={this.props.logout}>Logout</Link></Nav.Link>
							
						</Nav>

						
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
