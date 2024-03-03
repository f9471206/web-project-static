import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormInput from "../Form-inputs.js/Form-input";
import MemberService from "../../services/member.service";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const ModalsRegisterComponents = (props) => {
  const [errMsg, setErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuc, setRegisterSuc] = useState(false);

  const [values, setValus] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      errorMessage: "信箱格式錯誤",
      label: "信箱",
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "name",
      pattern: ".{3,15}",
      errorMessage: "名稱由3-15個字元組成",
      label: "名稱",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "密碼由5-15位數字、字母組成",
      label: "密碼",
      pattern: "[a-zA-Z0-9]{5,10}",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "confirmPassword",
      errorMessage: "密碼不同",
      label: "確認密碼",
      pattern: values.password,
    },
  ];
  const handleSubmit = async (e) => {
    setErrMsg(false);
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target);

    MemberService.register(Object.fromEntries(data.entries()))
      .then((d) => {
        console.log(d);
        setRegisterSuc(true);
        setIsLoading(false);
        setErrMsg(false);
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        setIsLoading(false);
      });
  };
  const onChange = (e) => {
    setValus({ ...values, [e.target.name]: e.target.value });
  };

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
          <h2 className="text-center m-0">註冊</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              // isLoading={isLoading}
              // registerSuc={registerSuc}
            />
          ))}

          <div className="d-grid gap-2 mb-1">
            {errMsg && <Alert variant="danger">{errMsg}</Alert>}
            {registerSuc && (
              <Alert variant="success">
                註冊完成
                <Alert.Link
                  style={{ marginLeft: "0.5rem", textDecoration: "underline" }}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onHide(false);
                    props.changemadals(true);
                  }}
                >
                  前往登入
                </Alert.Link>
              </Alert>
            )}
            {!isLoading && (
              <Button
                className="mt-4 mb-1"
                variant="primary"
                size="lg"
                type="submit"
                disabled={registerSuc}
              >
                註冊
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
              onClick={(e) => {
                e.preventDefault();
                props.onHide(false);
                // props.changemadals(true);
              }}
            >
              已經有一個帳號了
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalsRegisterComponents;
