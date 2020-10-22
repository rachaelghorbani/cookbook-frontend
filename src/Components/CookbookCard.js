import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';

class CookbookCard extends React.Component {
	getTitleImage = () => {
		let photoRecipe = this.props.cookbook.recipes.find((rec) => rec.photos.length > 0);
		if (photoRecipe) {
			return photoRecipe.photos[0].img_url;
		} else {
			return 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg';
		}
	};

	renderCardFooter = () => {
		if (this.props.cookbook.owner.owner_id === this.props.user.id) {
			return <Card.Footer className="text-muted owned mt-3">Your Cookbook</Card.Footer>
		}  else if (this.props.cookbook.followers.filter(follower => follower.follower_id === this.props.user.id).length > 0) {
			return <Card.Footer  className="text-muted fav mt-3">Followed!</Card.Footer>
		}
	}

	render() {
        console.log(this.props.cookbook.followers.filter(follower => follower.follower_id === this.props.user.id).length)
		return (
			<div className="cookbook-card">
				<Card style={{ width: '18rem', height: '25rem',margin: '5px'}}>
					<Card.Img className="card-image" variant="top" src={this.getTitleImage()} alt="You Should See Food Here." />
					<Card.Body>
						<Card.Title>{this.props.cookbook.title}</Card.Title>
                        <ListGroup as="ul" variant="flush" className="overflow-auto" style={{height: 50}}>

						<Card.Text>{this.props.cookbook.description}</Card.Text>
                        </ListGroup>
                        <Link to={`/cookbooks/${this.props.cookbook.owner.owner_id}/${this.props.cookbook.id}`}>
							<Button className='mx-1'variant="primary">See More</Button>
						</Link>
					</Card.Body>
					{this.renderCardFooter()}
				</Card>
			</div>
		);
	}
}

export default CookbookCard;
