import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

class CookbookCard extends React.Component {

    getTitleImage = () => {
        let photoRecipe = this.props.cookbook.recipes.find(rec => rec.photos.length > 0)
        if (photoRecipe) {
            return photoRecipe.photos[0].img_url
        } else {
            return "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
        }
    }

    followedButton = () => {
        if (this.props.followed) {
            return <Button variant="danger">Unfollow</Button>
        }
    }

    
	render() {
		return (
			<div className="cookbook-card">
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.getTitleImage()} alt="You Should See Food Here." />
                <Card.Body>
                    <Card.Title>{this.props.cookbook.title}</Card.Title>
                    <Card.Text>
                    Cookbook description to go here!
                    </Card.Text>
                    <Button variant="primary">Recipes</Button>
                    {this.followedButton()}
                </Card.Body>
                </Card>
			</div>
		);
	}
}

export default CookbookCard;