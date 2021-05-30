  import React from 'react';
  import zion from './../../assets/images/coop20.jpg'
  import galaxy from './../../assets/images/galaxy.png'
  import cgv from './../../assets/images/cgv.png'
  import bhd from './../../assets/images/bhd.png'
  import logo from './../../assets/images/logo.png'

  export default function Footer() {
  return (
  <section className="footer__under">
    <div className="footer__contents">
      <div className="row footer__item__4">
        <div className="col-md-12 col-lg-6 text-left p-0">
          <p>Đây là luận văn tốt nghiệp của sinh viên trường Đại học Giao Thông Vận Tải TP.HCM. Mong thầy cô và các bạn cùng theo dõi.</p>
        </div>
        <div className="col-md-12 col-lg-6 text-right p-0">
          <ul>
            <li>
              <a href="https://chat.zalo.me/" className="border__none">Zalo cá nhân</a>
            </li>
            <li>
              <a href="https://www.facebook.com/phamminhquy0403">Facebook cá nhân</a>
            </li>
            <li>
              <a href="https://github.com/MinhQuycode">Github cá nhân</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/quy-pham-8393aa201/">Linked cá nhân</a>
            </li>
          </ul>
          <ul>
            <li>
              <span className="border__none">Luận văn tốt nghiệp</span>
            </li>
            <li>
              <span>Dương Xuân Tiến Sỹ</span>
            </li>
            <li>
              <span>Phạm Minh Quý</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row footer__item__5">
        <div className="img__none">
          <img className="img-fluid" src={zion} alt="anh" />
        </div>
        <div className="img__none">
          <img className="img-fluid" src={galaxy} alt="anh"/>
        </div>
        <div>
          <img className="img-fluid" src={logo} alt="anh" />
        </div>
        <div className="img__none">
          <img className="img-fluid" src={cgv}  alt="anh"/>
        </div>
        <div className="img__none">
          <img className="img-fluid" src={bhd}  alt="anh"/>
        </div>
      </div>
      <div className="row footer__item__6 pb-3">
        <div className="col-md-12 col-lg-6">
          <p>Cảm ơn các bạn đã sủ dụng website, rất mong các bạn quay lại lần sau !</p>
        </div>
      </div>
    </div>
  </section>
  )}
