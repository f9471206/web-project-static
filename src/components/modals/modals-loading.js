import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import React from "react";

const ModalsLoading = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header className="border-0 pb-1" closeButton={props.msg}>
        {props.msg ? (
          ""
        ) : (
          <Modal.Title className="w-100" id="contained-modal-title-vcenter">
            <h4 className="text-center">上傳中...</h4>
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body className="text-center py-3">
        {props.msg ? (
          <h4>{props.msg}</h4>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        {props.msg && props.msg == "發表成功" ? (
          <Button
            variant="success w-100"
            onClick={() => {
              props.setSuccess(true);
            }}
          >
            確認
          </Button>
        ) : props.msg && props.msg != "" ? (
          <Button variant="danger w-100" onClick={props.onHide}>
            確認
          </Button>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsLoading;
