import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import WelcomeContainer from './Containers/WelcomeContainer';
import CookBookContainer from './Containers/CookBookContainer';
import Home from './Components/Home';

const usersURL = 'http://localhost:3000/users/';
const loginURL = 'http://localhost:3000/login';

class App extends React.Component {
	state = {
		currentUser: {}
	};

	logoutUser = () => {
		this.setState({ currentUser: {} });
	};

	loginUser = ({ username, password }) => {
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Accepts": 'application/json'
			},
			body: JSON.stringify({ username: username, password: password})
		};
		fetch(loginURL, options).then((resp) => resp.json()).then((data) => {
			this.setState({
				currentUser: data.user
			});
		});
	};

	componentsToRender = () => {
		if (this.state.currentUser.username) {
			return (
				<div>
					<Header />
					<NavBar logout={this.logoutUser} user={this.state.currentUser} />
					
					<Switch>

						<Route path="/cookbooks" render={(windowProps) => <CookBookContainer user={this.state.currentUser} windowProps={windowProps}/>}/>
						<Route path="/" render={() => <Home user={this.state.currentUser} />} />

					</Switch>
				</div>
			);
		} else {
			return (
				<div>
					<Header />
					<WelcomeContainer login={this.loginUser} />
				</div>
			);
		}
	};

	render() {
		return <div>{this.componentsToRender()}</div>;
	}
}

export default App;
