import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import TweetService from "../../services/tweet.service";
import Spinner from "react-bootstrap/Spinner";

function ModalsReplyEditComponents({
  _id,
  post_id,
  content,
  name,
  setData,
  ...props
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const handleSumbit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    TweetService.replyEdit(data, post_id, _id)
      .then((d) => {
        setData(d.data);
        setLoading(false);
        setShow(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  return (
    <>
      <ListGroup.Item className="py-2 px-4 fs-6" action onClick={handleShow}>
        編輯
      </ListGroup.Item>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "2000" }}
      >
        <Offcanvas.Header className="pb-0" closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <Form onSubmit={handleSumbit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>編輯評論</Form.Label>
              <Form.Control
                name="reply"
                as="textarea"
                rows={3}
                required
                defaultValue={content}
              />
            </Form.Group>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Button variant="primary" type="submit">
                儲存
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ModalsReplyEditComponents;
