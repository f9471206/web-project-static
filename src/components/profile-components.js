import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";
import Nav from "react-bootstrap/Nav";
import MemberService from "../services/member.service";
import { useParams, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ProfileEditComponent from "./modals/modals-profile-edit-component";
import ProfileBg from "./modals/modals-profile-bg";
import Spinner from "react-bootstrap/Spinner";
import ModalsProfilecontentComponents from "./modals/modals-profilecontent-components";

function ProfileComponents() {
  const { _id } = useParams();

  const [data, setData] = useState("");
  useEffect(() => {
    MemberService.userProfile(_id)
      .then((d) => {
        setData(d.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [useParams()]);

  //編輯個人資料
  const [modalEditShow, setModalEditShow] = React.useState(false);

  //編輯背景圖
  const [modalBgShow, setModalBgShow] = React.useState(false);
  return (
    <>
      {data && (
        <>
          <Card className="text-white border-0 user-bg-div">
            {data.bg && <Card.Img className="user-background" src={data.bg} />}
            <Card.ImgOverlay className="user-img-overlay d-flex align-items-end  text-center">
              <Container>
                <Row>
                  <Col className="align-self-end" sm="auto">
                    <Image
                      className="user-photo shadow"
                      src={data.photo}
                      roundedCircle
                      thumbnail
                    />
                  </Col>
                  <Col
                    className="d-flex flex-column mt-3 align-self-end user-conter"
                    sm="auto"
                  >
                    <h3>{data.username}</h3>
                    <Col>
                      <i className="fa-regular fa-address-card"></i>
                      <span className="mx-2">{data.about}</span>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </Card.ImgOverlay>
          </Card>
          <Container className="my-2">
            <Row>
              <Nav>
                <Nav.Item className="m-2">
                  <Link to={`/user-profile/${_id}`}>
                    <i className="fa-regular fa-comments"></i>
                    <span className="ps-2">文章</span>
                  </Link>
                </Nav.Item>
                <Nav.Item className="m-2">
                  <Link to={`/user-profile/${_id}/replys`}>
                    <i className="fa-regular fa-message"></i>
                    <span className="ps-2">回覆</span>
                  </Link>
                </Nav.Item>
                <Col className="d-flex justify-content-end align-items-center">
                  {JSON.parse(localStorage.getItem("user")) &&
                    JSON.parse(localStorage.getItem("user")).user._id ==
                      data._id && (
                      <DropdownButton
                        id="dropdown-basic-button"
                        variant=""
                        title="編輯 "
                      >
                        <Dropdown.Item onClick={() => setModalEditShow(true)}>
                          編輯個人資料
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setModalBgShow(true)}>
                          修改背景圖
                        </Dropdown.Item>
                      </DropdownButton>
                    )}
                </Col>
              </Nav>
            </Row>
            <Row>
              <ModalsProfilecontentComponents _id={_id} />
            </Row>
            <ProfileEditComponent
              data={data}
              show={modalEditShow}
              onHide={() => setModalEditShow(false)}
            />
            <ProfileBg
              data={data}
              show={modalBgShow}
              onHide={() => setModalBgShow(false)}
            />
          </Container>
        </>
      )}
      {!data && (
        <Col className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      )}
    </>
  );
}

export default ProfileComponents;
