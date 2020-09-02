import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path = "/" component = {Login} />
            <Route path = "/employees-list" component = {Main} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
