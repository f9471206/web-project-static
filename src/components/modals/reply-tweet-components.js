import React from "react";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TweetService from "../../services/tweet.service";
import { useNavigate, useParams } from "react-router-dom";
import ModalsLoading from "./modals-loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalsLoginComponents from "./modals-login-components";
import ModalsRegisterComponents from "./modals-register-components";

function ReplyTweetComponents({ setData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { _id } = useParams();

  const navigate = useNavigate();

  const handleSumbit = (e) => {
    setMsg(null);
    setModalShow(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    TweetService.replyTweet(data, _id)
      .then((d) => {
        navigate(`/post/${_id}`);
        setShow(false);
        setModalShow(false);
      })
      .catch((err) => {
        setModalShow(true);
        setMsg(err.response.data);
      });
  };

  //留言Modal
  const [modalShow, setModalShow] = useState(false);
  const [msg, setMsg] = useState(null);

  //登入 components
  const [modalLoginShow, setModalLoginShow] = useState(false);

  //註冊 components
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  return (
    <>
      <Container className="my-3">
        <Row>
          {localStorage.getItem("user") ? (
            <Col className="p-3 reply-border " onClick={handleShow}>
              <span>發表評論</span>
            </Col>
          ) : (
            <Col
              className="p-3 reply-border "
              onClick={() => {
                setModalLoginShow(true);
              }}
            >
              <span>發表評論</span>
            </Col>
          )}
        </Row>
      </Container>
      <Offcanvas
        className="shadow"
        show={show}
        onHide={handleClose}
        placement="bottom"
        scroll={true}
        backdrop={false}
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
              <Form.Label>發表你的評論吧</Form.Label>
              <Form.Control name="reply" as="textarea" rows={3} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              送出
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <ModalsLoading
        show={modalShow}
        msg={msg}
        onHide={() => setModalShow(false)}
      />
      <ModalsLoginComponents
        show={modalLoginShow}
        changemadals={setModalRegisterShow}
        onHide={setModalLoginShow}
      />
      <ModalsRegisterComponents
        show={modalRegisterShow}
        onHide={setModalRegisterShow}
        changemadals={setModalLoginShow}
      />
    </>
  );
}

export default ReplyTweetComponents;
