import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEmployee from "./AddEmployee";

class AddEmployeeModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;
    var title = "Editing Employee";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Adding New Employee";
      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Add New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <AddEmployee
              resetState={this.props.resetState}
              toggle={this.toggle}
              employee={this.props.employee}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default AddEmployeeModal;
