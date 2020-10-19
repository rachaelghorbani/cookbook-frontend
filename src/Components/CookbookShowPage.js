import React from 'react'

const CookbookShowPage = props => {
    console.log(props)
    return (
        <div>{props.cookbook.title}</div>
        
    )
}

export default CookbookShowPage