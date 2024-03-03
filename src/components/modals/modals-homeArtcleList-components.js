import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import MyFunction from "./myFunction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ModalsHomeArtcleListComponents({ data }) {
  return (
    <>
      {data &&
        data.map((d) => {
          return (
            <ListGroup key={d._id}>
              <ListGroup.Item
                id={d._id}
                action
                className="border-0 py-0 my-1 home-list"
              >
                <Row>
                  <Col className="align-self-center" xs="auto">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          <p className="m-0">
                            {`${d.author.username}
                             發表於 
                            ${MyFunction.changDate(d.date)}`}
                          </p>
                        </Tooltip>
                      }
                    >
                      {({ ref, ...triggerHandler }) => (
                        <div
                          id={d._id}
                          className="rounded-circle user_img "
                          {...triggerHandler}
                          variant="light"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Link to={`/user-profile/${d.author._id}`}>
                            <Image
                              ref={ref}
                              src={d.author.photo}
                              roundedCircle
                            />
                          </Link>
                        </div>
                      )}
                    </OverlayTrigger>
                  </Col>
                  <Col className="d-flex">
                    <Link
                      to={`/post/${d._id}`}
                      className="d-flex py-3 w-100 align-self-center dropdown-item"
                    >
                      <Col className="align-self-center">
                        <h5>{d.title}</h5>
                        <span>{MyFunction.time(d.date)}</span>
                      </Col>
                      <Col xs="auto">
                        <Badge
                          bg={MyFunction.tagBadge(d.tag).bg}
                          className="mx-3"
                        >
                          {MyFunction.tagBadge(d.tag).text}
                        </Badge>
                        <i className=" fa-regular fa-thumbs-up"></i>
                        <span className="ps-1 pe-3">{d.like.length}</span>
                        <i className="fa-regular fa-comment"></i>
                        <span className="ps-1">{d.reply.length}</span>
                      </Col>
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
    </>
  );
}

export default ModalsHomeArtcleListComponents;
