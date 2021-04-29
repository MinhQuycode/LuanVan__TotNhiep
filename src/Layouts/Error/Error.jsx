import React, { memo } from "react";
import PropTypes from "prop-types";

function Error(props) {
  // console.log(props.message)
  let messages = "Email hoặc mật khẩu nhập sai !"
  if (props.message.name) {
    return <div className="alert alert-danger">{messages}</div>;
  }
}

Error.propTypes = {
  messages: PropTypes.string.isRequired,
};

export default memo(Error);
