import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookbookCard from '../Components/CookbookCard'
import { CardGroup } from 'react-bootstrap';


class CookBookContainer extends React.Component {

    renderOwnedCookbooks = () => {
        if (this.props.owned.length > 0) {
            console.log("Owned Cookbooks: ", this.props.owned)
            return this.props.owned.map(cb => <CookbookCard cookbook={cb} />)
        }
    }

    renderFollowedCookbooks = () => {
        if(this.props.followed.length > 0) {
            console.log("Followed Cookbooks: ", this.props.followed)
            return this.props.followed.map(cb => <CookbookCard cookbook={cb} followed={true}/>)
        }
    }
    
	render() {
		return (
			<div className="cookbooks-container">
                <CardGroup>
                    {this.renderOwnedCookbooks()}
                    {this.renderFollowedCookbooks()}
                </CardGroup>
			</div>
		);
	}
}

export default CookBookContainer;
