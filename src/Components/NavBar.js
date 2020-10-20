import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class NavBar extends React.Component {
    
	render() {
		return (
			<div className="navbar p-0 d-flex ">
				<Navbar className="w-100 m-0" bg="light" expand="lg">
					<Navbar.Brand href="#home">Cookbooks!</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
					<Navbar.Collapse id="basic-navbar-nav" >
                    
           

						<Nav className="ml-auto align-items-center">
                            {this.props.user.username}
							<Link className="mx-2" to="/cookbooks">All Cookbooks</Link>
                            <Link className="mx-2" to={`/cookbooks/${this.props.user.id}`}>My Cookbooks</Link>
                            <Link className="mx-2" to="/cookbooks/new">New Cookbook</Link>
                            <Link className="mx-2" to="/cookbooks/recipes">All Recipes</Link>
                            <Link className="mx-2" to="/recipes/new">New Recipe</Link>
                            <Link className="mx-2" to="/" onClick={this.props.logout}>Logout</Link>
							
						</Nav>

						
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
