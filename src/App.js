import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import {Route, Switch} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Header from './Components/Header'
import WelcomeContainer from './Containers/WelcomeContainer'
import CookBookContainer from './Containers/CookBookContainer'
import Home from './Components/Home'

const usersURL = "http://localhost:3000/users/"

class App extends React.Component {
    state ={
        currentUser: {}
    }


    logoutUser = () => {
      this.setState({currentUser: {}})
    }

    loginUser = ({username}) => {
      console.log("before fetch, ", username)

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({username})
      }

      fetch(usersURL, options)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          currentUser: user
          })
      })
    }

    componentsToRender = () => {
      console.log(`${this.state.currentUser.username}`)

        if(this.state.currentUser.username){
            return (
              <div>
                  <Header />
                  <NavBar logout={this.logoutUser} user={this.state.currentUser}/>
                  <Route exact path='/' render={() => <Home user={this.state.currentUser} />} />
                  <Route path={`/user/${this.state.currentUser.id}/cookbooks`} render={() => <CookBookContainer owned={this.state.currentUser.owned_cookbooks} followed={this.state.currentUser.followed_cookbooks} /> } />
              </div>
            )
        } else {
            return (
              <div>
                <Header />
                <WelcomeContainer login={this.loginUser}/>
              </div>
            )
        }
    }
    
  render() {
    return (
      <div>
        {this.componentsToRender()}
      </div>
    );
  }

}

export default App;