import React, { Fragment, useContext, useState } from "react";
import { getCookie } from "../../../function";
import { Link, useHistory } from "react-router-dom";
import LogoNoTextImage from "../../../assets/logonotext.png";
import UserLogo from "../../../assets/sidebar/user.png";
import InternalLogo from "../../../assets/sidebar/internal.png";
import RealEstateLogo from "../../../assets/sidebar/realestate.png";
import HotelLogo from "../../../assets/sidebar/hotel.png";
import TicketLogo from "../../../assets/sidebar/ticket.png";
import TourLogo from "../../../assets/sidebar/tour.png";
import BlogLogo from "../../../assets/sidebar/blog.png";
import ContactLogo from "../../../assets/sidebar/contact.png";
import LogoutLogo from "../../../assets/sidebar/logout.png";
import ExportLogo from "../../../assets/sidebar/export.png";
import { GetProductDetails, GetUserLogin } from "../../services";
import { AppContext } from "../../../App";
import * as XLSX from "xlsx";

const Sidebar = () => {
  const history = useHistory();
  const { user } = useContext(AppContext);
  const role = getCookie("role");

  const isActive = (url) => {
    return window.location.pathname === url
      ? "nav-link active"
      : "nav-link cus-text-mk";
  };

  const handleClickProfile = () => {
    history.push("/admin/profile");
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    let list = await GetProductDetails.getAllProductList();
    if (list) {
      var tdata = list.product;
      // setGetList(tdata);
      const headers = ["Tên sản phẩm", "Thể loại", "Giá", "Giảm giá"];

      // Thêm tiêu đề cột vào mảng dữ liệu

      const worksheet = XLSX.utils.json_to_sheet(
        tdata.map((product) => [
          product.name,
          product.SubCategory
            ? `${product.SubCategory.category.name} | ${product.SubCategory.sub_name}`
            : "..",
          product.price,
          product.discountPer,
        ])
      );
      tdata.unshift(headers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sản phẩm");
      XLSX.writeFile(workbook, "product.xlsx");
    }
  };

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div
            className="w-100 d-flex justify-center align-items-center pb-3 pt-1 mb-3"
            style={{ borderBottom: "1px solid #999999" }}
          >
            <Link style={{ cursor: "pointer" }} to="/admin">
              <img src={LogoNoTextImage} alt="" />
            </Link>
            <p
              className="text-grad "
              style={{
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              Minh Khang Admin
            </p>
          </div>
          <div
            className="w-100 d-flex justify-center justify-content-center align-items-center pb-3 pt-1 mb-3"
            style={{ borderBottom: "1px solid #999999" }}
          >
            <img
              onClick={() => {
                handleClickProfile();
              }}
              className="wrap-image-user-sidebar"
              src={user.avatar}
              alt=""
              style={{
                width: 100,
                aspectRatio: 1,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="nav">
            {(role === "admin" || role === "hr") && (
              <Link className={"nav-link cus-text-mk"} to="/admin/user/list">
                <div className="sb-nav-link-icon">
                  <img src={UserLogo} alt="" />
                </div>
                Quản lý người dùng
              </Link>
            )}
            {/*  */}
            {/* role === "admin" ? isActive("/admin/user/list") : "d-none" */}
            <Link className={"nav-link cus-text-mk"} to="/admin/internal">
              <div className="sb-nav-link-icon">
                <img src={InternalLogo} alt="" />
              </div>
              Thông tin nội bộ
            </Link>
            {/*  */}
            {/* <Link className="nav-link active" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt" />
              </div>
              Bảng điều khiển
            </Link> */}
            {(role === "admin" ||
              role === "fulltime" ||
              role === "ceo" ||
              role === "marketing" ||
              role === "manager" ||
              role === "leader" ||
              role === "employee" ||
              role === "operator" ||
              role === "parttime") && (
              <Fragment>
                <Link className="nav-link cus-text-mk" to="/admin/realestate">
                  <div className="sb-nav-link-icon">
                    <img src={RealEstateLogo} alt="" />
                  </div>
                  Bất động sản cho thuê
                </Link>
                <Link className="nav-link cus-text-mk" to="/admin/hotel">
                  <div className="sb-nav-link-icon">
                    <img src={HotelLogo} alt="" />
                  </div>
                  Hotel/Villa/Homestay
                </Link>
                <Link className="nav-link cus-text-mk" to="/admin/ticket">
                  <div className="sb-nav-link-icon">
                    <img src={TicketLogo} alt="" />
                  </div>
                  Vé tham quan
                </Link>
                <Link className="nav-link cus-text-mk" to="/admin/tk/4/list">
                  <div className="sb-nav-link-icon">
                    <img src={TicketLogo} alt="" />
                  </div>
                  Vé máy bay
                </Link>
                <Link className="nav-link cus-text-mk" to="/admin/tk/5/list">
                  <div className="sb-nav-link-icon">
                    <img src={TicketLogo} alt="" />
                  </div>
                  Vé tàu/xe
                </Link>
                <Link className="nav-link cus-text-mk" to="/admin/tour">
                  <div className="sb-nav-link-icon">
                    <img src={TourLogo} alt="" />
                  </div>
                  Tour du lịch
                </Link>
              </Fragment>
            )}
            {role !== "parttime" && (
              <Link className="nav-link cus-text-mk" to="/admin/blog">
                <div className="sb-nav-link-icon">
                  <img src={BlogLogo} alt="" />
                </div>
                Blog
              </Link>
            )}
            {(role === "admin" ||
              role === "fulltime" ||
              role === "ceo" ||
              role === "marketing" ||
              role === "manager" ||
              role === "leader" ||
              role === "employee" ||
              role === "operator" ||
              role === "parttime") && (
              <Fragment>
                <Link className="nav-link cus-text-mk" to="/admin/contact">
                  <div className="sb-nav-link-icon">
                    <img src={ContactLogo} alt="" />
                  </div>
                  Liên hệ khách hàng
                </Link>
              </Fragment>
            )}
            <div
              className="w-100 d-flex justify-center align-items-center pb-3 pt-1 mb-3"
              style={{ borderBottom: "1px solid #999999" }}
            ></div>
            <Link
              onClick={(e) => {
                e.preventDefault();
                GetUserLogin.logout();
              }}
              className="nav-link cus-text-mk"
              to="/admin/logout"
            >
              <div className="sb-nav-link-icon">
                <img src={LogoutLogo} alt="" />
              </div>
              Đăng xuất
            </Link>
            {role === "admin" && (
              <Link
                onClick={exportToExcel}
                className="nav-link cus-text-mk"
                to="/admin/contact"
              >
                <div className="sb-nav-link-icon">
                  <img src={ExportLogo} alt="" />
                </div>
                Xuất dữ liệu
              </Link>
            )}
            {/* {(role === "admin" || role === "fulltime") &&
              <Fragment>
                <a
                  className="nav-link collapsed"
                  href="/admin/product/list"
                  data-toggle="collapse"
                  data-target="#collapseProducts"
                  aria-expanded="false"
                  aria-controls="collapseProducts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-box" />
                  </div>
                  Sản phẩm
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseProducts"
                  aria-labelledby="headingTwo"
                  data-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link
                      className="nav-link sub_nav_link"
                      to="/admin/product/list"
                    >
                      Tất cả sản phẩm
                    </Link>
                    <Link
                      className="nav-link sub_nav_link"
                      to="/admin/product/create"
                    >
                      Thêm sản phẩm
                    </Link>
                  </nav>
                </div>
              </Fragment>
            } */}
            {/* {(role === "admin" || role === "fulltime") &&
              <Fragment>
                <Link
                  className="nav-link collapsed"
                  to="/admin/category/list"
                  data-toggle="collapse"
                  data-target="#collapseCategories"
                  aria-expanded="false"
                  aria-controls="collapseCategories"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-list" />
                  </div>
                  Thể loại
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseCategories"
                  aria-labelledby="headingTwo"
                  data-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link
                      className="nav-link sub_nav_link"
                      to="/admin/category/list"
                    >
                      Tất cả thể loại
                    </Link>
                    <Link
                      className="nav-link sub_nav_link"
                      to="/admin/category/create"
                    >
                      Thêm thể loại
                    </Link>
                    <Link
                      className="nav-link sub_nav_link"
                      to="/admin/category/sub-create"
                    >
                      Thêm thể loại con
                    </Link>
                  </nav>
                </div>
              </Fragment>
            } */}

            {/* {(role === "admin" || role === "fulltime") && <Fragment>
              <Link
                className="nav-link collapsed"
                to="/admin/area/list"
                data-toggle="collapse"
                data-target="#collapseAreas"
                aria-expanded="false"
                aria-controls="collapseAreas"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-map-marked-alt" />
                </div>
                Tour
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </Link>
              <div
                className="collapse"
                id="collapseAreas"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link sub_nav_link" to="/admin/tour/list">
                    Quản lý tour
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/tour/create"
                  >
                    Thêm tour
                  </Link>
                </nav>
              </div>
            </Fragment>} */}

            {/*  */}
            {/* <Link
              className="nav-link collapsed"
              to="/admin/area/list"
              data-toggle="collapse"
              data-target="#collapseBlogs"
              aria-expanded="false"
              aria-controls="collapseBlogs"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-map-marked-alt" />
              </div>
              Blog
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseBlogs"
              aria-labelledby="headingTwo"
              data-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link sub_nav_link" to="/admin/blog/list">
                  Quản lý blog
                </Link>
                <Link
                  className="nav-link sub_nav_link"
                  to="/admin/blog/create"
                >
                  Thêm blog
                </Link>
              </nav>
            </div> */}
            {/*  */}
            {/* <Link className={isActive("/admin/customer/list")} to="/admin/customer/list">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users" />
              </div>
              Quản lý người dùng
            </Link> */}
            {/* {(role === "admin" || role === "fulltime") &&
              <Link className={isActive("/admin/contact/list")} to="/admin/contact/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-gift" />
                </div>
                Liên hệ
              </Link> 
            } */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
