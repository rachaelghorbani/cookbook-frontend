import React from 'react'
import {Form} from 'react-bootstrap'

class ImageUploadForm extends React.Component{

    state={
        image: {},
        recipe_id: this.props.recipe_id
    }

    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }
        })
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("image", this.state.image)
        form.append("recipe_id", this.state.recipe_id)
        this.props.addPhoto(form)
        this.setState({image: {}})
    }


    render(){
        return(
            <Form onSubmit={this.localSubmitHandler}>
                <Form.Label>Upload Image:</Form.Label>
                <Form.Control type="file" name="image" onChange={this.onChange} />
                <Form.Control type="submit"/>
            </Form>
        )
    }
}

export default ImageUploadForm