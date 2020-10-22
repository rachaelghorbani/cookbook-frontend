import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
	render() {
		return (
			<div className="navbar p-0 d-flex ">
				<Navbar className="w-100 m-0" bg="light" expand="lg">
					<Navbar.Brand >Welcome to Cookbooks {this.props.user.username}!</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto align-items-center">
							<NavDropdown title="Cookbooks" id="basic-nav-dropdown">
								<NavDropdown.Item>
									<Link className="mx-2" to="/cookbooks">
										All Cookbooks
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>
									<Link className="mx-2" to={`/cookbooks/${this.props.user.id}`}>
										My Cookbooks
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>
									<Link className="mx-2" to="/cookbooks/new">
										New Cookbook
									</Link>
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Recipes" id="basic-nav-dropdown">
                                <NavDropdown.Item>
								<Link className="mx-2" to="/cookbooks/recipes">
									All Recipes
								</Link>
                                </NavDropdown.Item>
								<NavDropdown.Divider />
                                <NavDropdown.Item>
								<Link className="mx-2" to="/cookbooks/recipes/new">
									New Recipe
								</Link>
                                </NavDropdown.Item>
							</NavDropdown>
							<Link className="mx-2" to="/" onClick={this.props.logout}>
								Logout
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
