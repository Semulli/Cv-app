import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CvModal({ show, onHide, data }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="cv-modal"
      className="text-center"
      centered
      animation={true}
    >
      <Modal.Header>
        <Modal.Title id="cv-modal">CV Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data ? (
          <div>
            <img
              src={data.imgUrl}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <br /> <br />
            <p>
              <strong>Full Name:</strong> {data.fullName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phoneNumber}
            </p>
          </div>
        ) : (
          <p>No Data Available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} onAnimationEnd={true}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CvModal;
