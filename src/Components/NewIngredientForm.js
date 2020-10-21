import React from 'react';
import { Form, Button } from 'react-bootstrap';

const NewIngredientForm = (props) => {
    const localDeleteHandler = () => {
        props.delete(props.index)
    }

    const localChangeHandler = (event) => {
        props.onChange(event, props.index)
    }
    
	return (
		<div>
			<Form.Group className="d-inline-block">
				<Form.Control
					onChange={localChangeHandler}
					size="sm"
					type="text"
					name="quantity"
					value={props.ingredient.quantity}
					placeholder="Ingredient Amount"
				/>
			</Form.Group>

			<Form.Group className="d-inline-block">
				<Form.Control
					onChange={localChangeHandler}
					size="sm"
					type="text"
					name="name"
					value={props.ingredient.name}
					placeholder="Ingredient Name"
				/>
			</Form.Group>
			<Button className="btn btn-secondary btn-sm" onClick={localDeleteHandler}>
				X
			</Button>
		</div>
	);
};

export default NewIngredientForm;
