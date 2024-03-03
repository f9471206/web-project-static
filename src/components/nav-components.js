import ModalsLoginComponents from "./modals/modals-login-components";
import ModalsRegisterComponents from "./modals/modals-register-components";
import ModalsLogoutComponents from "./modals/modals-logout-components";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalsSearchComponents from "./modals/modals-search-components";
import HomeService from "../services/home.service";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../image/logo.svg";
import Image from "react-bootstrap/Image";

function OffcanvasExample() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  // 更新網頁主題的函數
  const updateTheme = () => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  };
  // 切換主題的函數
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  // 當 darkMode 的狀態改變時，更新主題並將狀態儲存到 localStorage
  useEffect(() => {
    updateTheme();
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 當瀏覽器開啟時，設定相應的主題
  useEffect(() => {
    updateTheme();
  }, []);

  //登入 components
  const [modalLoginShow, setModalLoginShow] = useState(false);

  //註冊 components
  const [modalRegisterShow, setModalRegisterShow] = useState(false);

  // //頭像 narbar
  // const [userNavbar, setUserNavber] = useState(false);

  //登出 components
  const [modalLogoutShow, setModalLogoutShow] = useState(false);

  //會員
  const [isUser, setIsUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  //搜尋
  const [searchData, setSearchData] = useState(null);
  //搜尋 bar
  const [showSearch, setSearch] = useState(false);
  const handleSearch = (e) => {
    searchAPI(e.target.value);
  };
  const searchAPI = debounce((text) => {
    setSearchData(null);
    if (!text) {
      setSearch(false);
      return;
    }
    setSearch(true);
    HomeService.search(text)
      .then((d) => {
        setSearchData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 600);

  function debounce(callback, time = 600) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, time);
    };
  }

  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary"
          sticky="top"
        >
          <Container>
            <Link to={"/"} className="navbar.Brand">
              <Image src={Logo} />
            </Link>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Link to={"/"} className="dropdown-item">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Image src={Logo} />
                  </Offcanvas.Title>
                </Link>
              </Offcanvas.Header>
              <Offcanvas.Body className="justify-content-end">
                <Form
                  className="d-flex flex-column position-relative me-2 justify-content-center search-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="搜尋"
                    className="me-3"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                  {showSearch && (
                    <div className="search-box bg-body shadow">
                      {searchData && (
                        <ModalsSearchComponents
                          searchData={searchData}
                          setSearchData={setSearchData}
                          setSearch={setSearch}
                        />
                      )}
                      {!searchData && (
                        <Spinner
                          className="m-3"
                          animation="border"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      )}
                    </div>
                  )}
                </Form>

                {darkMode ? (
                  <Button
                    variant="dark navbar-theme-btn "
                    onClick={handleThemeChange}
                    className="themeBtn"
                  >
                    <i className="fa-regular fa-moon fa-lg"></i>
                  </Button>
                ) : (
                  <Button
                    variant="light navbar-theme-btn"
                    onClick={handleThemeChange}
                    className="themeBtn"
                  >
                    <i className="fa-solid fa-sun fa-lg"></i>
                  </Button>
                )}
                {!isUser && (
                  <Nav className="justify-content-end">
                    <Nav.Link
                      className="align-self-center"
                      onClick={() => setModalRegisterShow(true)}
                    >
                      註冊
                    </Nav.Link>
                    <Nav.Link
                      className="align-self-center"
                      onClick={() => setModalLoginShow(true)}
                    >
                      登入
                    </Nav.Link>
                  </Nav>
                )}
                {isUser && (
                  <Nav className="justify-content-end ms-md-2  position-relative">
                    <Link
                      // 小裝置下顯示
                      to={`/user-profile/${isUser.user._id}`}
                      className="align-self-center d-md-none dropdown-item text-center"
                    >
                      個人資料
                    </Link>
                    <Nav.Link
                      // 小裝置下顯示
                      className="align-self-center d-md-none"
                      onClick={() => {
                        setModalLogoutShow(true);
                      }}
                    >
                      登出
                    </Nav.Link>
                    <Dropdown className="d-none d-md-block">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="navbar-user p-0 m-0 bg-transparent border-0"
                      >
                        {isUser.user.photo ? (
                          <Image src={isUser.user.photo} roundedCircle />
                        ) : (
                          <i className="fa-regular fa-circle-user"></i>
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end ">
                        <Link to={`/user-profile/${isUser.user._id}`}>
                          <Dropdown.Item as="button">
                            <i className="fa-regular fa-user"></i>
                            <span className="px-1">個人資料</span>
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          onClick={() => {
                            setModalLogoutShow(true);
                          }}
                          as="button"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                          <span className="px-1">登出</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
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
          <ModalsLogoutComponents
            show={modalLogoutShow}
            onHide={() => setModalLogoutShow(false)}
          />
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
