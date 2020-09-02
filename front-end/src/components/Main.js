import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import EmployeeList from "./EmployeeList";
import AddEmployeeModal from "./AddEmployeeModal";
import axios from "axios";
import API_URL from '../constants/Index';

class Main extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    this.resetState();
  }

  getEmployees = () => {
    axios.get(API_URL).then(res =>
      this.setState({
        employees: res.data
      })
    );
  };

  resetState = () => {
    this.getEmployees();
  };

  render() {
    return (
      <div className="Main">
        <div className="text-center">
          <h3 className="display-3 text-white bg-primary">XYZ Ltd - Employee List</h3>
        </div>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <EmployeeList
                employees={this.state.employees}
                resetState={this.resetState}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <AddEmployeeModal create={true} resetState={this.resetState} />
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default Main;
