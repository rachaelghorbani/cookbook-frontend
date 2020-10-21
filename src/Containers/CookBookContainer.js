import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookbookCard from '../Components/CookbookCard';
import { CardGroup, Container } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import NewCookbookForm from '../Components/NewCookbookForm'
import CookbookShowPage from '../Components/CookbookShowPage'
import RecipeContainer from './RecipeContainer'
import RecipeShowPage from '../Components/RecipeShowPage'

const cookbooksURL = 'http://localhost:3000/cookbooks/';
const commentsURL = 'http://localhost:3000/comments/';

class CookBookContainer extends React.Component {
	state = {
        allCookbooks: [],
        newCookbookTitle: "",
        newCookbookDescription: ""
    };
    
    getRecipe = (recipe_id) => {
            let foundCb = this.state.allCookbooks.find(cb => cb.recipes.find(r => r.id === recipe_id))
            let foundRecipe = foundCb.recipes.find(r => r.id === recipe_id)
            return foundRecipe
    }

    getCookbook = (cookbook_id) => {
            return this.state.allCookbooks.find(cb => {
                return cb.id === cookbook_id
            })
    }

	renderOwnedCookbooks = () => {
        const userOwnedCookbooks = this.state.allCookbooks.filter(cb => cb.owner.owner_id === this.props.user.id);
		if (userOwnedCookbooks.length > 0) {
			return userOwnedCookbooks.map((cb) => <CookbookCard key={cb.id} deleteHandler={this.deleteCookbookHandler} cookbook={cb} owned={true}/>);
		}
    };
    
	renderFollowedCookbooks = () => {
        const userLikedCookbooks = this.state.allCookbooks.filter(cookbook => {
            
            for(let follower of cookbook.followers){
                return follower.follower_id === this.props.user.id
            }
        })
		if (userLikedCookbooks.length > 0) {
			return userLikedCookbooks.map((cb) => <CookbookCard cookbook={cb} key={cb.id} followed={true} />);
		}
	};

	renderAllCookbooks = () => {
		if (this.state.allCookbooks.length > 0) {
			let cookbooks = this.state.allCookbooks.map((cb) => <CookbookCard key={cb.id} cookbook={cb} />);
            return <CardGroup>{cookbooks}</CardGroup>;
            
		}
	};

	componentDidMount = () => {
        fetch(cookbooksURL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${window.sessionStorage.accessToken}`
            }
        })
        .then((resp) => resp.json())
        .then((cookbooks) => {
			this.setState({ allCookbooks: cookbooks });
		});
    };
    
    handleNewCookbookChange = e => {
        this.setState({
            [e.target.name]: e.target.value})
    }

    deleteCookbookHandler = cookbookId => {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.sessionStorage.accessToken}`
            }
        }

