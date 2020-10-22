import React from 'react'
import { Form } from 'react-bootstrap'

class ImageUploadForm extends React.Component {

    state = {
        image: {},
        description: ""
    }

    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }
        })
    }

    onChangeDesc = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    localSubmitHandler = (e) => {
        e.preventDefault()

        const form = new FormData()
        form.append("image", this.state.image)
        form.append("recipe_id", this.props.recipe_id)
        form.append("description", this.state.description)
        this.props.addPhoto(form)
        e.target.image.value = null
        this.setState({
            image: {},
            description: ""
        })
    }


    render() {
        return (
            <Form className=" w-50 mt-3" onSubmit={this.localSubmitHandler}>
                <Form.Label>Upload Image:</Form.Label>
                {/* <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input isValid />
                    <Form.File.Label data-browse="Add Image">
                        Find an image to upload...
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                </Form.File> */}
                <Form.Control type="file" name="image" onChange={this.onChange} />
                <Form.Label>Image Description:</Form.Label>
                <Form.Control value={this.state.description} type="text" name="description" onChange={this.onChangeDesc} />
                <Form.Control type="submit" />
            </Form>
        )
    }
}

export default ImageUploadForm