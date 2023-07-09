import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import RichTextEditor from "../../../../RichTextEditor";
import Loader from "../../../../loader";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../../../config1";
import AddSize from "../new-add/add_size";
import { Fragment } from "react";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    let self = this.props.location.state.row;
    let value = self.status === "active" ? 1 : 0;
    this.state = {
      getList: [],
      getsublist: [],
      toggle: true,
      loading: false,
      blockHide: false,
      productId: self.id,
      name: self.name,
      slug: self.slug,
      brand: self.brand,
      status: value,
      unit: self.unitSize,
      image: "",
      content: self.desc,
      buyerPrice: self.buyerPrice,
      price: self.price,
      qty: self.qty,
      discount: self.discount,
      discountPer: self.discountPer,
      total: self.total,
      grand_total: self.netPrice,
      images: [],
      currentIdPhoto: 0,
      size: [],
      photo: self.photo,
      photoTemp: ""
    };
    this.updateSize= this.updateSize.bind(this)
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
    this.setState({ photoTemp: URL.createObjectURL(event.target.files[0])})
  };
  handleContentChange = (contentHtml) => {
    this.setState({
      content: contentHtml,
    });
  };
  
  caculationTable = () => {
    let price = this.state.price;
    let qty = this.state.qty;
    let discountPer = this.state.discountPer;
    if (price > 0 && qty > 0 && discountPer >= 0) {
      let discount = Math.round((price * qty * discountPer) / 100);
      let total = Math.round(price * qty);
      let grand_total = Math.round(price * qty - discount);

      this.setState({
        total: total,
        grand_total: grand_total,
        discount: discount,
      });
    } else {
      NotificationManager.error(
        "Negative value & Zero Price not allowed",
        "Input Field"
      );
    }
  };
  handleCheckPrice() {
    this.caculationTable();
    this.setState({ toggle: !this.state.toggle });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const {
      productId,
      image,
      name,
      /* selectedCategory, selectedSubCategory,selectedChildCategory, */ slug,
      status,
      brand,
      unit,
      content,
      buyerPrice,
      price,
      qty,
      discount,
      discountPer,
      total,
      grand_total,
      images,
      size
    } = this.state;
    const formData = new FormData();
    formData.append("productId", productId);
    // formData.append('categoryId', selectedCategory);
    // formData.append('subCategoryId', selectedSubCategory);
    // formData.append('childCategoryId', selectedChildCategory);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("brand", brand);
    formData.append("status", status);
    formData.append("unitSize", unit);
    formData.append("desc", content);
    formData.append("photo", image);
    formData.append("buyerPrice", buyerPrice);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("discountPer", discountPer);
    formData.append("discount", discount);
    formData.append("total", total);
    formData.append("netPrice", grand_total);
    formData.append("images", JSON.stringify(images))
    formData.append("size", JSON.stringify(size))
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to Update Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.getUpdateProduct(formData, config);
        if (list) {
          this.setState({ loading: false });
          this.props.history.push("/admin/product/list");
        } else {
          NotificationManager.error("Please! Check input field", "Input Field");
        }
      }
    });
  };
  componentDidMount() {
    this.fetchData()
    this.fetchData2()
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.productId != prevState.productId) {
        this.fetchData()
        this.fetchData2()
    }
  }
  fetchData = async () => {
    try {
      const response = await Axios({
        url: API_URL+ "/api/product/photo",
        method: "get",
        params: {
            productId: this.state.productId
        }
      }); // Gọi API để lấy dữ liệu
      const result= response.data
      this.setState({images: result.data})
    } catch (error) {
     
    }
  };
  fetchData2 = async () => {
    try {
      const response = await Axios({
        url: API_URL+ "/api/product/size",
        method: "get",
        params: {
            productId: this.state.productId
        }
      }); // Gọi API để lấy dữ liệu
      const result= response.data
      this.setState({size: result.data})
    } catch (error) {
     
    }
  };

  updateSize(size) {
    this.setState({size})
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/admin/product/create">Products</a>
          </li>
          <li className="breadcrumb-item active">Update Product</li>
        </ol>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Update Product</h4>
              </div>
              <div className="card-body-table">
                {loading ? <Loader /> : ""}
                <div className="news-content-right pd-20">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Product Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Product Name"
                          name="name"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Slug*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Slug"
                          name="slug"
                          value={this.state.slug}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Brand*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Brand Name"
                          name="brand"
                          value={this.state.brand}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Size*</label>
                        <input
                              readOnly
                              type="size"
                              className="form-control"
                              name="image"
                              value={this.state.size.map(item=> item.size)}
                              style={{marginBottom: 12}}
                            />
                            <AddSize isupdate={true} updateSize={this.updateSize} size={this.state.size} />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Category Image*</label>
                        {
                          this.state.photoTemp.length > 0 && 
                          <Fragment>
                            <img
                              src={this.state.photoTemp}
                              className={"mr-3 mb-3"}
                              style={{
                                width: 130,
                                height: 130,
                                borderRadius: 10,
                                objectFit: "cover",
                                marginBottom: 12,
                                marginTop: 12
                              }}
                            />
                            <Button onClick={()=> this.setState({photoTemp: ""})} style={{marginTop: 12}} variant={"contained"} color={"#f00"}>Delete</Button>
                          </Fragment>
                        }
                        {
                          this.state.photoTemp.length <= 0 && 
                          <img
                            src={this.state.photo}
                            className={"mr-3 mb-3"}
                            style={{
                              width: 130,
                              height: 130,
                              borderRadius: 10,
                              objectFit: "cover",
                              marginBottom: 12,
                              marginTop: 12
                            }}
                          />
                        }
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={this.onFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* new */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group w-100">
                      <label className="form-label">Product image*</label>
                      <br />
                      <div
                        className={
                          "d-flex align-items-center g-10 mr-2 flex-wrap mb-3"
                        }
                      >
                         {this.state.images.length > 0 &&
                          this.state.images.map((item, key) => (
                            <div key={key} style={{ position: "relative" }}>
                              <img
                                key={key}
                                src={item.imgUrl}
                                className={"mr-3 mb-3"}
                                style={{
                                  width: 130,
                                  height: 130,
                                  borderRadius: 10,
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                onClick={() => {
                                  this.setState({
                                    images:
                                      this.state.images.filter(
                                        (item2) => item2.id != item.id
                                      ),
                                  });
                                }}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                }}
                              >
                                X
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="row" style={{ paddingTop: "2rem" }}>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Status*</label>
                        <select
                          id="status"
                          name="status"
                          className="form-control"
                          value={this.state.status}
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Cost*</label>
                        <input
                          type="number"
                          className="form-control"
                          name="buyerPrice"
                          value={this.state.buyerPrice}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Price*</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={this.state.price}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Amount*</label>
                        <input
                          type="number"
                          className="form-control"
                          name="qty"
                          value={this.state.qty}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-1 col-md-1"
                      style={{  }}
                    >
                      <div className="form-group">
                        <label className="form-label">Discount(%)*</label>
                        <input
                          type="number"
                          className="form-control"
                          name="discountPer"
                          value={this.state.discountPer}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ paddingTop: "2rem" }}>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label className="form-label">Description*</label>
                        <RichTextEditor
                          content={this.state.content}
                          handleContentChange={this.handleContentChange}
                          placeholder="insert text here..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_price">
                    <div
                      className="form-group"
                      style={
                        this.state.toggle
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <button
                        className="save-btn hover-btn"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
