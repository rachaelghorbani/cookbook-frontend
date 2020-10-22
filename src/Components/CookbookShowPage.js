import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, CardGroup, Button} from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import '../App.css';
import SearchRecipesFromCookbook from './SearchRecipesFromCookbook'

class CookbookShowPage extends React.Component {

    state ={
        searchParam: "title",
        searchTerm: ""
	}

	localDeleteHandler = () => {
        this.props.delete(this.props.cookbook.id)
    }
	//create a followed instance in the db
	localFollowHandler = () => {
		this.props.follow(this.props.cookbook.id)
	}

	localUnfollowHandler = () => {
		this.props.unfollow(this.props.cookbook.id)
	}
	
	renderButtons = () => {
		let userCBs = this.props.ownedCookbooks
		let followedCBs = this.props.followedCookbooks
		if (userCBs.find(cb => cb.id === this.props.cookbook.id)) {
			return (
				<div>
					<Button variant="secondary" size="sm" className="mr-2">Edit</Button>
					<Button variant="secondary" size="sm" className="mr-2" onClick={this.localDeleteHandler}>Delete</Button>
				</div>
			)
		} else if (followedCBs.find(cb => cb.id === this.props.cookbook.id)) {
			return (
            <div>
				<Button onClick={this.localUnfollowHandler}>Unfollow</Button>
			</div>
            )
		} else {
			return <Button onClick={this.localFollowHandler}>Follow</Button>
		}		
	}


	// <p>Included in <Link to={`/cookbooks/${props.owner_id}/${props.cookbook_id}`}>{props.cookbook_title}</Link></p>
	// <p>By: {props.owner_name}</p></Card.Text>

	// ={`/cookbooks/${props.owner_id}/${props.cookbook_id}`}>{props.cookbook_title}

	 renderRecipes = () => {
         if(this.state.searchParam === "title"){
             const filtered = this.props.cookbook.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
             const recipes = filtered.map((recipe) => <RecipeCard key={recipe.id} owner_id={this.props.cookbook.owner.owner_id} cookbook_id={this.props.cookbook.id} recipe={recipe} owner_name={this.props.cookbook.owner.owner_name} cookbook_title={this.props.cookbook.title}/>);
		    return <CardGroup className='justify-content-center'>{recipes}</CardGroup>;

         }else if (this.state.searchParam === "ingredient"){
             const filtered = this.props.cookbook.recipes.filter(recipe => {
               for(let ingredient of recipe.ingredients){
                     if(ingredient.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                         return recipe
                     }
                 }
             })
             const recipes = filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} owner_id={this.props.cookbook.owner.owner_id} cookbook_id={this.props.cookbook.id}/>);
             return <CardGroup className='justify-content-center'>{recipes}</CardGroup>;
            
         }
	};
	 getTitleImage = () => {
		let photoRecipe = this.props.cookbook.recipes.find((rec) => rec.photos.length > 0);
		if (photoRecipe) {
			return photoRecipe.photos[0].img_url;
		} else {
			return 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg';
		}
    };
    
     searchHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        console.log(this.props.cookbook)
	return (
		<Container className="mt-2">
			<Row>
				<Col >
					<img className="img-responsive w-100" src={this.getTitleImage()} alt="food pic" />
				</Col>
				<Col >
					<Row>
						<Col lg={12} className="border-bottom  text-center recipe-title">
							{this.props.cookbook.title}
						</Col>
						<Col lg={12} className="mt-3">
							{this.renderButtons()}
						</Col>
						<Col lg={12} className=" text-center mt-3">
							{this.props.cookbook.description}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col lg={12} className="d-flex justify-content-between align-items-center m-2">
					Recipes found in this cookbook:
                    <SearchRecipesFromCookbook searchParam={this.state.searchParam} searchTerm={this.state.searchTerm} changeHandler={this.searchHandler}/>
				</Col>
			</Row>
			<Row className="mt-6 d-flex">
				<Col className="">{this.renderRecipes()}</Col>
			</Row>
		</Container>
    );
    }
};

export default CookbookShowPage;
