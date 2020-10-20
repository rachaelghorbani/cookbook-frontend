import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

class CookbookCard extends React.Component {
	getTitleImage = () => {
		let photoRecipe = this.props.cookbook.recipes.find((rec) => rec.photos.length > 0);
		if (photoRecipe) {
			return photoRecipe.photos[0].img_url;
		} else {
			return 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg';
		}
	};

	// followedButton = () => {
	// 	if (this.props.followed) {
	// 		return <Button variant="danger">Unfollow</Button>;
	// 	}
    // };
    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.cookbook.id)
    }

	buttonsToRender = () => {
		if (this.props.owned) {
			return (
				<div>
					<Link to={`/cookbooks/${this.props.cookbook.owner.owner_id}/${this.props.cookbook.id}`}>
						<Button variant="primary">See More</Button>
					</Link>
					<Button>Edit</Button>
					<Button onClick={this.localDeleteHandler}>Delete</Button>
				</div>
			);
		} else if (this.props.followed) {
			return (
				<div>
					<Link to={`/cookbooks/${this.props.cookbook.owner.owner_id}/${this.props.cookbook.id}`}>
						<Button variant="primary">See More</Button>
					</Link>
                    <Button variant="danger">Unfollow</Button>
				</div>
			);
		}
	};
	//if this.props.owned add edit and delete buttons, otherwise add the follow button

	render() {
		return (
			<div className="cookbook-card">
				<Card style={{ width: '18rem' }}>
					<Card.Img className="card-image" variant="top" src={this.getTitleImage()} alt="You Should See Food Here." />
					<Card.Body>
						<Card.Title>{this.props.cookbook.title}</Card.Title>
						<Card.Text>Cookbook description to go here!</Card.Text>
						{/* <Link to={`/cookbooks/${this.props.cookbook.owner_id}/${this.props.cookbook.id}`}>
							<Button variant="primary">See More</Button>
						</Link> */}
                        {this.buttonsToRender()}
						{/* {this.followedButton()} */}
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default CookbookCard;
