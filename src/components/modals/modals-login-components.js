import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import MemberService from "../../services/member.service";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const ModalsLoginComponents = (props) => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(false);
    setIsLoading(true);
    MemberService.login(user, pwd)
      .then((d) => {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(d.data));
        window.location.reload();
      })
      .catch((e) => {
        setErrMsg(e.response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setErrMsg(false);
    setUser("");
  }, [props]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen="sm-down"
      backdrop="static"
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title className="w-100" id="contained-modal-title-vcenter">
          <h2 className="text-center m-0">登入</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="信箱"
            className="mb-3"
          >
            <Form.Control
              required="required"
              type="email"
              placeholder="name@example.com"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              disabled={isLoading}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-2"
            controlId="floatingPassword"
            label="密碼"
          >
            <Form.Control
              required="required"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              disabled={isLoading}
            />
          </FloatingLabel>
          <div className="d-grid gap-2 mb-1">
            {errMsg && <Alert variant="danger">{errMsg}</Alert>}
            <span>忘記密碼?</span>

            {!isLoading && (
              <Button
                className="mt-4 mb-1"
                variant="primary"
                size="lg"
                type="submit"
              >
                登入
              </Button>
            )}
            {isLoading && (
              <Button
                size="lg"
                className="mt-4 mb-1 d-flex justify-content-center"
                variant="primary"
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}

            <a
              href="#"
              className="me-auto"
              onClick={(e) => {
                e.preventDefault();
                props.onHide(false);
                props.changemadals(true);
              }}
            >
              註冊帳號
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalsLoginComponents;
