import React from "react";
import { getCookie } from "../../../function";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = getCookie("role");

  const isActive = (url) => {
    return window.location.pathname === url ? "nav-link active" : "nav-link";
  };

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <Link className="nav-link active" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt" />
              </div>
              Bảng điều khiển
            </Link>

            <div
              className="collapse"
              id="collapseShops"
              aria-labelledby="headingTwo"
              data-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link sub_nav_link" to="/admin/shop/list">
                  list
                </Link>
                <a
                  className="nav-link sub_nav_link"
                  href="/admin/shop/create"
                >
                  create
                </a>
              </nav>
            </div>

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
              </nav>
            </div>

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

            <Link
              className={role === "admin" ? isActive("/admin/user/list") : "d-none"}
              to="/admin/user/list"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-users" />
              </div>
              Quản lý người dùng hệ thống
            </Link>
            {/*  */}
            <Link
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
            </div>
            {/*  */}
            {/* <Link className={isActive("/admin/customer/list")} to="/admin/customer/list">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users" />
              </div>
              Quản lý người dùng
            </Link> */}
            <Link className={isActive("/admin/contact/list")} to="/admin/contact/list">
              <div className="sb-nav-link-icon">
                <i className="fas fa-gift" />
              </div>
              Liên hệ
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
