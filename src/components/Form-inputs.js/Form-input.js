import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function FormInput(props) {
  const { label, errorMessage, id, onChange, ...inputProps } = props;

  const [focus, setFocus] = useState(false);

  const handleFocus = (e) => {
    setFocus(true);
  };
  return (
    <Form.Group md="4" controlId="email">
      <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
        <Form.Control
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focus.toString()}
          onFocus={() =>
            inputProps.name === "password" ||
            inputProps.name === "confirmPassword"
              ? setFocus(true)
              : ""
          }
          required
          disabled={inputProps.isLoading || inputProps.registerSuc}
        />
        <span className="text-danger register_Validate">
          {props.value.length === 0 ? label + "不能為空" : errorMessage}
        </span>
      </FloatingLabel>
    </Form.Group>
  );
}

export default FormInput;
