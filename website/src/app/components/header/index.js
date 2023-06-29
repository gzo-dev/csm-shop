import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Login from "../../auth/login";
import Cartsidebar from "../web/views/cart-sidebar";
import { GetUserLogin } from "../../components/services";

const Navigation = ({ history }) => {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [searchtxt, setSearchtxt] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchtxt") {
      setSearchtxt(value);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    history.push(`/product/catalogsearch/result/${searchtxt}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cookies = await GetUserLogin.isAuthenticate();
      setToken(cookies);
      const email = sessionStorage.getItem("email");
      if (email) {
        const user = await GetUserLogin.getCustomerDetail(email);
        if (user) {
          setUserName(user.data.firstName);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="header clearfix">
        <div className="navbar-top bg-success pt-2 pb-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <Link to="/" className="mb-0 text-white">
                  20% cashback for new users | Code:{" "}
                  <strong>
                    <span className="text-light">
                      OGOFERS13 <span className="mdi mdi-tag-faces" />
                    </span>{" "}
                  </strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {" "}
              <img
                style={{ width: 80 }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/800px-FPT_logo_2010.svg.png"
                alt="logo"
              />{" "}
            </Link>
            <button
              className="navbar-toggler navbar-toggler-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse" id="navbarNavDropdown">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                <form
                  className="top-categories-search"
                  onSubmit={handleClickSearch}
                >
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search products in Your City"
                      aria-label="Search products in Your City"
                      type="text"
                      name="searchtxt"
                      value={searchtxt}
                      onChange={handleChange}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="submit">
                        <i className="mdi mdi-file-find" /> Search
                      </button>
                    </span>
                  </div>
                </form>
              </div>
              <div className="my-2 my-lg-0">
                <ul className="list-inline main-nav-right">
                  <li className="list-inline-item">
                    {!token ? (
                      <Link
                        to="#"
                        data-target="#bd-example-modal"
                        data-toggle="modal"
                        className="btn btn-link"
                      >
                        <i className="mdi mdi-account-circle" /> Login/Sign Up
                      </Link>
                    ) : (
                      <div className="dropdown">
                        <button
                          className="btn btn-account dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                         <i className="mdi mdi-account-circle" /> 
                          {userName}

                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link className="dropdown-item" to="/account/view">
                            <i className="uil uil-apps" />
                            Dashboard
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/account/profile"
                          >
                            <i
                              className="mdi mdi-account-outline"
                              aria-hidden="true"
                            ></i>
                            My Profile
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/account/wishlist"
                          >
                            <i
                              className="mdi mdi-heart-outline"
                              aria-hidden="true"
                            ></i>
                            Wish List
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/account/order/list"
                          >
                            <i
                              className="mdi mdi-format-list-bulleted"
                              aria-hidden="true"
                            ></i>{" "}
                            Orders List
                          </Link>
                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            <i className="mdi mdi-lock" aria-hidden="true"></i>{" "}
                            Logout
                          </span>
                        </div>
                      </div>
                    )}
                  </li>
                  <li className="list-inline-item cart-btn">
                    <Cartsidebar />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* login popup */}
      <Login />
    </div>
  );
};

export default withRouter(Navigation);
