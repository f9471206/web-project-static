import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import MemberService from "../../services/member.service";
import Spinner from "react-bootstrap/Spinner";
import ModalsUploadImage from "./modals-uploadImage";

const ModalsProfileBg = (props) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target).entries());
    MemberService.userProfileBg(data)
      .then((d) => {
        setLoading(false);
        setStore(true);
      })
      .catch((err) => {
        setMsg(err.response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setStore(false);
  }, [props.onHide]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Card className="text-white border-0 user-bg-div">
        <Card.Img
          className="user-background"
          src={!image ? props.data.bg : image}
        />
        <Card.ImgOverlay className="user-img-overlay d-flex align-items-end  text-center">
          <Container>
            <Row>
              <Col className="align-self-end" sm="auto">
                <Image
                  className="user-photo shadow"
                  src={props.data.photo}
                  roundedCircle
                  thumbnail
                />
              </Col>
              <Col
                className="d-flex flex-column mt-3 align-self-end user-conter"
                sm="auto"
              >
                <h3>username</h3>
                <Col>
                  <i className="fa-regular fa-address-card"></i>
                  <span className="mx-2">about</span>
                </Col>
              </Col>
            </Row>
          </Container>
        </Card.ImgOverlay>
      </Card>
      <Modal.Header className="position-absolute w-100 border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">修改背景</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSumbit} encType="multipart/form-data">
          <ModalsUploadImage setImage={setImage} />
          <Col className="text-center">
            {!store && (
              <Button
                variant="primary w-50 mt-3"
                size="lg"
                type="submit"
                disabled={!image || loading}
              >
                儲存
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="ms-1"
                  />
                )}
              </Button>
            )}
            {store && (
              <Button
                variant="success w-50 mt-3"
                size="lg"
                type="button"
                onClick={props.onHide}
              >
                完成
              </Button>
            )}
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalsProfileBg;
