import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from '../category';
import "./index.css"

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
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 16 / 9}} src="https://res.cloudinary.com/cockbook/image/upload/v1690831439/z4559682910612_157eb9b1f3c2180566a5375ea2d57220_op4urh.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 16 / 9}} src="https://res.cloudinary.com/cockbook/image/upload/v1690831403/z4559682975986_13318aec10875184d72b1a325c5bfafe_gpgn2d.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 16 / 9}} src="https://res.cloudinary.com/cockbook/image/upload/v1690831536/z4559682878534_2642e286a2a14445116b3745bff14b3d_gkfubh.jpg" alt="supermarket" />
                    </div>
                </Slider>
            </div>
        )
    }
}
