import React from 'react'
import {ListGroup, Button, InputGroup, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class CommentsContainer extends React.Component {

    state={
        content: "",
        user_id: this.props.user_id,
        recipe_id: this.props.recipe_id
    }

    changeHandler = (e) => {
        this.setState({content: e.target.value})
    }

    renderComments = () => {
        return this.props.comments.map((comment, index) => <ListGroup.Item key={index}>{`${comment.commenter}: ${comment.content}`}</ListGroup.Item>)        
    }
    
    localClickHandler = () => {
        
        this.props.clickHandler(this.state)
        this.setState({
            content: ""
        })
    }

    renderNewComment = () => {
        return (
            <div>
            <InputGroup>
                <FormControl value={this.state.content} onChange={this.changeHandler} as="textarea" aria-label="With textarea" />
            </InputGroup>
            <Button onClick={this.localClickHandler}>Add Comment</Button>
            </div>
        )
    }

    render(){
        return (
            <ListGroup >
                {this.renderComments()}
                {this.renderNewComment()}
            </ListGroup>
        )
    }
}

export default CommentsContainer