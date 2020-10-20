import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, CardGroup, Carousel, Image, ListGroup } from 'react-bootstrap';
import '../App.css';
import SearchRecipesFromCookbook from './SearchRecipesFromCookbook';

class RecipeShowPage extends React.Component {
	state = {
		searchParam: 'title',
		searchTerm: ''
	};
	//  renderRecipes = () => {
	//      if(this.state.searchParam === "title"){
	//          const filtered = this.props.cookbook.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
	//          const recipes = filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
	// 	    return <CardGroup>{recipes}</CardGroup>;

	//      }else if (this.state.searchParam === "ingredient"){
	//          const filtered = this.props.cookbook.recipes.filter(recipe => {
	//            for(let ingredient of recipe.ingredients){
	//                  if(ingredient.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
	//                      return recipe
	//                  }
	//              }
	//          })
	//          const recipes = filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
	//          return <CardGroup>{recipes}</CardGroup>;

	//      }
	// const recipes = this.props.cookbook.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
	// return <CardGroup>{recipes}</CardGroup>;
	// };

	// getTitleImage = () => {
	// 	let photoRecipe = this.props.recipe.find((rec) => rec.photos.length > 0);
	// 	if (photoRecipe) {
	// 		return photoRecipe.photos[0].img_url;
	// 	} else {
	// 		return 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg';
	// 	}
	// };

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
    

	// "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636"

    // dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(thisIsMyCopy)}}

	render() {
		return (
			<Container className="mt-2 mb-4">
				<Row>
					<Col className="border border-danger">
						<Carousel>{this.getImages()}</Carousel>
                        //comments
						{/* <img className="img-responsive w-100" src={this.getTitleImage()} alt="food pic" /> */}
					</Col>
					<Col className="border border-danger">
						<Row>
							<Col lg={12} className="border border-primary  text-center recipe-title">
								{this.props.recipe.title}
							</Col>
							<Col lg={12} className="  border border-primary mt-3">
                                <ListGroup as="ul" variant="flush">
                                    <h4>Ingredients:</h4>
                                    {this.getIngredients()}
                                </ListGroup>
							</Col>
                            <Col lg={12} className="border border-primary mt-3 ">
                                <h4>Instructions:</h4>
                                <div className="instructions" dangerouslySetInnerHTML={{__html: (this.props.recipe.instructions)}}></div>
							</Col>
						</Row>
					</Col>
				</Row>
                <Row>
                    <Col className="border border-danger">
                        <div>
                            hi
                        </div>
                    </Col>
                </Row>
			
			</Container>
		);
	}
}

export default RecipeShowPage;
