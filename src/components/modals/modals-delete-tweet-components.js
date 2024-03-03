import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TweetService from "../../services/tweet.service";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function ModalsDeleteTweetComponents(props) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleDelete = () => {
    setLoading(true);
    TweetService.deleteTweet(props._id)
      .then((d) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
          確認是否要刪除?
        </Modal.Title>
      </Modal.Header>
      {!loading ? (
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
                取消
              </Button>
            </Col>
            <Col className="p-1">
              <Button
                onClick={handleDelete}
                className="w-100"
                variant="primary"
              >
                確定刪除
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      ) : (
        <Row>
          <Col className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

export default ModalsDeleteTweetComponents;
