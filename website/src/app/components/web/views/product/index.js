import React, { useState, useEffect } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import numberWithCommas from "../../../../../util/number_thousand_separator";

const Productview = ({ addToCart }) => {
  const [list, setList] = useState([]);
  const [categorybyproduct, setCategoryByProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [limit, setLimit] = useState(3);
  const { id } = useParams();

  const getFilterByProduct = async () => {
    setIsLoaded(false);
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    try {
      let p = await GetProductDetails.getProductByFilter(lastSegment);
      if (p) {
        setList(p.data);
        setIsLoaded(true);
      }
    } catch (e) {
      NotificationManager.error("Empty data in category", "Data");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFilterByProduct();
  }, [id]);

  useEffect(() => {
    getFilterByProduct();
  }, [limit]);

  const handleFilterCategory = async (row) => {
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();

    let data = { id: row.id, name: lastSegment };
    let category = await GetProductDetails.getProductBySubcategory(data);
    if (category) {
      setCategoryByProduct(category.data);
      setIsLoaded(true);
      setToggle(true);
    } else {
      NotificationManager.error("Empty data in category", "Undefined");
    }
  };

  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  function sortProducts(products, sortOption) {
    switch (sortOption) {
      case 1: // Relevance (Default: Newest to Oldest)
        return products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 2: // Price - Low to High
        return products.sort((a, b) => a.price - b.price);
      case 3: // Price - High to Low
        return products.sort((a, b) => b.price - a.price);
      case 4: // Discount - High to Low
        return products.sort((a, b) => b.discountPer - a.discountPer);
      case 5: // Name - A to Z
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default: // Relevance (Default: Newest to Oldest)
        return products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Search</a>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <section className="shop-list section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="shop-filters">
                <div id="accordion">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          All Category{" "}
                          <span className="mdi mdi-chevron-down float-right" />
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body card-shop-filters">
                        {isLoaded
                          ? list.map((row, index) => {
                              return (
                                <div className="card-body" key={index}>
                                  <div
                                    className="list-group bs-canvas-close"
                                    aria-label="Close"
                                    onClick={() => handleFilterCategory(row)}
                                  >
                                    <span className="list-group-item list-group-item-action">
                                      {row.sub_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="shop-head">
                <a href="/">
                  <span className="mdi mdi-home" /> Home
                </a>{" "}
                <span className="mdi mdi-chevron-right" />{" "}
                <a href="#">Products</a>{" "}
                <div className="btn-group float-right mt-2">
                  <button type="button" className="btn btn-dark">
                    Sort by Products &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                  <select
                    onChange={(e) => {
                      e.persist();
                      console.log(e.target.value);
                      setList((prev) => [
                        {
                          ...prev[0],
                          products: sortProducts(
                            list[0].products,
                            parseInt(e.target?.value)
                          ),
                        },
                      ]);
                    }}
                  >
                    <option value={1}>Relevance</option>
                    <option value={2}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                    <option value={4}>Discount (High to Low)</option>
                    <option value={5}>Name (A to Z)</option>
                  </select>
                </div>
                <h5 className="mb-3">Search product</h5>
              </div>
              {!isLoaded ? (
                <div className="progress-bar-bk">
                  <CircularProgress color="secondary" />
                </div>
              ) : toggle ? (
                <div className="row no-gutters">
                  {categorybyproduct ? (
                    categorybyproduct.map((row) =>
                      row.products.slice(0, limit).map((row, index) => (
                        <div key={index} className="col-md-4">
                          <div className="item">
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
                                  <span className="veg text-success mdi mdi-circle" />
                                </div>
                                <div className="product-body">
                                  <h5>{row.name}</h5>
                                  {/* <h6>
                                    <strong>
                                      <span className="mdi mdi-approval" />{" "}
                                      Available in
                                    </strong>{" "}
                                    - {row.unitSize}
                                  </h6> */}
                                </div>
                              </Link>
                              <div className="product-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm float-right"
                                  onClick={() => addToCart(row)}
                                >
                                  <i className="mdi mdi-cart-outline" /> Add To
                                  Cart
                                </button>
                                <p className="offer-price mb-0">
                                  $
                                  {numberWithCommas(
                                    row.price -
                                      Math.floor(
                                        (row.price * row.discountPer) / 100
                                      )
                                  )}{" "}
                                  <i className="mdi mdi-tag-outline" />
                                  <br />
                                  <span className="regular-price">
                                    ${numberWithCommas(row.price)}{" "}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    <div className="text-danger">
                      Empty item in this category
                    </div>
                  )}
                </div>
              ) : (
                <div className="row no-gutters">
                  {list ? (
                    list.map((row) =>
                      row.products.slice(0, limit).map((row, index) => (
                        <div key={index} className="col-md-4">
                          <div className="item">
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
                                  <span className="veg text-success mdi mdi-circle" />
                                </div>
                                <div className="product-body">
                                  <h5>{row.name}</h5>
                                  {/* <h6>
                                    <strong>
                                      <span className="mdi mdi-approval" />{" "}
                                      Available in
                                    </strong>{" "}
                                    - {row.unitSize}
                                  </h6> */}
                                </div>
                              </Link>
                              <div className="product-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm float-right"
                                  onClick={() => addToCart(row)}
                                >
                                  <i className="mdi mdi-cart-outline" /> Add To
                                  Cart
                                </button>
                                <p className="offer-price mb-0">
                                  $
                                  {numberWithCommas(
                                    row.price -
                                      Math.floor(
                                        (row.price * row.discountPer) / 100
                                      )
                                  )}{" "}
                                  <i className="mdi mdi-tag-outline" />
                                  <br />
                                  <span className="regular-price">
                                    ${numberWithCommas(row.price)}{" "}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    <div className="text-danger">
                      Empty item in this category
                    </div>
                  )}
                </div>
              )}

              <div className="more-product-btn">
                <button
                  className="show-more-btn hover-btn"
                  onClick={onLoadMore}
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* end product section */}
    </div>
  );
};

export default connect(null, { addToCart })(Productview);
