import React, { useEffect, useState } from 'react';
import { GetUserLogin } from '../../../../services';
import '../css/index.css';
import axios from "axios"
import { API_URL } from '../../../../../../config1';

const Reward = () => {
  const [user, setUser] = useState("");
  const [voucherUser, setVoucherUser]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      let email = sessionStorage.getItem("email");
      if (email) {
        let value = await GetUserLogin.getCustomerDetail(email);
        if (value) {
          setUser(value.data);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(()=> {
    (async ()=> {
      let email = sessionStorage.getItem("email");

        const res= await axios({
            url: API_URL + "/api/customer/voucher/has",
            method: "get",
            params: {
                email
            }
        })
    })()
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  return (
    <div className="wrapper">
      <div className="gambo-Breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-group">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="user-dt">
                <div className="user-img">
                  <img src="/img/avatar/img-5.jpg" alt="" />
                  <div className="img-add">
                    <input type="file" id="file" />
                  </div>
                </div>
                <h4>{user.firstName}</h4>
                <p>+84 {user.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="left-side-tabs">
                <div className="dashboard-left-links">
                  <a href="/account/view" className="user-item">
                    <i className="uil uil-apps" />Overview
                  </a>
                  <a href="/account/profile" className="user-item">
                    <i className="mdi mdi-account-outline" />My profile
                  </a>
                  <a href="/account/order/list" className="user-item">
                    <i className="uil uil-box" />My Orders
                  </a>
                  <a href="/account/rewards" className="user-item active">
                    <i className="uil uil-gift" />My Voucher
                  </a>
                  <a className="user-item" onClick={handleLogout}>
                    <i className="uil uil-exit" />Logout
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="dashboard-right">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title-tab">
                      <h4>
                        <i className="uil uil-gift" />My Vouchers
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="pdpt-bg rewards-coupns">
                      <div className="reward-body-dtt">
                        <div className="reward-img-icon">
                          <img src="images/discount.svg" alt="" />
                        </div>
                        <span className="rewrd-title">Offer</span>
                        <h4 className="cashbk-price">Get 25% Cashback</h4>
                        <span className="date-reward">Expires on : 31st May</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="pdpt-bg rewards-coupns">
                      <div className="reward-body-dtt">
                        <div className="reward-img-icon">
                          <img src="images/coupon.svg" alt="" />
                        </div>
                        <span className="rewrd-title">Coupon Won</span>
                        <h4 className="cashbk-price">Get 10% Cashback</h4>
                        <span className="date-reward">Expires on : 25th May</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="pdpt-bg rewards-coupns">
                      <div className="reward-body-dtt">
                        <div className="reward-img-icon">
                          <img src="images/discount.svg" alt="" />
                        </div>
                        <span className="rewrd-title">Offer</span>
                        <h4 className="cashbk-price">Get 15% Cashback</h4>
                        <span className="date-reward">Expired on : 5th May</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="pdpt-bg rewards-coupns">
                      <div className="reward-body-dtt">
                        <div className="reward-img-icon">
                          <img src="images/coupon.svg" alt="" />
                        </div>
                        <span className="rewrd-title">Coupon Won</span>
                        <h4 className="cashbk-price">Get 5% Cashback</h4>
                        <span className="date-reward">Expires on : 20th May</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="pdpt-bg">
                      <div className="reward-body-dtt">
                        <div className="reward-img-icon">
                          <img src="images/gift.svg" alt="" />
                        </div>
                        <span className="rewrd-title">Cashback Won</span>
                        <h4 className="cashbk-price">$1</h4>
                        <span className="date-reward">3 May 2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