        fetch(cookbooksURL + cookbookId, options)
        .then(resp => {resp.json()})
        .then(() => {
            const newArr = [...this.state.allCookbooks]

            const filtered = newArr.filter(cb => cb.id !== cookbookId)
            this.setState({allCookbooks: filtered})
            //not deleting it from the users own cookbooks
            //find old item from api then filter tho
        })
    }
    
    submitNewForm = e => {
        e.preventDefault()
        this.setState({newCookbookTitle: ""})
        const newCookbook = {
            title: this.state.newCookbookTitle,
            user_id: this.props.user.id,
            description: this.state.newCookbookDescription
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                Authorization: `Bearer ${window.sessionStorage.accessToken}`
            },
            body: JSON.stringify(newCookbook)
        }
        fetch(cookbooksURL, options)
        .then(resp => resp.json())
        .then(cookbook => {
            const redirectUrl = `/cookbooks/${this.props.user.id}/${cookbook.id}`
            const newArr = [...this.state.allCookbooks, cookbook]
            this.setState({allCookbooks: newArr})
            this.props.windowProps.history.push(redirectUrl)

           
            //will need a redirect to show page here
        })
        //this works

        // this.props.windowProps.history.push('/cookbooks')
    }

    addCommentClickHandler = commentObj => {
        if(commentObj.content !== ''){
        const options ={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                Authorization: `Bearer ${window.sessionStorage.accessToken}`
            },
            body: JSON.stringify(commentObj)
        }

        fetch(commentsURL, options)
        .then(resp => resp.json())
        .then(newComment => {
            let newArr = [...this.state.allCookbooks]
            let recipe_id = newComment.recipe_id
            let foundCb = newArr.find(cb => cb.recipes.find(r => r.id === recipe_id))
            let foundCb_id = foundCb.id
            fetch(cookbooksURL+foundCb_id, {method: "GET", headers: {Authorization: `Bearer ${window.sessionStorage.accessToken}`}})
            .then(resp => resp.json())
            .then(newCB => {
                let oldCbIndex = newArr.findIndex(cb => cb.id === newCB.id)
                newArr.splice(oldCbIndex, 1, newCB)
                this.setState({allCookbooks: newArr})
            })
        })
    }
    }


    submitNewPhoto = formData => {
        fetch('http://localhost:3000/photos', {
            method: "POST",
            headers:{
                Authorization: `Bearer ${window.sessionStorage.accessToken}`
            },
            body: formData
        }).then(resp => resp.json())
        .then(img => {
            console.log(img)
            const newArr = [...this.state.allCookbooks]
            const recipe_id = img.recipe_id
            const foundCb = newArr.find(cb => cb.recipes.find(r => r.id === recipe_id))
            const foundCb_id = foundCb.id
            fetch(cookbooksURL+foundCb_id, {method: "GET", headers: {Authorization: `Bearer ${window.sessionStorage.accessToken}`}})
            .then(resp => resp.json())
            .then(newCB => {
                let oldCbIndex = newArr.findIndex(cb => cb.id === newCB.id)
                newArr.splice(oldCbIndex, 1, newCB)
                this.setState({allCookbooks: newArr})
            })





        })
    }
    
	render() {
		return (
			<Switch>
                {/* new cookbook */}
                <Route path="/cookbooks/new" render={() => <NewCookbookForm description={this.state.newCookbookDescription}title={this.state.newCookbookTitle} changeHandler={this.handleNewCookbookChange} submitHandler={this.submitNewForm}/>} />

                {/* all recipes */}
                <Route path="/cookbooks/recipes" render={() => <RecipeContainer cookbooks={this.state.allCookbooks} />} />

                {/* recipe show page */}
                
                <Route path ="/cookbooks/:user_id/:cookbook_id/:recipe_id" render={({match}) => {
                    const id = parseInt(match.params.recipe_id)
                    if(this.state.allCookbooks.length > 0){
                        const recipe = this.getRecipe(id)
                        return (


                            <RecipeShowPage addPhoto={this.submitNewPhoto}clickHandler={this.addCommentClickHandler} user_id={this.props.user.id}recipe={recipe}/>
                        )
                    }
            }} />

                {/* individual cookbook show page */}
				<Route path="/cookbooks/:user_id/:cookbook_id" render={({match}) => {
                    const id = parseInt(match.params.cookbook_id)
                    if(this.state.allCookbooks.length > 0){
                    
                    return <CookbookShowPage cookbook={this.getCookbook(id)}/>
                    }
                } }/>

                {/* user homepage with all owned and followed cookbooks */}
				<Route path="/cookbooks/:user_id" render={() => {
                   return (
                       <Container>
                   <CardGroup>
                        {this.renderOwnedCookbooks()}
                        {this.renderFollowedCookbooks()}
                    </CardGroup>
                    </Container>
                   )
                
                }} />

                {/* All cookbooks */}
				<Route path="/cookbooks" render={() => {
                    return (
                    <Container>
                        {this.renderAllCookbooks()}
                    </Container>
                    )
                    
                }

                    }/>
			</Switch>
		);
	}
}

export default withRouter(CookBookContainer);
