import React from 'react';
import { Form, Button } from 'react-bootstrap';

const NewCookbookForm = (props) => {
	return (
		<Form onSubmit={props.submitHandler} className="w-25 ml-4">
			<Form.Group controlId="formBasicTitle">
				<Form.Label>Title:</Form.Label>
				<Form.Control
					type="text"
					name="title"
					placeholder="Enter title"
					value={props.title}
					onChange={props.changeHandler}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default NewCookbookForm;
