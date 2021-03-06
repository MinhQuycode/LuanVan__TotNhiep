import React, { memo } from "react";

function ErrorRgt(props) {
    const messages = "Email đã tồn tại !"
  if (props.message?.status === "fails") {
    return <div className="alert alert-danger">{messages}</div>;
  } else {
    return <div></div>
  }
}

export default memo(ErrorRgt);
