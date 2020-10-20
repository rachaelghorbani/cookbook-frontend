import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const RecipeCard = (props) => {
	const showPhoto = () => {
		if (props.recipe.photos.length > 0) {
			return props.recipe.photos[0].img_url;
		}
	};
    console.log(props.recipe.photos)

	return (
		<Card style={{ width: '18rem', margin: '5px' }}>
			<Card.Img variant="top" src={showPhoto()} alt="You Should See Food Here." />
			<Card.Body>
				<Card.Title>{props.recipe.title}</Card.Title>
				<Card.Text>Cookbook description to go here!</Card.Text>
				<Link to={`/recipes/${props.recipe.id}`}>
					<Button variant="primary">See Recipe</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default RecipeCard;
