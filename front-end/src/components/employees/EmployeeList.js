import React, { Component } from "react";
import { Table } from "reactstrap";
import AddEmployeeModal from "./AddEmployeeModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class EmployeeList extends Component {
  render() {
    const employees = this.props.employees;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!employees || employees.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Oops, no one here yet</b>
              </td>
            </tr>
          ) : (
                employees.map(employee => (
              <tr key={employee.pk}>
                <td>{employee.eid}</td>
                <td>{employee.ename}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td align="center">
                  <AddEmployeeModal
                    create={false}
                    employee={employee}
                    resetState={this.props.resetState}
                  />
                  &nbsp;
                  &nbsp;
                  <ConfirmRemovalModal
                    pk={employee.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default EmployeeList;
