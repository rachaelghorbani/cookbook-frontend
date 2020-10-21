import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import WelcomeContainer from './Containers/WelcomeContainer';
import CookBookContainer from './Containers/CookBookContainer';
import Home from './Components/Home';

const loginURL = 'http://localhost:3000/login'
class App extends React.Component {

	state = {
		currentUser: {}
	};

    componentDidMount = () => {
        
		if (window.sessionStorage.accessToken) {
			fetch('http://localhost:3000/', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${window.sessionStorage.accessToken}`
				  }
			})
			.then(resp => resp.json())
			.then(data => {
				this.setState({
                currentUser: data.user
            })
			})
		}
	}
	
	logoutUser = () => {
        window.sessionStorage.clear()
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
            window.sessionStorage.accessToken = data.jwt
            this.setState({
                currentUser: data.user
                // this.props.windowProps.history.push(redirectUrl);

            });
        });
	};
	


	componentsToRender = () => {

		if (window.sessionStorage.accessToken && this.state.currentUser.username) {
			return (
				<div>
					<Header />
					<NavBar logout={this.logoutUser} user={this.state.currentUser} />
					<Switch>

						<Route
							path="/cookbooks"
							render={(windowProps) => (
								<CookBookContainer
                                    user={this.state.currentUser}
									windowProps={windowProps}
									owned={this.state.currentUser.owned_cookbooks}
									followed={this.state.currentUser.followed_cookbooks}
								/>
							)}
						/>
						<Route path="/" render={() => <Home user={this.state.currentUser} />} />
					</Switch>
					{/* <Route path={`/user/${this.state.currentUser.id}/cookbooks`} render={(windowProps) => <CookBookContainer windowProps={windowProps}owned={this.state.currentUser.owned_cookbooks} followed={this.state.currentUser.followed_cookbooks} /> } /> */}
				</div>
			);
		} else {
			return (
				<div>
					<Header />
                    <div className="welcome-background d-flex justify-content-center align-items-center m-0 p-0" style={{height: "75vh"}}>
					<WelcomeContainer className="login-overlay"login={this.loginUser} />
                    </div>
				</div>
			);
		}
	};

	render() {
		return <div>{this.componentsToRender()}</div>;
	}
}

export default withRouter(App);
