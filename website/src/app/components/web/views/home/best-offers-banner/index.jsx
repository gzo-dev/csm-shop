import React, { Component } from 'react'
import './index.css'
export default class Bestofferbanner extends Component {
    render() {
        return (
            <div>
                <div className="section145">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-title-tt">
                                    <div className="main-title-left">
                                        <span>Offers</span>
                                        <h2>Best Values</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item">
                                    <img src="https://f9-zpc.zdn.vn/8938671365555282785/ba56367463f9b2a7ebe8.jpg" alt />
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item">
                                    <img src="https://f2-zpc.zdn.vn/3368511878183810319/b5bd219f7412a54cfc03.jpg" alt />
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <a href="#" className="best-offer-item offr-none">
                                    <img src="https://f9-zpc.zdn.vn/4275139286401155915/d56d474f12c2c39c9ad3.jpg" alt />
                                    <div className="cmtk_dt">
                                        <div className="product_countdown-timer offer-counter-text" data-countdown="2021/01/06">165 days 01:28:33</div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-12">
                                <a href="#" className="code-offer-item">
                                    <img src="img/best-offers/offer-4.jpg" alt />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
