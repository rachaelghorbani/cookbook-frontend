import React from 'react';
import { Form, Button } from 'react-bootstrap';
import NewIngredientForm from './NewIngredientForm';

class NewRecipeForm extends React.Component {
	state = {
		recipe: {
			title: '',
			instructions: '',
			cookbook_id: '',
			ingredients_attributes: [ { quantity: '', name: '' } ]
		}
	};

	emptyIngredient = () => {
		return {
			quantity: '',
			name: ''
		};
	};

	// callback to add a blank ingredient to state (to render a new form input)
	addAnotherIngredient = () => {
		let newIngredient = this.emptyIngredient();
		this.setState((prevState) => {
			return {
				recipe: {
					...prevState.recipe,
					ingredients_attributes: [ ...prevState.recipe.ingredients_attributes, newIngredient ]
				}
			};
		});
	};

	ownerCookbooks = () => {
		const ownedCb = this.props.cookbooks.filter((cb) => cb.owner.owner_id === this.props.user.id);
		return ownedCb.map((cb, index) => (
			<option value={cb.id} key={index}>
				{cb.title}
			</option>
		));
	};

	renderIngredientInputs = () => {
		return this.state.recipe.ingredients_attributes.map((ingredient, index) => {
			return (
				<NewIngredientForm
                    onChange={this.changeIngredientsHandler}
					key={index}
					index={index}
					ingredient={ingredient}
					delete={this.deleteIngredientInput}
				/>
			);
		});
	};

	changeHandler = (e) => {
        if(e.target.name === "title"){
            let value = e.target.value
            
                this.setState(prevState => ({
                    recipe: {...prevState.recipe, title: value}
                }))
        } else if (e.target.name === "cookbook_id") {
            let value = parseInt(e.target.value)
            
                this.setState(prevState => ({
                    recipe: {...prevState.recipe, cookbook_id: value}
                }))
        } else if (e.target.name === "instructions") {
            let value = e.target.value
            
                this.setState(prevState => ({
                    recipe: {...prevState.recipe, instructions: value}
                }))
        }
	};

	changeIngredientsHandler = (e, index) => {

        let newIngredients = [ ...this.state.recipe.ingredients_attributes ];
        let ing = newIngredients[index]

        if(e.target.name === "quantity"){
            ing.quantity = e.target.value
            newIngredients.splice(index, 1, ing)
            
                this.setState(prevState => ({
                    recipe: {...prevState.recipe, ingredients_attributes: newIngredients}
                }))
        } else if (e.target.name === "name") {
            ing.name = e.target.value
            newIngredients.splice(index, 1, ing)
            
                this.setState(prevState => ({
                    recipe: {...prevState.recipe, ingredients_attributes: newIngredients}
                }))

        }

	};

	deleteIngredientInput = (index) => {
		console.log('delete handler index: ', index);
		let newIngredients = [ ...this.state.recipe.ingredients_attributes ];
		console.log(newIngredients);
		newIngredients.splice(index, 1);
		console.log(newIngredients);
		this.setState((prevState) => {
			return {
				recipe: { ...prevState.recipe, ingredients_attributes: newIngredients }
			};
		});
	};

    localSubmitHandler = (e) => {
        e.preventDefault()
        this.props.addRecipe(this.state.recipe)
    }
	render() {
		console.log(this.state);
		return (
			<Form className="login-overlay"onSubmit={this.localSubmitHandler}>
				<Form.Group controlId="title">
					<Form.Label>Recipe Title:</Form.Label>
					<Form.Control
						value={this.state.recipe.title}
						onChange={this.changeHandler}
						type="text"
						name="title"
						placeholder="Recipe title"
					/>
				</Form.Group>

				<Form.Group controlId="cookbooks">
					<Form.Label>Select Cookbook</Form.Label>
					<Form.Control name="cookbook_id" onChange={this.changeHandler} as="select">
						{this.ownerCookbooks()}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="instructions.ControlTextarea">
					<Form.Label>Recipe Instructions:</Form.Label>
					<Form.Control
						value={this.state.recipe.instructions}
						onChange={this.changeHandler}
						as="textarea"
						row={4}
						name="instructions"
						placeholder="Recipe instructions"
					/>
				</Form.Group>

				<Form.Group controlId="ingredients">
					<Form.Label>Ingredients:</Form.Label>
					{this.renderIngredientInputs()}
					<Button onClick={this.addAnotherIngredient}>Add Ingredient</Button>
				</Form.Group>

				<Button type="submit">Add Recipe</Button>
			</Form>
		);
	}
}

export default NewRecipeForm;
