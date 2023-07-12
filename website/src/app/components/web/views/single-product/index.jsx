import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import parse from "html-react-parser";
import { GetProductDetails } from "../../../services";
// import Similarproduct from './same-product';
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import "./index.css";

const Singleproduct = ({ addToCart }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      window.scrollTo(0, 0);
      const url = window.location.href.split("/");
      const lastSegment = url.pop() || url.pop();
      const list = await GetProductDetails.getProductById(lastSegment);
      
      setProduct(list.data);
    };

    fetchProductDetails();
  }, []);

  const settings = {
    customPaging: function (i) {
      return (
        <div id="sync1" className="owl-carousel">
          <div className="item">
            <img src={product?.productphotos[i].imgUrl} alt="" />
          </div>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="#">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </a>{" "}
              <span className="mdi mdi-chevron-right" />{" "}
              <a href="#">Fruits &amp; Vegetables</a>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Fruits</a>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-single section-padding pt-3">
        <div className="container">
          {product ? (
            <div className="row">
              {
                product.productphotos && product.productphotos.length > 0 && <>
                  <div className="col-md-6" style={{backgroundColor: "#fff"}}>
                    <div className="shop-detail-left">
                      <Paper className="shop-detail-slider">
                        <Slider {...settings}>
                          {product.productphotos ? (
                            product.productphotos.map((r, index) => (
                              <div key={index}>
                                <img
                                  src={r.imgUrl}
                                  alt=""
                                  className="img-fluid img-center"
                                />
                              </div>
                            ))
                          ) : (
                            <div>Please Upload Image</div>
                          )}
                        </Slider>
                      </Paper>
                    </div>
                  </div>
                </>
              }
              {
                product.productphotos.length <= 0 && <>
                  <div className="col-md-6 d-flex justify-content-center align-items-center" style={{backgroundColor: "#fff", borderRadius: 10}}>
                      <div style={{fontSize: 18, fontWeight: 600}}>No image of this product</div>
                  </div>
                </>
              }
              <div className="col-md-6">
                <div className="shop-detail-right">
                  <span className="badge badge-success">
                    {product.discountPer}% OFF
                  </span>
                  <h2>{product.name}</h2>
                  <h6>
                    <strong>
                      <span className="mdi mdi-approval" /> Available in
                    </strong>{" "}
                    - {product.unitSize}
                  </h6>
                  <div className="pdp-product__old-price">
                    <span className="space__right--2-unit">Product price:</span>
                    <span className="regular-price">
                      VND{product.price}
                    </span>
                  </div>

                  <div className="pdp-product__new-price">
                    <span className="space__right--2-unit">
                      Selling price:
                    </span>
                    <span className="pdp-product__price--new">
                      VND{product.price - Math.floor(product.price * product.discountPer / 100)}
                    </span>
                    <div className="pdp-product__tax-disclaimer">
                      (Inclusive of all taxes)
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => addToCart(product)}
                  >
                    <i className="mdi mdi-cart-outline" /> Add To Cart
                  </button>
                  <h6 className="mb-3 mt-4">Why shop from fpt?</h6>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="feature-box">
                        <i className="mdi mdi-truck-fast" />
                        <h6 className="text-info">
                          <span>Easy Returns &amp; Refunds</span>
                        </h6>
                        <p>Return products at doorstep and get refund in seconds.</p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="feature-box">
                        <i className="mdi mdi-basket" />
                        <h6 className="text-info">Lowest price guaranteed</h6>
                        <p>Get difference refunded if you find it cheaper anywhere else.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="col-lg-12 col-md-12 mt-3">
                <div className="pdpt-bg">
                  <div className="pdpt-title">
                    <h4>Product Details</h4>
                  </div>
                  <div className="pdpt-body scrollstyle_4">
                    <div className="pdct-dts-1 short-desc">
                      {parse(product.desc)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </section>

      {/* More like product */}

      {/* <Similarproduct /> */}
      {/* End Same product */}
    </div>
  );
};

export default connect(null, { addToCart })(Singleproduct);
