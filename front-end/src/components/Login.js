import React, {Component} from 'react';
import {Message} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class Login extends Component{
  state = {
    username : "",
    password : "",
    error : false,
    redirect : null
  };

  handleSubmit = e => {
    e.preventDefault();
    const {username, password} = this.state;

    this.setState({
      error : false,
      redirect : "/employees-list"
    });

    if( !(username === 'venu') || !(password === 'user1234')){
      return this.setState({
        error : true,
        redirect : null
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  render(){
    const error = this.state.error;
    if(this.state.redirect){
      return(
        <Redirect to={this.state.redirect} />
      );
    }
    return(
      <div className="Login container col-lg-6 col-md-6">
        <h4 className="text-center display-4">Login</h4>
        <form onSubmit = {this.handleSubmit}>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange = {this.handleChange}
              placeholder="Enter Username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange = {this.handleChange}
              placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {error && <Message error={error} className="error text-center font-weight-bold text-danger" content="Username/Password is incorrect. Try again!"/>}
      </div>
    )};
}

export default Login;
