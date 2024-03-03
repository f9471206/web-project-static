import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";

function ModalsPlaceholderComponents() {
  return Array(5)
    .fill()
    .map((_, i) => (
      <ListGroup key={i}>
        <ListGroup.Item className="border-0  my-1 py-3 home-list  position-relative">
          <Row>
            <Col xs="auto">
              <Placeholder className="m-0" as="p" animation="glow">
                <Placeholder
                  className="rounded-circle placeholder-img"
                  xs={2}
                />
              </Placeholder>
            </Col>
            <Col className="align-self-center">
              <Placeholder className="mb-2" as="p" animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
              <Placeholder className="m-0" as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </Col>
            <Col xs="auto">
              <i className=" fa-regular fa-thumbs-up"></i>
              <span className="ps-1 pe-3"></span>
              <i className="fa-regular fa-comment"></i>
              <span className="ps-1"></span>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    ));
}

export default ModalsPlaceholderComponents;
