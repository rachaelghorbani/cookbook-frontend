import React from 'react'
// import {Route, Switch} from 'react-router-dom'
import RecipeCard from '../Components/RecipeCard'
import {CardGroup} from 'react-bootstrap'

class RecipeContainer extends React.Component {

    renderRecipes = ()  => {
        return this.props.cookbooks.map(cb => cb.recipes.map(r => {
            return <RecipeCard key={r.id} recipe={r} owner_id={cb.owner.owner_id} cookbook_id={cb.id}/>
        }))
    }
    

    render() {
        return (
            <CardGroup>{this.renderRecipes()}</CardGroup>
        )
    }

}

export default RecipeContainer