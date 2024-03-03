import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FooterComponents() {
  return (
    <Container>
      <Row>
        <Col className="py-5 fs-5 d-flex justify-content-center">
          <span>Tweet</span>
          <span className="px-2 ">
            <i className="fa-regular fa-copyright"></i> 練習用
          </span>
          |
          <span className="px-2">
            <i className="fa-brands fa-github"></i>
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default FooterComponents;
