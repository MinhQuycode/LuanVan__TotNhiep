import React from 'react'

export default function ListTab() {

    let classList = "list-group-item-action";

    return (
        <div className="col-3 tiltle__user">
            <div className="list-group" id="list-tab" role="tablist">
              <span className="tiltle">TÀI KHOẢN CỦA BẠN</span>
              <a
                className="list-group-item list-group-item-action active"
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
              >
                Thông tin chung
              </a>
              <a
                className={`list-group-item ${classList}`}
                id="list-profile-list"
                data-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="profile"
              >
                Chi tiết tài khoản
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="messages"
              >
                Lịch sử giao dịch
              </a>
            </div>
          </div>
    )
}
