import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import Main from './components/employees/Main';
import LoginForm from './components/accounts/Login';
import Signup from './components/accounts/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            username: json.username,
            displayed_form: <Main />
          });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    try{
      fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(json => {
        console.log(json.token)
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: <Main />,
          username: json.username
        });
      });
    }
    catch(err){
      this.setState({
        logged_in: false,
        displayed_form: '',
        username : ''
      })
    }
  };

  handle_signup = (e, data) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    e.preventDefault();
    axios.post('http://localhost:8000/core/users/', data, {
      headers: headers
    }).then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: <Main />,
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '', displayed_form : <Main/>, });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    var form;
    if(this.state.displayed_form === 'login')
        form = <LoginForm handle_login={this.handle_login} />;
    else if(this.state.displayed_form === 'signup')
      form = <Signup handle_signup={this.handle_signup} />;
    else if(this.state.logged_in)
      form = <Main/>;
    else
      form = '';

    var check = !this.state.logged_in ;
    return (
      <div className="app">
        { check &&
          <LoginForm
          handle_login={this.handle_login}
          display_form={this.display_form}
          handle_logout = {this.handle_logout}
          />
        }
        {form}
      </div>

    );
  }
}

export default App;
