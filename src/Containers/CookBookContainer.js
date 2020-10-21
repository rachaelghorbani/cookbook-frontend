import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookbookCard from '../Components/CookbookCard';
import { CardGroup, Container } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import NewCookbookForm from '../Components/NewCookbookForm';
import CookbookShowPage from '../Components/CookbookShowPage';
import RecipeContainer from './RecipeContainer';
import RecipeShowPage from '../Components/RecipeShowPage';
import NewRecipeForm from '../Components/NewRecipeForm'

const cookbooksURL = 'http://localhost:3000/cookbooks/';
const commentsURL = 'http://localhost:3000/comments/';
const recipesURL = 'http://localhost:3000/recipes/';

class CookBookContainer extends React.Component {
	state = {
		allCookbooks: [],
		newCookbookTitle: '',
		newCookbookDescription: ''
	};

	addRecipe = (formData) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
				Accepts: 'application/json',
				Authorization: `Bearer ${window.sessionStorage.accessToken}`
            },
            body: JSON.stringify(formData)
        }
		fetch(recipesURL, options)
		.then(resp => resp.json())
		.then(recipe => {
            const redirectUrl = `/cookbooks/${this.props.user.id}/${recipe.cookbook_id}/${recipe.id}/`
            let newArr = [...this.state.allCookbooks]
			let cb = newArr.find(cookbook => cookbook.id === recipe.cookbook_id)
			cb.recipes.push(recipe)
			let index = newArr.indexOf(cb)
			newArr.splice(index, 1, cb)
            this.setState({allCookbooks: newArr})
            this.props.windowProps.history.push(redirectUrl);
		})
	}

	getRecipe = (recipe_id) => {
		let foundCb = this.state.allCookbooks.find((cb) => cb.recipes.find((r) => r.id === recipe_id));
		let foundRecipe = foundCb.recipes.find((r) => r.id === recipe_id);
		return foundRecipe;
	};

	getCookbook = (cookbook_id) => {
		return this.state.allCookbooks.find((cb) => {
			return cb.id === cookbook_id;
		});
	};

	getUserCookbooks = () => {
		return this.state.allCookbooks.filter((cb) => cb.owner.owner_id === this.props.user.id)
	}

	getUserFollowedCookbooks = () => {
		return this.state.allCookbooks.filter((cookbook) => {
			for (let follower of cookbook.followers) {
				return follower.follower_id === this.props.user.id;
			}
		});
	}

	renderOwnedCookbooks = () => {
		const userOwnedCookbooks = this.state.allCookbooks.filter((cb) => cb.owner.owner_id === this.props.user.id);
		if (userOwnedCookbooks.length > 0) {
			return userOwnedCookbooks.map((cb) => (
				<CookbookCard key={cb.id} deleteHandler={this.deleteCookbookHandler} cookbook={cb} owned={true} />
			));
		}
	};

	renderFollowedCookbooks = () => {
		const userLikedCookbooks = this.state.allCookbooks.filter((cookbook) => {
			for (let follower of cookbook.followers) {
				return follower.follower_id === this.props.user.id;
			}
		});
		if (userLikedCookbooks.length > 0) {
			return userLikedCookbooks.map((cb) => <CookbookCard cookbook={cb} key={cb.id} followed={true} />);
		}
	};

	renderAllCookbooks = () => {
		if (this.state.allCookbooks.length > 0) {
			let cookbooks = this.state.allCookbooks.map((cb) => <CookbookCard key={cb.id} cookbook={cb} user={this.props.user} all="all"/>);
			return <CardGroup className="justify-content-center">{cookbooks}</CardGroup>;
		}
	};

	componentDidMount = () => {
		fetch(cookbooksURL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.sessionStorage.accessToken}`
			}
		})
			.then((resp) => resp.json())
			.then((cookbooks) => {
				this.setState({ allCookbooks: cookbooks });
			});
	};

	handleNewCookbookChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	deleteCookbookHandler = (cookbookId) => {
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${window.sessionStorage.accessToken}`
			}
		};

		fetch(cookbooksURL + cookbookId, options)
			.then((resp) => {
				resp.json();
			})
			.then(() => {
				const newArr = [ ...this.state.allCookbooks ];
                const filtered = newArr.filter((cb) => cb.id !== cookbookId);
                const redirectUrl = `/cookbooks/${this.props.user.id}/`
                this.props.windowProps.history.push(redirectUrl);
                this.setState({ allCookbooks: filtered });
			});
	};

	submitNewForm = (e) => {
		e.preventDefault();
		this.setState({ newCookbookTitle: '' });
		const newCookbook = {
			title: this.state.newCookbookTitle,
			user_id: this.props.user.id,
			description: this.state.newCookbookDescription
		};
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
				Authorization: `Bearer ${window.sessionStorage.accessToken}`
			},
			body: JSON.stringify(newCookbook)
		};
		fetch(cookbooksURL, options).then((resp) => resp.json()).then((cookbook) => {
			const redirectUrl = `/cookbooks/${this.props.user.id}/${cookbook.id}`;
			const newArr = [ ...this.state.allCookbooks, cookbook ];
			this.setState({ allCookbooks: newArr });
			this.props.windowProps.history.push(redirectUrl);

			//will need a redirect to show page here
		});
		//this works

		// this.props.windowProps.history.push('/cookbooks')
	};

	addCommentClickHandler = (commentObj) => {
		if (commentObj.content !== '') {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accepts: 'application/json',
					Authorization: `Bearer ${window.sessionStorage.accessToken}`
				},
				body: JSON.stringify(commentObj)
			};

			fetch(commentsURL, options).then((resp) => resp.json()).then((newComment) => {
				let newArr = [ ...this.state.allCookbooks ];
				let recipe_id = newComment.recipe_id;
				let foundCb = newArr.find((cb) => cb.recipes.find((r) => r.id === recipe_id));
				let foundCb_id = foundCb.id;
				fetch(cookbooksURL + foundCb_id, {
					method: 'GET',
					headers: { Authorization: `Bearer ${window.sessionStorage.accessToken}` }
				})
					.then((resp) => resp.json())
					.then((newCB) => {
						let oldCbIndex = newArr.findIndex((cb) => cb.id === newCB.id);
						newArr.splice(oldCbIndex, 1, newCB);
						this.setState({ allCookbooks: newArr });
					});
			});
		}
	};

	submitNewPhoto = (formData) => {
		fetch('http://localhost:3000/photos', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${window.sessionStorage.accessToken}`
			},
			body: formData
		})
			.then((resp) => resp.json())
			.then((img) => {
				console.log(img);
				const newArr = [ ...this.state.allCookbooks ];
				const recipe_id = img.recipe_id;
				const foundCb = newArr.find((cb) => cb.recipes.find((r) => r.id === recipe_id));
				const foundCb_id = foundCb.id;
				fetch(cookbooksURL + foundCb_id, {
					method: 'GET',
					headers: { Authorization: `Bearer ${window.sessionStorage.accessToken}` }
				})
					.then((resp) => resp.json())
					.then((newCB) => {
						let oldCbIndex = newArr.findIndex((cb) => cb.id === newCB.id);
						newArr.splice(oldCbIndex, 1, newCB);
						this.setState({ allCookbooks: newArr });
					});
			});
    };
    
    followHandler = cookbookId => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
					Accepts: 'application/json',
					Authorization: `Bearer ${window.sessionStorage.accessToken}`
            },
            body: JSON.stringify({cookbook_id: cookbookId, user_id: this.props.user.id})
        }

        fetch('http://localhost:3000/followeds', options)
        .then(resp => resp.json())
        .then(updatedCookbook => {
			let newArr = [...this.state.allCookbooks]
            let cb = newArr.find(cookbook => cookbook.id === updatedCookbook.id)
			console.log("old: ", cb)
			console.log("updated: ", updatedCookbook)
			let index = newArr.indexOf(cb)
			newArr.splice(index, 1, updatedCookbook)
			this.setState({allCookbooks: newArr})
        })
	}

    unfollowHandler = cookbookId => {
		const followers = this.getCookbook(cookbookId).followers
		let followed = followers.find(f => f.follower_id === this.props.user.id)
		console.log(followed)
		let followedId = followed.followed_id
        
		const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
					Accepts: 'application/json',
					Authorization: `Bearer ${window.sessionStorage.accessToken}`
            }
        }

        fetch(`http://localhost:3000/followeds/${followedId}`, options)
        .then(resp => resp.json())
        .then(updatedCookbook => {
			let newArr = [...this.state.allCookbooks]
			let cb = newArr.find(cookbook => cookbook.id === updatedCookbook.id)
			console.log("old: ", cb)
			console.log("updated: ", updatedCookbook)
			let index = newArr.indexOf(cb)
			newArr.splice(index, 1, updatedCookbook)
			this.setState({allCookbooks: newArr})
        })
	}

	render() {
		return (
			<Switch>
				{/* new cookbook */}
				<Route
					path="/cookbooks/new"
					render={() => (
						<NewCookbookForm
							description={this.state.newCookbookDescription}
							title={this.state.newCookbookTitle}
							changeHandler={this.handleNewCookbookChange}
							submitHandler={this.submitNewForm}
						/>
					)}
				/>
                {/* new recipe */}
                <Route path="/cookbooks/recipes/new" render={() => {
                   return (
                    <div className=" d-flex justify-content-center align-items-center m-0 p-0" style={{height: "75vh"}}>
                   <NewRecipeForm cookbooks={this.state.allCookbooks} user={this.props.user} addRecipe={this.addRecipe}/>
                   </div>
                   )
                }}/>

				{/* all recipes */}
				<Route
					path="/cookbooks/recipes"
					render={() => <RecipeContainer cookbooks={this.state.allCookbooks} />
					}
				/>

				{/* recipe show page */}

				<Route
					path="/cookbooks/:user_id/:cookbook_id/:recipe_id"
					render={({ match }) => {
						const id = parseInt(match.params.recipe_id);
						if (this.state.allCookbooks.length > 0) {
							const recipe = this.getRecipe(id);
							return (
								<RecipeShowPage
									addPhoto={this.submitNewPhoto}
									clickHandler={this.addCommentClickHandler}
									user_id={this.props.user.id}
									recipe={recipe}
								/>
							);
						}
					}}
				/>

				{/* individual cookbook show page */}
				<Route
					path="/cookbooks/:user_id/:cookbook_id"
					render={({ match }) => {
						const id = parseInt(match.params.cookbook_id);
						let ownedCookbooks = this.getUserCookbooks()
						let followedCookbooks = this.getUserFollowedCookbooks()
						if (this.state.allCookbooks.length > 0) {
							return <CookbookShowPage user={this.props.user} cookbook={this.getCookbook(id)} ownedCookbooks={ownedCookbooks} followHandler={this.followHandler} unfollowHandler={this.unfollowHandler} followedCookbooks={followedCookbooks} delete={this.deleteCookbookHandler} unfollow={this.unfollowHandler} follow={this.followHandler}/>;
						}
					}}
				/>

				{/* user homepage with all owned and followed cookbooks */}
				<Route
					path="/cookbooks/:user_id"
					render={() => {
						return (
							<div className="d-flex justify-content-center">
								<CardGroup >
									{this.renderOwnedCookbooks()}
									{this.renderFollowedCookbooks()}
								</CardGroup>
							</div>
						);
					}}
				/>

				{/* All cookbooks */}
				<Route
					path="/cookbooks"
					render={() => {
						return <div className="d-flex justify-content-center">{this.renderAllCookbooks()}</div>;
					}}
				/>
			</Switch>
		);
	}
}

export default withRouter(CookBookContainer);
