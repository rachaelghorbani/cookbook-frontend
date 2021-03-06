import React from 'react';
import { Form, Button } from 'react-bootstrap';

const NewCookbookForm = (props) => {
	return (
		<Form onSubmit={props.submitHandler} className=" login-overlay w-25 ml-4">
			<Form.Group controlId="formBasicTitle">
				<Form.Label>Title:</Form.Label>
				<Form.Control
					type="text"
					name="newCookbookTitle"
					placeholder="Enter title"
					value={props.title}
					onChange={props.changeHandler}
				/>
                <Form.Label>Description:</Form.Label>
                <Form.Control type="textarea" name="newCookbookDescription" value={props.description} placeholder="Enter description" onChange={props.changeHandler} />
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default NewCookbookForm;
