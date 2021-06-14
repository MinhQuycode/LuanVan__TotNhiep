import React, { memo } from "react";
import PropTypes from "prop-types";

function ErrorRgt(props) {
    const messages = "Email đã tồn tại !"
  if (props.message?.status === "fails") {
    return <div className="alert alert-danger">{messages}</div>;
  } else {
    return <div></div>
  }
}
ErrorRgt.propTypes = {
  messages: PropTypes.string.isRequired,
};

export default memo(ErrorRgt);
