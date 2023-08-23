import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete({ show, handleClose, confirmDeleteUser, user }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            The action can be undone. Are you sure wan to delete this user :{" "}
            {user.email}?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={confirmDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDelete;
