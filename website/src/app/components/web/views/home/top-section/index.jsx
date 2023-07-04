import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GroceryStampleDetails from "../../../../services/GroceryStampleDetails";
import { addToCart } from "../../../../../store/actions/cartActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";

const Topsavers = ({ addToCart }) => {
  const [productlist, setProductList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let list = await GroceryStampleDetails.getAllGroceryStaple();
      if (list) {
        setProductList(list.data);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const list = productlist?.products;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* New Item slider */}
      <section className="product-items-slider section-padding">
        <div className="container" id="header-category-bk">
          <div className="section-header">
            <span>For You</span>
            <h5 className="heading-design-h5">
              Sale
              {/* <span className="badge badge-primary">20% OFF</span> */}
              <Link
                to={{
                  pathname: `/shop/${productlist?.slug}`,
                  state: list,
                }}
              >
                <span className="float-right text-secondary">View All</span>
              </Link>
            </h5>
          </div>
          <Slider {...settings}>
            {!isLoaded ? (
              <div className="progress-bar-bk">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              productlist?.map((row, index) => (
                <div key={index} className="item">
                  <div className="product">
                    <Link
                      to={{
                        pathname: `/p/${row.slug}/${row.id}`,
                        state: row,
                      }}
                    >
                      <div className="product-header">
                        <span className="badge badge-success">
                          {row.discountPer}% OFF
                        </span>
                        <img
                          className="img-fluid"
                          src={row.photo}
                          alt="product"
                        />
                        {/* <span className="veg text-success mdi mdi-circle" /> */}
                      </div>
                      <div className="product-body">
                        <h5>{row.name}</h5>
                        <h6>
                          <strong>
                            <span className="mdi mdi-approval" /> Available in
                          </strong>{" "}
                          - {row.unitSize}
                        </h6>
                      </div>
                    </Link>
                    <div className="product-footer">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm float-right"
                        onClick={() => addToCart(row)}
                      >
                        <i className="mdi mdi-cart-outline" /> Add To Cart
                      </button>
                      <p className="offer-price mb-0">
                        VND{row.price - Math.floor(row.price * row.discountPer / 100)} <i className="mdi mdi-tag-outline" />
                        {
                          row.discountPer > 0 && 
                          <>
                            <br />
                            <span className="regular-price">VND{row.price}</span>
                          </>
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </section>

      {/* End New item slider */}
    </div>
  );
};

export default connect(null, { addToCart })(Topsavers);
