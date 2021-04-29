import React, {useState} from 'react'
import NewData from "./NewData";

export default function New(props) {
    const [state, setstate] = useState({
        like : 7
     }
    )

    const handleLike = () =>{
        setstate ({
            like : state.like + 1 
        })
    }



    return (
        <section id="new">
            <div className="movie__news">
                <div className="my__news">
                    <ul
                        className="nav news__navigation nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                id="pills-home-tab"
                                data-toggle="pill"
                                href="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                            >
                                Điện Ảnh 24h
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="pills-profile-tab"
                                data-toggle="pill"
                                href="#pills-profile"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                            >
                                Review
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="pills-contact-tab"
                                data-toggle="pill"
                                href="#pills-contact"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                            >
                                Khuyến Mãi
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <div className="dien__Anh">
                                <div className="row top__news">
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                                            <img
                                                src={NewData.hinhAnh1}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                "Bóc tem" tổ hợp giải trí mới toanh của giới Hà Thành
                                            </p>
                                        </a>
                                        <p>
                                            Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống
                                            ảo độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai
                                            trương tại 360 Giải Phóng!
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                                            <img
                                                src={NewData.hinhAnh2}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần
                                                công chiếu
                                            </p>
                                        </a>
                                        <p>
                                            Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu
                                            lạc bộ phim điện ảnh đạt 100 tỷ đồng doanh thu phòng vé.
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row bottom__news">
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                                            <img
                                                src={NewData.hinhAnh3}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                Ngô Thanh Vân bắt tay thực hiện cùng đạo diễn Việt Max
                                            </p>
                                        </a>
                                        <p>
                                            Chiều tối ngày 30-10-2020, Ngô Thanh Vân và Studio68 đã
                                            chính thức phát cuộc thi...
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7953-antebellum-4-ly-do-khong-the-bo-lo-sieu-pham-kinh-di-antebellum-bay-thuc-tai-kinh-hoang">
                                            <img
                                                src={NewData.hinhAnh4}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                [ANTEBELLUM] - 4 lý do không thể bỏ lỡ siêu phẩm kinh dị
                                            </p>
                                        </a>
                                        <p>
                                            Không đi theo lối mòn máu me, hù dọa mà đầu tư khai thác
                                            những mảng tối của xã hội...
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh5}
                                                        alt="hinhAnh"
                                                    />
                          Ác Quỷ Đối Đầu soán ngôi Peninsula, trở thành phim...
                                                </p>
                                            </a>
                                        </div>
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh6}
                                                        alt="hinhAnh"
                                                    />
                          Dàn mỹ nhân trong thế giới điện ảnh của quái kiệt
                          Christopher...
                                                </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh7}
                                                        alt="hinhAnh"
                                                    />
                          Truy Cùng Giết Tận - Cuộc tái ngộ của hai 'ông hoàng
                          phòng vé'...
                                            </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh8}
                                                        alt="hinhAnh"
                                                    />
                          6 đạo diễn tỉ đô làm nên thành công của những bom tấn
                          đình...
                        </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div className="dien__Anh">
                                <div className="row top__news">
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                                            <img
                                                src={NewData.hinhAnh9}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                Review: Tàn Tích Quỷ Ám (Relic) - Ba thế hệ và mối liên
                                                kết
                                            </p>
                                        </a>
                                        <p>
                                            Điểm nhấn của phim kinh dị năm 2020 chính là Tàn Tích Quỷ
                                            Ám!
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                                            <img
                                                src={NewData.hinhAnh10}
                                                alt=" hinh anh"
                                            />
                                            <p>Review: Dinh Thự Oan Khuất (Ghost Of War)</p>
                                        </a>
                                        <p>
                                            Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự
                                            Oan Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row bottom__news">
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                                            <img
                                                src={NewData.hinhAnh11}
                                                alt=" hinh anh"
                                            />
                                            <p>
                                                ‘BlacKkKlansman’ - cốc nước lạnh để người Mỹ thức tỉnh
                                            </p>
                                        </a>
                                        <p>
                                            Tác phẩm nhận đề cử Phim truyện xuất sắc tại Oscar 2019
                                            của đạo diễn...
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7953-antebellum-4-ly-do-khong-the-bo-lo-sieu-pham-kinh-di-antebellum-bay-thuc-tai-kinh-hoang">
                                            <img
                                                src={NewData.hinhAnh12}
                                                alt=" hinh anh"
                                            />
                                            <p>American Sniper - Chính nghĩa hay phi nghĩa?</p>
                                        </a>
                                        <p>
                                            American Sniper khắc họa một tay súng bắn tỉa “huyền
                                            thoại” của Hải quân Mỹ với 4 lần...
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh13}
                                                        alt="hinhAnh"
                                                    />
                          Review: Spider-Man: Into The Spider-Vesre
                                                </p>
                                            </a>
                                        </div>
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh14}
                                                        alt="hinhAnh"
                                                    />
                          COVID-19 là bản chính thức của MEV-1 phim contagion
                          (2011)
                                                </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh15}
                                                        alt="hinhAnh"
                                                    />
                          [[Review] Siêu Vệ Sĩ Sợ Vợ - Giải cứu Tổng thống chưa
                          bao giờ...
                                            </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh16}
                                                        alt="hinhAnh"
                                                    />
                          [Review] Bloodshot - Mở màn ấn tượng cho Vũ trụ
                          Siêu...
                        </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-contact"
                            role="tabpanel"
                            aria-labelledby="pills-contact-tab"
                        >
                            <div className="dien__Anh">
                                <div className="row top__news">
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                                            <img
                                                src={NewData.hinhAnh17}
                                                alt=" hinh anh"
                                            />
                                            <p>BHD 59K/VÉ CẢ TUẦN !!!</p>
                                        </a>
                                        <p>
                                            Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                                            giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên
                                            ZaloPay.
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" />
                                            <span className="like__num">87</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <a href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                                            <img
                                                src={NewData.hinhAnh18}
                                                alt=" hinh anh"
                                            />
                                            <p>TIX 1K/VÉ NGẠI CHI GIÁ VÉ</p>
                                        </a>
                                        <p>
                                            Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm
                                            02 voucher thanh toán ZaloPay thả ga
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row bottom__news">
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                                            <img
                                                src={NewData.hinhAnh19}
                                                alt=" hinh anh"
                                            />
                                            <p>ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX</p>
                                        </a>
                                        <p>
                                            ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX Hành trình tìm Ròm và
                                            Phúc chỉ với 1k cả tuần + nhận thêm 02 voucher khi đặt vé
                                            qua TIX.
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <a href="https://tix.vn/goc-dien-anh/7953-antebellum-4-ly-do-khong-the-bo-lo-sieu-pham-kinh-di-antebellum-bay-thuc-tai-kinh-hoang">
                                            <img
                                                src={NewData.hinhAnh20}
                                                alt=" hinh anh"
                                            />
                                            <p>BHD STAR VÉ CHỈ 59.000Đ CẢ TUẦN!</p>
                                        </a>
                                        <p>
                                            Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                                            giá 59k/vé khi mua vé trên TIX và thanh toán bằng ZaloPay
                                            hoặc Mục Vé Phim trên ZaloPay.
                                        </p>
                                        <div className="interact__item">
                                            <span className="interact__item__group">
                                            <img src={NewData.like} alt="like" onClick={handleLike} />
                                            <span className="like__num">{state.like}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh21}
                                                        alt="hinhAnh"
                                                    />
                          Beta Cineplex trở lại với hàng loạt ưu đãi lớn
                                                </p>
                                            </a>
                                        </div>
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh22}
                                                        alt="hinhAnh"
                                                    />
                          [123Phim] Thứ 6 Không Đen Tối - Ưu đãi huỷ diệt 11k/vé
                          Anh...
                                                </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh23}
                                                        alt="hinhAnh"
                                                    />
                          [123Phim] NHẬP MÃ 'PSM30K' - Giảm ngay 30k khi đặt vé
                          Pháp...
                        </p>
                                            </a>
                                        </div>{" "}
                                        <div className="mini__news">
                                            <a href="https://tix.vn/goc-dien-anh/7952-ac-quy-doi-dau-soan-ngoi-peninsula-tro-thanh-phim-dung-dau-doanh-thu-tai-han-quoc-mua-dich">
                                                <p>
                                                    <img
                                                        src={NewData.hinhAnh24}
                                                        alt="hinhAnh"
                                                    />
                          [Mega GS] Một đoá hoa thay ngàn lời yêu
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
