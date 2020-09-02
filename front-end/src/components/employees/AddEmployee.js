import React, {Component} from 'react';
import axios from "axios";
import API_URL from '../../constants/Index';
import {Redirect} from 'react-router-dom';

class AddEmployee extends Component{
  state = {
    pk : 0,
    eid : "",
    ename : "",
    email : "",
    phone : ""
  };

  componentDidMount(){
    if(this.props.employee){
      const { pk, eid, ename, email, phone } = this.props.employee;
      this.setState({ pk , eid, ename, email, phone });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  };

  addEmployee = (e) => {
    e.preventDefault();
    try{
      axios.post(API_URL, this.state, {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
      }).then(() => {
        this.props.resetState();
        this.props.toggle();
      });
    }
    catch{
      return(
        <Redirect to='http://localhost:3000/'/>
      );
    }
  };

  editEmployee = (e) => {
    e.preventDefault();
    try{
      axios.put(API_URL + this.state.pk + "/", this.state,
        { headers: {Authorization: `JWT ${localStorage.getItem('token')}` }})
        .then(() => {
        this.props.resetState();
        this.props.toggle();
      });
    }
    catch(err){
      return(
        <Redirect to='http://localhost:3000/'/>
      );
    }
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render(){
    var btn_name = "Add";
    if(this.props.employee){
      btn_name = "Update";
    }
    return(
      <form onSubmit = { this.props.employee ? this.editEmployee : this.addEmployee } className="needs-validation" novalidate>
        <div className = "form-group">
          <label for="eid">Emp ID:</label>
          <input
            className="form-control"
            type="text"
            name="eid"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.eid)}
            required
          />
        </div>
        <div className = "form-group">
          <label for="ename">Name:</label>
          <input
            className="form-control"
            type="text"
            name="ename"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.ename)}
            required
          />
        </div>
        <div className = "form-group">
          <label for="email">Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
            required
          />
          <div className="valid-feedback">Looks good! </div>
        </div>
        <div className = "form-group">
          <label for="phone">Phone:</label>
            <input
              className="form-control"
              pattern = "[1-9]{1}[0-9]{9}"
              type="text"
              name="phone"
              value={this.defaultIfEmpty(this.state.phone)}
              onChange={this.onChange}
              required
              />
        </div>
        <button type="submit" className="btn btn-primary float-right">{btn_name}</button>
      </form>
    );
  }
}

export default AddEmployee;
