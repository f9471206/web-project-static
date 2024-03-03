import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import queryString from "query-string";
import ModalsLoginComponents from "./modals-login-components";
import ModalsRegisterComponents from "./modals-register-components";

function TagComponents({ setData }) {
  //tag Navbar
  const tag = [
    {
      id: 1,
      to: "/",
      icon: "fa-regular fa-comments",
      text: "全部文章",
    },
    {
      id: 2,
      to: "/code",
      icon: "fa-solid fa-code",
      text: "程式",
    },
    {
      id: 3,
      to: "/anime",
      icon: "fa-regular fa-comments",
      text: "動漫",
    },
    {
      id: 4,
      to: "/game",
      icon: "fa-solid fa-gamepad",
      text: "遊戲",
    },
    {
      id: 5,
      to: "/feel",
      icon: "fa-regular fa-comment",
      text: "心情",
    },
  ];
  const location = useLocation();
  const [parsed, setParsed] = useState({});
  useEffect(() => {
    setParsed(queryString.parse(location.search));
  }, [useLocation().search]);

  //登入 components
  const [modalLoginShow, setModalLoginShow] = useState(false);

  //註冊 components
  const [modalRegisterShow, setModalRegisterShow] = useState(false);

  return (
    <Col lg={2}>
      <div className="d-grid gap-2 mb-2">
        {localStorage.getItem("user") ? (
          <Link to={"/tweet"}>
            <Button variant="primary w-100 mb-1" size="sm">
              發表文章
            </Button>
          </Link>
        ) : (
          <Link
            onClick={() => {
              setModalLoginShow(true);
            }}
          >
            <Button variant="primary w-100 mb-1" size="sm">
              發表文章
            </Button>
          </Link>
        )}
      </div>
      <Nav defaultActiveKey="/" className="flex-column">
        {tag.map((list) => {
          return (
            <Link
              key={list.id}
              className="ms-2 mb-2"
              to={parsed.sort ? `${list.to}?sort=${parsed.sort}` : list.to}
              onClick={() => {
                setData(null);
              }}
            >
              <i className={list.icon}></i>
              <span className="ps-2">{list.text}</span>
            </Link>
          );
        })}
      </Nav>

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
    </Col>
  );
}

export default TagComponents;
