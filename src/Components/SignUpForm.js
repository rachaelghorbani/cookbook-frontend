import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {

    state={
        first_name: "",
        last_name: "",
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
        this.props.signup(this.state)
    }

	render() {
		return (
			<Form onSubmit={this.submitHandler}>
                <Form.Group controlId="formBasicFirstName">
					<Form.Label>First Name:</Form.Label>
					<Form.Control type="text" name="first_name" placeholder="Enter your first name" value={this.state.first_name} onChange={this.changeHandler}/>
				</Form.Group>
                <Form.Group controlId="formBasicLastName">
					<Form.Label>Last Name:</Form.Label>
					<Form.Control type="text" name="last_name" placeholder="Enter your last name" value={this.state.last_name} onChange={this.changeHandler}/>
				</Form.Group>
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
		);
	}
}

export default SignUpForm