import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from '../category';

export default class Bannerslider extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div>
                {/* <Category /> */}
                <Slider {...settings}>
                    <div className="owl-item">
                        <img src="https://f9-zpc.zdn.vn/8938671365555282785/ba56367463f9b2a7ebe8.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img src="https://f2-zpc.zdn.vn/3368511878183810319/b5bd219f7412a54cfc03.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img src="https://f9-zpc.zdn.vn/4275139286401155915/d56d474f12c2c39c9ad3.jpg" alt="supermarket" />
                    </div>
                </Slider>
            </div>
        )
    }
}
