import React, { Component } from "react";
import { getCookie } from "../../../function";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    let role = getCookie("role");
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
                Dashboard
              </Link>

              <Link
                className="nav-link collapsed"
                to="/admin/shop/list"
                data-toggle="collapse"
                data-target="#collapseShops"
                aria-expanded="false"
                aria-controls="collapseShops"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-store" />
                </div>
                Vendors
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
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
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/shop/create"
                  >
                    create
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/vendor/product/list"
                  >
                    Product
                  </Link>
                </nav>
              </div>
              <Link
                className="nav-link collapsed"
                to="/admin/product/list"
                data-toggle="collapse"
                data-target="#collapseProducts"
                aria-expanded="false"
                aria-controls="collapseProducts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box" />
                </div>
                Products
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </Link>
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
                    All Products
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/product/create"
                  >
                    Add Product
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/product/more-photo"
                  >
                    Add More Image
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
                Categories
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
                    All Categories
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/category/create"
                  >
                    Add Category
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/category/sub-create"
                  >
                    Add Sub-Category
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/category/sub-child-create"
                  >
                    Add Child-Category
                  </Link>
                </nav>
              </div>
              <Link
                className="nav-link collapsed"
                to="/admin/location/list"
                data-toggle="collapse"
                data-target="#collapseLocations"
                aria-expanded="false"
                aria-controls="collapseLocations"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                Locations
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </Link>
              <div
                className="collapse"
                id="collapseLocations"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/location/list"
                  >
                    All Locations
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/location/create"
                  >
                    Add Location
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
                Areas
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
                  <Link className="nav-link sub_nav_link" to="/admin/area/list">
                    All Areas
                  </Link>
                  <Link
                    className="nav-link sub_nav_link"
                    to="/admin/area/create"
                  >
                    Add Area
                  </Link>
                </nav>
              </div>
              <Link
                className={role === "admin" ? "nav-link" : "d-none"}
                to="/admin/user/list"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Roles Management
              </Link>
              <Link className="nav-link" to="/admin/customer/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Customers
              </Link>
              <Link className="nav-link" to="/admin/payment/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Payment
              </Link>
              <Link className="nav-link" to="/admin/voucher/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-gift" />
                </div>
                Voucher
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
