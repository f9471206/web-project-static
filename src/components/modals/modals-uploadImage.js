import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function ModalsUploadImage({ setImage, editImg }) {
  useEffect(() => {
    setImage(null);
  }, []);
  return (
    <Container className="overflow-hidden">
      <Row className="text-center uploadRow">
        <Col xs="12">
          <Card.Body className="position-relative">
            <div
              onClick={() => {
                document.querySelector(".uploadRow").style.transform =
                  "translateX(-100%)";
                document.querySelector('input[name="image"]').value = null;
                setImage(null);
              }}
              className="back_right"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label className="mb-3">瀏覽或拖曳圖片</Form.Label>
              <Form.Control
                name="image"
                className="uploadImgInput"
                type="file"
                size="lg"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                tabIndex="-1"
              />
            </Form.Group>
          </Card.Body>
        </Col>
        <Col className="d-flex" xs="6">
          <Card className="w-100">
            <Card.Body
              className="uploadImg_pointer"
              onClick={() => {
                document.querySelector(".uploadRow").style.transform =
                  "translateX(0)";
              }}
            >
              <div>
                <p>上傳圖片</p>
                <i className="fa-solid fa-cloud-arrow-up  fa-2xl"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex" xs="6">
          <Card className="w-100">
            <Card.Body
              className="uploadImg_pointer"
              onClick={() => {
                document.querySelector(".uploadRow").style.transform =
                  "translateX(-200%)";
              }}
            >
              <div>
                <p>網址連結</p>
                <i className="fa-solid fa-link fa-2xl"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12">
          <Card.Body className="position-relative d-flex h-100 justify-content-center">
            <div
              className="back_left"
              onClick={() => {
                document.querySelector(".uploadRow").style.transform =
                  "translateX(-100%)";
                document.querySelector('input[name="URL_image"]').value = null;
                setImage(null);
              }}
            >
              <i className="fa-solid fa-angle-left"></i>
            </div>
            <Form.Group
              className="mb-3 align-self-center w-100"
              controlId="linkForm.ControlInput1"
            >
              <Form.Label>網址連結</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                defaultValue={editImg}
                type="text"
                placeholder="https://"
                name="URL_image"
                tabIndex="-1"
              />
            </Form.Group>
          </Card.Body>
        </Col>
        {/* 圖片上傳 */}
      </Row>
    </Container>
  );
}

export default ModalsUploadImage;
