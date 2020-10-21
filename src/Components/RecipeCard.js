import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const RecipeCard = (props) => {
	const showPhoto = () => {
		if (props.recipe.photos.length > 0) {
			return props.recipe.photos[0].img_url;
		}
	};
	return (
        <div className="recipe-card">
		<Card style={{ width: '18rem', height: '25rem', margin: '5px' }}>
			<Card.Img variant="top" src={showPhoto()} alt="You Should See Food Here." />
			<Card.Body>
				<Card.Title>{props.recipe.title}</Card.Title>
				<Card.Text>Cookbook description to go here!</Card.Text>
				{/* /cookbooks/:user_id/:cookbook_id/recipe_id */}
				<Link to={`/cookbooks/${props.owner_id}/${props.cookbook_id}/${props.recipe.id}`}>
					<Button variant="primary">See Recipe</Button>
				</Link>
			</Card.Body>
		</Card>
        </div>
	);
};

export default RecipeCard;
