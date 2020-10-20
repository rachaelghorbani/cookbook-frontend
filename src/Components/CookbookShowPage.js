import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import RecipeCard from '../Components/RecipeCard';
import '../App.css';
import SearchRecipesFromCookbook from '../Components/SearchRecipesFromCookbook'

const CookbookShowPage = (props) => {
	const renderRecipes = () => {
		const recipes = props.cookbook.recipes.map((recipe) => <RecipeCard recipe={recipe} />);
		return <CardGroup>{recipes}</CardGroup>;
	};
	const getTitleImage = () => {
		let photoRecipe = props.cookbook.recipes.find((rec) => rec.photos.length > 0);
		if (photoRecipe) {
			return photoRecipe.photos[0].img_url;
		} else {
			return 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg';
		}
	};
	console.log(props);
	return (
		<Container className="mt-2">
			<Row>
				<Col className="border border-primary">
					<img className="img-responsive w-100" src={getTitleImage()} alt="food pic" />
				</Col>
				<Col className="border border-danger">
					<Row>
						<Col lg={12} className="border border-dark text-center recipe-title">
							{props.cookbook.title}
						</Col>
						<Col lg={12} className="border border-primary text-center mt-3">
							{props.cookbook.description}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col className="recipe-title d-flex justify-content-between align-items-center col">
					Recipes in this cookbook
                    <SearchRecipesFromCookbook />
					{/* <div className="md-form mt-0 w-50 ">
						<input className="form-control" type="text" placeholder="Search" aria-label="Search" />
					</div> */}
				</Col>
			</Row>
			<Row className="mt-6">
				<Col className="border border-info">{renderRecipes()}</Col>
			</Row>
			{/* <div>{props.cookbook.title}</div> */}
		</Container>
	);
};

export default CookbookShowPage;
