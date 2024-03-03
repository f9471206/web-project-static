import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import TweetService from "../services/tweet.service";
import ModalsLoading from "./modals/modals-loading";
import ModalsUploadImage from "./modals/modals-uploadImage";
import HomeService from "../services/home.service";
import Spinner from "react-bootstrap/Spinner";
import tweetService from "../services/tweet.service";

export const TweetComponents = () => {
  const [image, setImage] = useState(null);

  const handleSumbit = (e) => {
    setMsg(null);
    setModalShow(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    //發表文章
    if (!editData) {
      TweetService.postTweet(data)
        .then((d) => {
          setMsg("發表成功");
        })
        .catch((err) => {
          setModalShow(true);
          setMsg(err.response.data);
        });
    }
    //編輯文章
    if (editData) {
      tweetService
        .editPost(_id, data)
        .then((d) => {
          setMsg("發表成功");
        })
        .catch((err) => {
          setModalShow(true);
          setMsg(err.response.data);
        });
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const [msg, setMsg] = useState(null);

  //編輯文章ID
  const { _id } = useParams();
  const [editData, setEditData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [editImg, setEditImg] = useState("");
  useEffect(() => {
    setLoading(true);
    if (_id) {
      HomeService.getPost(_id)
        .then((d) => {
          if (
            //帳號與發文者不符
            d.data.author._id !=
            JSON.parse(localStorage.getItem("user")).user._id
          ) {
            navigate("/");
            return;
          }
          setEditImg(d.data.image);
          setEditData(d.data);
          setLoading(false);
          setTitleLength(d.data.title.length);
          setAreaLength(d.data.content.length);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  //標題字數
  const [titleLength, setTitleLength] = useState(0);
  const hamdleTitle = (e) => {
    setTitleLength(e.target.value.length);
  };

  //內容字數
  const [areaLength, setAreaLength] = useState(0);
  const handleArea = (e) => {
    setAreaLength(e.target.value.length);
  };

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success]);

  if (_id && loading) {
    // 當編輯先 loading 在顯示
    return (
      <Row>
        <Col className="text-center py-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Container className="p-3">
        <Form onSubmit={handleSumbit} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <h3>{_id ? "編輯文章" : "發表"}</h3>
            <hr />
            <Form.Label>標題</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="請輸入標題"
              required
              defaultValue={editData ? editData.title : ""}
              maxLength="50"
              onChange={hamdleTitle}
            />
            <p className="text-end text-secondary pt-1">{titleLength}/50</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Label>內容</Form.Label>
            <Form.Control
              name="content"
              placeholder="內文"
              as="textarea"
              rows={3}
              required
              defaultValue={editData ? editData.content : ""}
              onChange={handleArea}
              maxLength="500"
            />
            <p className="text-end text-secondary pt-1">{areaLength}/500</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
            <Form.Label>上傳圖片</Form.Label>
            <Row>
              <Col sm="6" className="my-2">
                <ModalsUploadImage setImage={setImage} editImg={editImg} />
              </Col>
              <Col sm="6" className="my-2">
                <div className="updataImage">
                  <Image
                    className="profile-edit-photo shadow"
                    src={image ? image : editData.image}
                    thumbnail
                  />
                </div>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group
            className="mb-3 w-50"
            controlId="exampleForm.ControlTextarea4"
          >
            <Form.Label>選擇標籤</Form.Label>
            <Form.Select
              name="tag"
              aria-label="Default select example"
              required
              defaultValue={editData ? editData.tag : ""}
            >
              <option value="" disabled hidden>
                請選擇...
              </option>
              <option value="1">程式</option>
              <option value="2">動漫</option>
              <option value="3">遊戲</option>
              <option value="4">心情</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="py-5 mt-3 mb-5 text-center"
            controlId="exampleForm.ControlTextarea4"
          >
            <Button variant="primary px-5 rounded-pill" size="lg" type="submit">
              {_id ? "儲存編輯" : "發表"}
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <ModalsLoading
        show={modalShow}
        msg={msg}
        onHide={() => setModalShow(false)}
        setSuccess={setSuccess}
      />
    </>
  );
};

export default TweetComponents;
