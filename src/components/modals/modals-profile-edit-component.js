import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import MemberService from "../../services/member.service";
import Spinner from "react-bootstrap/Spinner";
import ModalsUploadImage from "./modals-uploadImage";

function ProfileEditComponent(props) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(false);

  const handleSumbit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    MemberService.userProfileEdit(data)
      .then((d) => {
        setLoading(false);
        setStore(true);
      })
      .catch((err) => {
        console.log(err.response.data);
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          編輯個人資料
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSumbit} encType="multipart/form-data">
          <Row className="flex-column">
            <Col className="d-flex align-items-center flex-column mb-3">
              <Image
                className="profile-edit-photo shadow"
                src={image ? image : props.data.photo}
                roundedCircle
                thumbnail
              />
            </Col>
            <Col className="mb-3">
              <ModalsUploadImage setImage={setImage} />
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>名稱</Form.Label>
            <Form.Control
              defaultValue={props.data.username}
              type="text"
              placeholder="名稱"
              name="name"
              required
              disabled={(loading, store)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAbout">
            <Form.Label>簽名</Form.Label>

            <Form.Control
              defaultValue={props.data.about}
              name="about"
              type="text"
              placeholder="簽名"
              disabled={(loading, store)}
            />
          </Form.Group>

          {!store && (
            <Button
              className="mt-4 mb-1 w-100"
              variant="primary"
              size="sm"
              type="submit"
              disabled={loading}
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
              className="mt-4 mb-1 w-100"
              variant="success"
              size="sm"
              disabled={loading}
              onClick={props.onHide}
            >
              完成
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileEditComponent;
