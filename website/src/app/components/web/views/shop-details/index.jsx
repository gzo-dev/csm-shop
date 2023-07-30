import React, { useState, useEffect, useCallback } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import "./index.css";
import Filterbycategory from "./Filtersbycategory";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core/";
import numberWithCommas from "../../../../../util/number_thousand_separator";

const Shopdetails = () => {
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(12);
  const [isloaded, setIsLoaded] = useState(false);
  const [filter, setFilter]= useState()

  const dispatch = useDispatch();

  const handleChangeByCategory = useCallback((value) => {
    if (value) {
      setIsLoaded(true);
      setList(value.data);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let url = window.location.href.split("/");
      var lastSegment = url.pop() || url.pop();
      try {
        let p = await GetProductDetails.getAllProductList(lastSegment);
        if (p) {
          setList(p.data.products);
          setIsLoaded(true);
        }
      } catch (e) {
        NotificationManager.error("Empty data in category", "Data");
      }
    };
    fetchData();
  }, []);

  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };
  
  function sortProducts(products, sortOption) {
    switch (sortOption) {
      case 1: // Price - Low to High
        return products.sort((a, b) => b.price - a.price);
      case 2: // Price - High to Low
        return products.sort((a, b) => a.price - b.price);
      case 3: // Alphabetical
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 4: // Saving - High to Low
        return products.sort((a, b) => b.discount - a.discount);
      case 5: // Saving - Low to High
        return products.sort((a, b) => a.discount - b.discount);
      case 6: // % Off - High to Low
        return products.sort((a, b) => b.discountPer - a.discountPer);
      default: // Sort by Products (Default: Newest to Oldest)
        return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </a>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Product</a>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <div className="all-product-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-top-dt">
                <div className="product-left-title">
                  <h2>All Products</h2>
                </div>
                {/* <Filterbycategory
                  onSelectFilterCategory={handleChangeByCategory}
                /> */}
                <Button
                  className="filter-btn"
                  variant="contained"
                  color="secondary"
                  onClick={()=> setList(sortProducts(list, filter))}
                >
                  Filters
                </Button>
                <div className="product-sort">
                  <select className="form-control" onChange={(e)=> setFilter(parseInt(e.target.value))}>
                    <option className="item" value={0}>
                      Sort by Products
                    </option>
                    <option className="item" value={1}>
                      Price - Low to High
                    </option>
                    <option className="item" value={2}>
                      Price - High to Low
                    </option>
                    <option className="item" value={3}>
                      Alphabetical
                    </option>
                    <option className="item" value={4}>
                      Saving - High to Low
                    </option>
                    <option className="item" value={5}>
                      Saving - Low to High
                    </option>
                    <option className="item" value={6}>
                      % Off - High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End product */}
      {/* product section */}
      <section className="shop-list section-padding">
        {!isloaded ? (
          <div className="progress-bar-bk">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row no-gutters">
                  {list.slice(0, limit).map((row, index) => (
                    <div key={index} className="col-md-4">
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
                              {/* <h6>
                          <strong>
                            <span className="mdi mdi-approval" /> Available in
                          </strong>{" "}
                        </h6> */}
                            </div>
                          </Link>
                          <div
                            className="product-footer"
                            style={{ height: 40 }}
                          >
                            {/* <button
                        type="button"
                        className="btn btn-secondary btn-sm float-right"
                        onClick={() => addToCart(row)}
                      >
                        <i className="mdi mdi-cart-outline" /> Add To Cart
                      </button> */}
                            <p className="offer-price mb-0">
                              VND
                              {numberWithCommas(row.price -
                                Math.floor(
                                  (row.price * row.discountPer) / 100
                                ))}{" "}
                              <i className="mdi mdi-tag-outline" />
                              {row.discountPer > 0 && (
                                <>
                                  <br />
                                  <span className="regular-price">
                                    VND{numberWithCommas(row.price)}
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="more-product-btn">
                  {limit <= list.length && (
                    <button
                      className="show-more-btn hover-btn"
                      onClick={onLoadMore}
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* end product section */}
    </div>
  );
};

export default Shopdetails;
