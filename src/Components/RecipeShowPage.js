import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, CardGroup, Carousel, Image, ListGroup, Button } from 'react-bootstrap';
import '../App.css';
// import SearchRecipesFromCookbook from './SearchRecipesFromCookbook';
import CommentsContainer from '../Containers/CommentsContainer'
import ImageUploadForm from './ImageUploadForm'

class RecipeShowPage extends React.Component {
	state = {
		searchParam: 'title',
		searchTerm: ''
	};

	getImages = () => {
		return this.props.recipe.photos.map((photo, index) => {
			return (
				<Carousel.Item key={index}>
					<Image rounded className="d-block w-100" src={photo.img_url} alt="food pic" />
					<Carousel.Caption>
						<p>{photo.description}</p>
					</Carousel.Caption>
				</Carousel.Item>
			);
		});
    };
    
    getIngredients = () => {
        return this.props.recipe.ingredients.map((ing, index) => {
            return (
                <ListGroup.Item key={index} as="li">
                    {`${ing.quantity} - ${ing.name}`}
                </ListGroup.Item>
                
            )
        }
        )
    }

	localDeleteHandler = () => {
		this.props.delete(this.props.recipe.id)
	}

	render() {
		return (
			<Container className="mt-2 mb-4">
				<Row>
					<Col >
						<Carousel>{this.getImages()}</Carousel>
                        <ImageUploadForm recipe_id={this.props.recipe.id} addPhoto={this.props.addPhoto}/>
                        <h4>Comments:</h4>
                        <CommentsContainer clickHandler={this.props.clickHandler}user_id={this.props.user_id} comments={this.props.recipe.comments} recipe_id={this.props.recipe.id}/>
					</Col>
					<Col >
						<Row>
							<Col lg={12} className="border-bottom  text-center recipe-title">
								{this.props.recipe.title}
							</Col>
							<Col lg={12} className="mt-3">
								<Button variant="secondary" size="sm" className="mr-2" >Edit</Button>
								<Button variant="secondary" size="sm" className="mr-2" onClick={this.localDeleteHandler}>Delete</Button>
							</Col>
							<Col lg={12} className="  mt-3">
                                <ListGroup as="ul" variant="flush" className="overflow-auto" style={{height: 400}}>
                                    <h4>Ingredients:</h4>
                                    {this.getIngredients()}
                                </ListGroup>
							</Col>
                            <Col lg={12} className=" mt-3 ">
                                <h4>Instructions:</h4>
                                <div className="instructions" dangerouslySetInnerHTML={{__html: (this.props.recipe.instructions)}}></div>
							</Col>
						</Row>
					</Col>
				</Row>
			
			</Container>
		);
	}
}

export default RecipeShowPage;
