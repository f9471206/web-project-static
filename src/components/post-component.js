import ModalsLoginComponents from "./modals/modals-login-components";
import ModalsRegisterComponents from "./modals/modals-register-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeService from "../services/home.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import def from "../image/userdef.svg";
import Placeholder from "react-bootstrap/Placeholder";
import { Link } from "react-router-dom";
import MyFunction from "./modals/myFunction";
import ReplyTweetComponents from "./modals/reply-tweet-components";
import ModalsShowDateComponents from "./modals/modals-showDate-components";
import ModalsHomeArtcleListReplysCompoments from "./modals/modals-homeArtcleListReplys-compoments";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ListGroup from "react-bootstrap/ListGroup";
import ModalsDeleteTweetComponents from "./modals/modals-delete-tweet-components";
import TweetService from "../services/tweet.service";
import Spinner from "react-bootstrap/Spinner";

const PostComponent = () => {
  //網址的_ID
  const { _id } = useParams();

  let [data, setData] = useState("");

  useEffect(() => {
    HomeService.getPost(_id)
      .then((d) => {
        setData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [useParams()]);

  //登入用戶 ID
  const [user_ID, setUser_ID] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser_ID(JSON.parse(localStorage.getItem("user")).user._id);
    }
  }, []);

  //確定刪除
  const [modalDelete, setModalDelete] = useState(false);

  const popover = (
    <Popover id="popover-basic" className="shadow">
      <ListGroup>
        <Link to={`/tweet-edit/${data ? data._id : ""}`}>
          <ListGroup.Item className="py-2 px-4 fs-6" action>
            編輯
          </ListGroup.Item>
        </Link>
        <ListGroup.Item
          className="py-2 px-4 fs-6"
          action
          onClick={() => {
            setModalDelete(true);
          }}
        >
          刪除
        </ListGroup.Item>
      </ListGroup>
    </Popover>
  );
  //登入 components
  const [modalLoginShow, setModalLoginShow] = useState(false);

  //註冊 components
  const [modalRegisterShow, setModalRegisterShow] = useState(false);

  const [loading, setLoading] = useState(false);
  //按讚文章
  const handleLikePost = () => {
    if (!user_ID) {
      setModalLoginShow(true);
      return;
    }
    setLoading(true);
    //like 確認是否按讚過
    let like = data.like.includes(user_ID);
    TweetService.tweetLike(_id, like)
      .then((d) => {
        setLoading(false);
        setData(d.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    // 標題
    <>
      {data && (
        <>
          <Container
            fluid
            className={`bg-${MyFunction.tagBadge(data.tag).bg} p-3`}
          >
            <Row>
              <Col className="d-flex justify-content-center">
                <Badge bg="light" text="dark">
                  {MyFunction.tagBadge(data.tag).text}
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center pt-3">
                <h3 className="text-light">{data.title}</h3>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row className="py-4 align-items-center">
              <Col xs="auto">
                <Link to={`/user-profile/${data.author._id}`}>
                  <div className="post_user_img">
                    <Image src={data.author.photo} roundedCircle />
                  </div>
                </Link>
              </Col>
              <Col>
                <span className="pe-2">{data.author.username}</span>
                <ModalsShowDateComponents date={data.date} />
                <Col xs="auto">
                  <span className="pe-2">1樓</span>
                </Col>
              </Col>

              {user_ID && user_ID == data.author._id && (
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={popover}
                  style={{ cursor: "pointer" }}
                >
                  <Col xs="auto" style={{ cursor: "pointer" }}>
                    <i className="px-2 fa-solid fa-ellipsis fa-lg"></i>
                  </Col>
                </OverlayTrigger>
              )}
            </Row>
            <Row>
              <Col className="pb-3">{data.content}</Col>
            </Row>
            {data.image && (
              <Row className="mb-4">
                <Col>
                  <Image fluid src={data.image} />
                </Col>
              </Row>
            )}

            <Row className="mb-5">
              <Col className="fs-5 d-flex align-items-center">
                <span>
                  {data.like.includes(user_ID) && (
                    // 已按讚
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <i
                          onClick={handleLikePost}
                          className="p-2 fa-solid fa-thumbs-up like text-primary"
                        ></i>
                      )}
                    </div>
                  )}
                  {!data.like.includes(user_ID) && (
                    // 未按讚
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <i
                          onClick={handleLikePost}
                          className="p-2 fa-regular fa-thumbs-up like"
                        ></i>
                      )}
                    </div>
                  )}
                </span>
                <span
                  className={`ps-1 pe-3 ${
                    data.like.includes(user_ID) ? "text-primary" : ""
                  }`}
                >
                  {data.like.length}
                </span>
                <i className="p-2 fa-regular fa-comment"></i>
                <span className="ps-1">{data.reply.length}</span>
              </Col>
            </Row>
            <ReplyTweetComponents setData={setData} />
            <ModalsHomeArtcleListReplysCompoments
              data={data.reply}
              post_id={data._id}
              setData={setData}
            />
          </Container>
          <ModalsDeleteTweetComponents
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            _id={_id}
          />
        </>
      )}
      {/* loading  */}
      {!data && (
        <Container>
          <Row className="py-4 align-items-center">
            <Col xs="auto">
              <Placeholder className="m-0" as="p" animation="glow">
                <Placeholder
                  className="rounded-circle "
                  style={{ width: "65px", height: "65px" }}
                  xs={2}
                />
              </Placeholder>
            </Col>
            <Col>
              <Placeholder className="mb-2" as="p" animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
              <Placeholder className="mb-2" as="p" animation="glow">
                <Placeholder xs={1} />
              </Placeholder>
            </Col>
          </Row>
          <Row>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
          </Row>
        </Container>
      )}
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
};

export default PostComponent;
