import React, { useState } from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";

const CartSidebar = ({ cartItems, incrementToCart, decreaseToCart, removeFromCart }) => {
  const [toggle, setToggle] = useState(false);

  const handleHide = () => {
    setToggle(!toggle);
  };
  // console.log(cartItems)

  return (
    <div>
      <span data-toggle="offcanvas" className="btn btn-link border-none">
        <i className="mdi mdi-cart" /> My Cart{" "}
        <small className="cart-value">{cartItems.length}</small>
      </span>
      <div className="cart-sidebar">
        <div className="bs-canvas-header side-cart-header p-3 ">
          <div className="d-inline-block  main-cart-title">
            My Cart <span>({cartItems.length} Items)</span>
          </div>
          <button
            type="button"
            className="bs-canvas-close close"
            data-toggle="offcanvas"
          >
            <i className="mdi mdi-close"></i>
          </button>
        </div>
        <div className="cart-sidebar-body">
          {cartItems.map((row, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-product-img">
                <img className="img-fluid" src={row.photo} alt="cart" />
                <div className="offer-badge">{row.discountPer}% OFF</div>
              </div>
              <div className="cart-text">
                <h4>{row.name}</h4>
                <div className="cart-radio">
                  <ul className="kggrm-now">
                    <li>
                      <input type="radio" id="a1" name="cart1" />
                      <label>{row.unitSize}</label>
                    </li>
                  </ul>
                </div>
                <div className="qty-group">
                  <div className="quantity buttons_added">
                    <input
                      type="button"
                      defaultValue="-"
                      className="minus minus-btn"
                      onClick={() => decreaseToCart(row)}
                    />
                    <input
                      type="number"
                      value={row.qty}
                      className="input-text qty text"
                      disabled
                    />
                    <input
                      type="button"
                      defaultValue="+"
                      className="plus plus-btn"
                      onClick={() => incrementToCart(row)}
                    />
                    <button
                      type="button"
                      className="cart-close-btn"
                      onClick={() => removeFromCart(row)}
                    >
                      <i className="mdi mdi-close" />
                    </button>
                  </div>
                  <div className="cart-item-price">
                    VND{row.qty * (row.price - Math.floor(row.price * row.discountPer / 100))}
                    {row.discountPer > 0 
                       &&
                    <span>VND{row.price * row.qty}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-sidebar-footer">
          <div className="cart-store-details">
            <p>
              Sub Total{" "}
              <strong className="float-right">
                VND
                {cartItems.reduce((sum, i) => (sum += i.qty * (i.price - Math.floor(i.price * i.discountPer / 100))), 0)}
              </strong>
            </p>
            {/* <p>
              Delivery Charges{" "}
              <strong className="float-right text-danger">+ 0</strong>
            </p> */}
            <h6>
              Your total savings{" "}
              <strong className="float-right text-danger">
                VND{cartItems.reduce((sum, i) => (sum += i.qty * (i.price - Math.floor(i.price * i.discountPer / 100))), 0)}
              </strong>
            </h6>
          </div>
          {
            <a href="/checkout" style={{opacity: cartItems.length > 0 ? 1 : 0}}>
              <button
                className="btn btn-secondary btn-lg btn-block text-left"
                type="button"
              >
                <span className="float-left">
                  <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                </span>
                <span className="float-right">
                  <strong>
                    VND
                    {cartItems.reduce(
                      (sum, i) => (sum += i.qty * (i.price - Math.floor(i.price * i.discountPer / 100))),
                      0
                    )}
                  </strong>{" "}
                  <span className="mdi mdi-chevron-right" />
                </span>
              </button>
            </a>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, {
  incrementToCart,
  decreaseToCart,
  removeFromCart,
})(CartSidebar);
