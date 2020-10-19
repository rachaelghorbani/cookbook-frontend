import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookbookCard from '../Components/CookbookCard';
import { CardGroup } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import NewCookbookForm from '../Components/NewCookbookForm'

const cookbooksURL = 'http://localhost:3000/cookbooks/';

class CookBookContainer extends React.Component {
	state = {
        allCookbooks: [],
        viewedUser: {}
	};

	renderOwnedCookbooks = () => {
		if (this.props.owned.length > 0) {
            console.log("Owned Cookbooks: ", this.props.owned)
			return this.props.owned.map((cb) => <CookbookCard cookbook={cb} />);
		}
	};

	renderFollowedCookbooks = () => {
		if (this.props.followed.length > 0) {
            console.log("Followed Cookbooks: ", this.props.followed)
			return this.props.followed.map((cb) => <CookbookCard cookbook={cb} followed={true} />);
		}
	};

	renderAllCookbooks = () => {
		if (this.state.allCookbooks.length > 0) {
			let cookbooks = this.state.allCookbooks.map((cb) => <CookbookCard cookbook={cb} />);
            return <CardGroup>{cookbooks}</CardGroup>;
            
		}
	};

	componentDidMount = () => {
		fetch(cookbooksURL).then((resp) => resp.json()).then((cookbooks) => {
            console.log(cookbooks);
            
			this.setState({ allCookbooks: cookbooks });
		});
	};

	render() {
		console.log(this.props.windowProps.match);
		return (
			<Switch>
                {/* new cookbook */}
                <Route path="cookbooks/new" render={() => {
                    return (
                    <NewCookbookForm />
                    )
                }} />

                {/* individual cookbook show page */}
				<Route path="/cookbooks/:user_id/:cookbook_id" render={() => {
                    
                
                }} />
                {/* user homepage with all owned and followed cookbooks */}
				<Route path="/cookbooks/:user_id" render={() => {
                   return (
                   <CardGroup>
                        {this.renderOwnedCookbooks()}
                        {this.renderFollowedCookbooks()}
                    </CardGroup>
                   )
                
                }} />
                {/* All cookbooks */}
				<Route path="/cookbooks" render={() => this.renderAllCookbooks()} />
			</Switch>
		);
	}
}

export default CookBookContainer;

// render() {

//     return (
//         <Switch>
//             <Route path="/dogs/favorites" render={() => <Favorites dogs={this.renderFavorites()} />} />

//             <Route path="/dogs/:id" render={(routerProps) => {

//                 let id = parseInt(routerProps.match.params.id)

//                 if (this.state.api.length > 0) {

//                     let foundDog = this.state.api.find(el => el.id === id)
//                     console.log(foundDog)
//                     return (<DogCard dog={foundDog} />)
//                 }

//             }} />
//             <Route path="/dogs" render={() => <DogsList dogs={this.state.api} clickHandler={this.addToFavoritesClickHandler} />
//             } />
//         </Switch>
//     )
// }
