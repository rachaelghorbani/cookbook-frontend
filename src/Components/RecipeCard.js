import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const RecipeCard = (props) => {
	const showPhoto = () => {
		if (props.recipe.photos.length > 0) {
			return props.recipe.photos[0].img_url;
		}
	};

	const cardText = () => {
		if (props.owner_name) {
			return (
				<div>
					<p>Included in <Link to={`/cookbooks/${props.owner_id}/${props.cookbook_id}`}>{props.cookbook_title}</Link></p>
					<p>By: {props.owner_name}</p>
				</div>
			)
		}
	}

	return (
        <div className="recipe-card">
		<Card style={{ width: '18rem', height: '25rem', margin: '5px' }}>
			<Card.Img variant="top" src={showPhoto()} alt="You Should See Food Here." />
			<Card.Body>
            <ListGroup as="ul" variant="flush" className="overflow-auto" style={{height: 65}}>
				<Card.Title>{props.recipe.title}</Card.Title>
                </ListGroup>
				<Card.Text>
					{cardText()}
				</Card.Text>
				<Link to={`/cookbooks/${props.owner_id}/${props.cookbook_id}/${props.recipe.id}`}>
					<Button variant="primary">See Recipe</Button>
				</Link>
			</Card.Body>
		</Card>
        </div>
	);
};

export default RecipeCard;
