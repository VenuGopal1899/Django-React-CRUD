import React from 'react';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    confirmpassword: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className="Signup container col-lg-6 col-md-6">
        <h4 className="text-center display-4">Sign up</h4>
        <form onSubmit={e => this.props.handle_signup(e, this.state)}>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange = {this.handle_change}
              placeholder="Enter Username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange = {this.handle_change}
              placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;

Signup.propTypes = {
  handle_signup: PropTypes.func.isRequired
};