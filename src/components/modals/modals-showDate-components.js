import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import MyFunction from "./myFunction";

const ModalsShowDateComponents = ({ date }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {MyFunction.changDateHours(date)}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span style={{ cursor: "pointer" }}>{MyFunction.time(date)}</span>
    </OverlayTrigger>
  );
};

export default ModalsShowDateComponents;
