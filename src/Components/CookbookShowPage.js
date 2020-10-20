import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import RecipeCard from '../Components/RecipeCard';
import '../App.css';
import SearchRecipesFromCookbook from '../Components/SearchRecipesFromCookbook'

const CookbookShowPage = (props) => {
	const renderRecipes = () => {
		const recipes = props.cookbook.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
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
				<Col >
					<img className="img-responsive w-100" src={getTitleImage()} alt="food pic" />
				</Col>
				<Col >
					<Row>
						<Col lg={12} className="border-bottom  text-center recipe-title">
							{props.cookbook.title}
						</Col>
						<Col lg={12} className=" text-center mt-3">
							{props.cookbook.description}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex justify-content-between align-items-center m-2">
					Recipes found in this cookbook
                    <SearchRecipesFromCookbook />
				</Col>
			</Row>
			<Row className="mt-6">
				<Col className="">{renderRecipes()}</Col>
			</Row>
		</Container>
	);
};

export default CookbookShowPage;
