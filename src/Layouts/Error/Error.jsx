import React, { memo } from "react";

function Error(props) {
  // console.log(props.message)
  let messages = "Email hoặc mật khẩu nhập sai !"
  if (props.message.name) {
    return <div className="alert alert-danger">{messages}</div>;
  }
}

export default memo(Error);
