import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModalsLogoutComponents = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title
          className="w-100 text-center"
          id="example-modal-sizes-title-sm"
        >
          確認是否要登出?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="p-1">
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.onHide(false);
              }}
              className="w-100"
              variant="secondary"
            >
              保持登入
            </Button>
          </Col>
          <Col className="p-1">
            <Button
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("user");
                props.onHide(false);
                window.location.reload();
              }}
              className="w-100"
              variant="primary"
            >
              登出
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ModalsLogoutComponents;
