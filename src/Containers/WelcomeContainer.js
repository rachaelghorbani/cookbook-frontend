import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../Components/LoginForm.js'
import {Button} from 'react-bootstrap'
import SignUpForm from '../Components/SignUpForm'
import '../App.css'

class WelcomeContainer extends React.Component {
    state = {
        showButtons: true,
        showLogin: false,
        showSignup: false
    }

    loginHandler = () => {
        this.setState({showButtons: false, showLogin: true})
        
    }

    signupHandler = () => {
        this.setState({showButtons: false, showSignup: true})
       
    }

    reset = () => {
        this.setState({
            showButtons: true,
            showLogin: false,
            showSignup: false})
    }
    
	render() {
        console.log("Show Login?", this.state.showLogin)
		return (
			<div className="welcome-container login-overlay">
                {this.state.showButtons ? <div style={{opacity: 1}}>
                    <Button className="mx-2"onClick={this.loginHandler} variant="secondary">Login</Button>
                    <Button className="mx-2" onClick={this.signupHandler} variant="secondary">Sign Up</Button>
                </div> : null}
            {/* {this.loginHandler}
            {this.signupHandler} */}
                
        {this.state.showLogin ? <LoginForm login={this.props.login} reset={this.reset}/> : null}
        {this.state.showSignup ? <SignUpForm signup={this.props.signup} reset={this.reset}/> : null}      
                {/* <h1>WelcomeContainer GOES HERE!</h1> */}
			</div>
		);
	}
}

export default WelcomeContainer;
