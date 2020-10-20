import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

const SearchRecipesFromCookbook = () => {
	return (
        <>
            <Col className="w-100 h-100 d-flex justify-content-end align-items-center pr-0">
                <label className="mb-0 mr-1">Category To Search:</label>
                <select className="h-100">
                    <option value="title">Title</option>
                    <option value="ingredient">Ingredient</option>
                </select>
            </Col>
            <Col className="p-0">
                <div className="md-form mt-0 w-100 ">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </Col>
        </>
           
		
	);

};

export default SearchRecipesFromCookbook;
