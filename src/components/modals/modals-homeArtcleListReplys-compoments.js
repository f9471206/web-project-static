import ModalsLoginComponents from "./modals-login-components";
import ModalsRegisterComponents from "./modals-register-components";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import ModalsShowDateComponents from "./modals-showDate-components";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import MyFunction from "./myFunction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ModalsReplyEditComponents from "./modals-reply-edit-components";
import tweetService from "../../services/tweet.service";
import ModalsDeleteTweetComponents from "./modals-delete-reply-component";
import Spinner from "react-bootstrap/Spinner";

function ModalsHomeArtcleListReplysCompoments({
  post_id,
  data,
  setData,
  _id,
  profile,
}) {
  //登入用戶 ID
  const [user_ID, setUser_ID] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser_ID(JSON.parse(localStorage.getItem("user")).user._id);
    }
  }, []);

  //確定刪除
  const [modalDelete, setModalDelete] = useState(false);

  //登入 components
  const [modalLoginShow, setModalLoginShow] = useState(false);

  //註冊 components
  const [modalRegisterShow, setModalRegisterShow] = useState(false);

  const [loading, setLoading] = useState(false);

  //確認哪一個留言要 loading
  const [checkReply, setCheckReply] = useState();
  //留言按讚
  const handleLikeReply = (d) => {
    if (!user_ID) {
      setModalLoginShow(true);
      return;
    }
    setLoading(true);
    setCheckReply(d._id);
    //like 確認是否按讚過
    let like = d.like.includes(user_ID);
    tweetService
      .replyLike(post_id, d._id, like)
      .then((d) => {
        setLoading(false);
        setData(d.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  //_id 用戶 ID
  return (
    <div className="mb-5">
      {data &&
        // 文章內留言
        !profile &&
        data.map((d, index) => {
          return (
            <div key={d._id}>
              <Row>
                <Row key={d._id} className="py-4 align-items-center">
                  <Col xs="auto">
                    <Link to={`/user-profile/${d.user._id}`}>
                      <div className="post_user_img">
                        <Image src={d.user.photo} roundedCircle />
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Col>
                      <span className="pe-2">{d.user.username}</span>
                      <ModalsShowDateComponents date={d.date} />
                      <Col xs="auto">
                        <span className="pe-2">{index + 2}樓</span>
                      </Col>
                    </Col>
                  </Col>
                  {user_ID && user_ID == d.user._id && (
                    <Col xs="auto" style={{ cursor: "pointer" }}>
                      <OverlayTrigger
                        trigger="click"
                        key="left"
                        placement="left"
                        overlay={
                          <Popover id={`popover-positioned-left`}>
                            <ListGroup>
                              <ModalsReplyEditComponents
                                placement="bottom"
                                _id={d._id}
                                post_id={post_id}
                                content={d.content}
                                setData={setData}
                              />

                              <ListGroup.Item
                                className="py-2 px-4 fs-6"
                                action
                                onClick={() => {
                                  setModalDelete(true);
                                }}
                              >
                                刪除
                              </ListGroup.Item>
                              <ModalsDeleteTweetComponents
                                show={modalDelete}
                                onHide={() => setModalDelete(false)}
                                post_id={post_id}
                                reply_id={d._id}
                              />
                            </ListGroup>
                          </Popover>
                        }
                      >
                        <i className="px-2 fa-solid fa-ellipsis fa-lg"></i>
                      </OverlayTrigger>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col className="pb-3 ">{d.content}</Col>
                </Row>
                <Row>
                  <Col className="fs-5 d-flex align-items-center">
                    {/* 已按讚 */}
                    {d.like.includes(user_ID) && (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {loading && checkReply == d._id ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <i
                            onClick={() => handleLikeReply(d)}
                            className="p-2 fa-solid fa-thumbs-up like text-primary"
                          ></i>
                        )}
                      </div>
                    )}
                    {/* 未按讚 */}
                    {!d.like.includes(user_ID) && (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {loading && checkReply == d._id ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <i
                            onClick={() => handleLikeReply(d)}
                            className="p-2 fa-regular fa-thumbs-up like"
                          ></i>
                        )}
                      </div>
                    )}
                    <span
                      className={`ps-1 pe-3 ${
                        d.like.includes(user_ID) ? "text-primary" : ""
                      }`}
                    >
                      {d.like.length}
                    </span>
                  </Col>
                </Row>
              </Row>
              <hr className="my-3" />
            </div>
          );
        })}

      {data &&
        // 個人資料內留言
        profile &&
        data.map((da) => {
          return (
            <div key={da._id}>
              <ListGroup className="mt-4">
                <Link to={`/post/${da._id}`}>
                  <ListGroup.Item
                    className={`bg-${MyFunction.tagBadge(da.tag).bg}`}
                    style={{ borderRadius: "10px" }}
                  >
                    <span className="text-light">於 {da.title}</span>
                    <Badge
                      text={MyFunction.tagBadge(da.tag).bg}
                      bg="light"
                      className="mx-3"
                    >
                      {MyFunction.tagBadge(da.tag).text}
                    </Badge>
                  </ListGroup.Item>
                </Link>
              </ListGroup>
              {da.reply.map((d) => {
                if (d.user._id != _id) return;
                return (
                  <Row
                    className={`ms-4 border-${MyFunction.tagBadge(da.tag).bg}`}
                    style={{ borderLeft: "1px solid" }}
                    key={d._id}
                  >
                    <Row key={d._id} className="py-4 align-items-center">
                      <Col xs="auto">
                        <Link to={`/user-profile/${d.user._id}`}>
                          <div className="post_user_img">
                            <Image src={d.user.photo} roundedCircle />
                          </div>
                        </Link>
                      </Col>
                      <Col>
                        <span className="pe-2">{d.user.username}</span>
                        <ModalsShowDateComponents date={d.date} />
                        <Col xs="auto"></Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pb-3 ">{d.content}</Col>
                    </Row>
                    <Row>
                      <Col className="fs-5">
                        <i className=" fa-regular fa-thumbs-up"></i>
                        <span className="ps-1 pe-3">{d.like.length}</span>
                      </Col>
                    </Row>
                  </Row>
                );
              })}
            </div>
          );
        })}
      {data == "" && <div className="text-center p-5">暫時還沒有評論</div>}
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
    </div>
  );
}

export default ModalsHomeArtcleListReplysCompoments;
