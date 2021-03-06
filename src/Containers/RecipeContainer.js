import React from 'react'
// import {Route, Switch} from 'react-router-dom'
import RecipeCard from '../Components/RecipeCard'
import {CardGroup} from 'react-bootstrap'

class RecipeContainer extends React.Component {

    renderRecipes = ()  => {
        return this.props.cookbooks.map(cb => cb.recipes.map(r => {
            return <RecipeCard key={r.id} recipe={r} owner_id={cb.owner.owner_id} cookbook_id={cb.id} owner_name={cb.owner.owner_name} cookbook_title={cb.title}/>
        }))
    }
    

    render() {
        return (
            <CardGroup className="d-flex justify-content-center">{this.renderRecipes()}</CardGroup>
        )
    }

}

export default RecipeContainer