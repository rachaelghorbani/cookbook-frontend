import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

    state={
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
		e.preventDefault()
		this.props.reset()
		this.props.login(this.state)
		// this.setState({username: "", password: ""})
    }

	render() {
		return (
            <Container>
			<Form onSubmit={this.submitHandler}>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.changeHandler}/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password: </Form.Label>
					<Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
				</Form.Group>
                
				
				<Button variant="primary" type="submit">
					Submit
				</Button>
                
                
			</Form>
            </Container>
		);
	}
}

export default LoginForm;
