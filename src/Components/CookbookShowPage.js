import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'

const CookbookShowPage = props => {
    console.log(props)
    return (
        <Container>
        <div>{props.cookbook.title}</div>
        </Container>
        
    )
}

export default CookbookShowPage