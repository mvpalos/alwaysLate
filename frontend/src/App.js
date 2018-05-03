import React, { Component } from 'react';
import './App.css';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Feed from './Feed';
import Register from './Register';

class App extends Component {
  render() {
    let submitType ={
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '15px'
  }
    return (
      <div className="App">
        <Route exact path="/" render={(props)=><Home history={props.history}/>} />
        <Route path="/feed" component={Feed} />
        <Route path="/register" component={Register} />
        <Route path="*" render={() => <Redirect to="/" />} />


      </div>
    );
  }
}

export default withRouter(App);
