import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import Axios from "axios";
import { Fragment } from "react";
import _ from "lodash";
import { v4 } from "uuid";
import { useParams, useSearchParams } from "react-router-dom";
import { apiGetProvince, apiGetWard } from "../api";
import { API_URL } from "../config";
import get_all_user_list from "../api/get_all_user_list";
import update_product from "../api/update_product";
import RichTextEditor from "../component/RichTextEditor";
import { SocketContext } from "../SocketContainer/SocketContainer";
import get_detail_product from "../api/get_detail_product";
import Loader from "../component/Loader";

const EditProduct = (props) => {
  const [searchParams]= useSearchParams()
  const token= searchParams.get("token")
  const { socket } = useContext(SocketContext);
  const params= useParams()
  const { id, subid, roomId, uid, search, page } = useParams();
  const [searchT, setSearchT]= useState()
  // const self = props.location.state.row;
  const [self, setSelf] = useState();
  const [getList, setGetList] = useState([]);
  const [getsublist, setGetSubList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [blockHide, setBlockHide] = useState(false);
  const [size, setSize] = useState([]);
  const [image, setImage] = useState();

  const [productId, setProductId] = useState();
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [brand, setBrand] = useState();
  const [status, setStatus] = useState();
  const [unit, setUnit] = useState();
  const [content, setContent] = useState();
  const [buyerPrice, setBuyerPrice] = useState();
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();
  const [discount, setDiscount] = useState();
  const [discountPer, setDiscountPer] = useState();
  const [total, setTotal] = useState();
  const [grand_total, setGrandTotal] = useState();
  const [photo, setPhoto] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [typeRoom, setTypeRoom] = useState();
  const [interior, setInterior] = useState();
  const [square, setSquare] = useState();
  const [endow, setEndow] = useState();
  const [rating, setRating] = useState();
  const [note, setNote] = useState()
  const [user, setUser] = useState();
  const [rent, setRent] = useState();
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [author_phone, setAuthorPhone] = useState();
  const [address, setAddress] = useState();
  const [images, setImages] = useState([]);
  // const [currentIdPhoto, setCurrentIdPhoto] = useState(0);
  const [photoTemp, setPhotoTemp] = useState("");
  const [newAddImage, setNewAddImage] = useState([]);
  // const [newAddImageUrl, setNewAddImageUrl] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  // const [listDictrict, setListDitrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [provinceText, setProvinceText] = useState();
  const [districtText, setDistrictText] = useState();
  const [wardText, setWardText] = useState();
  const [provinceDetail, setProvinceDetail] = useState([]);

  useEffect(()=> {
    if(params?.search) {
      setSearchT("")
    }
    else {
      setSearchT(params?.search)
    }
  }, [params?.search])

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { roomId });
    }
  }, [socket, roomId]);

  const getCustomer = async () => {
    let list = await get_all_user_list({}, token);
    if (list) {
      var tdata = list.data;
      setListUser(tdata);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await get_detail_product({ id: uid });
      setContent(result?.data[0]?.content);
      setSelf(result?.data?.[0]);
    })();
  }, [uid]);

  useEffect(() => {
    // Cập nhật các state dựa trên giá trị mới của `self`
    setProductId(self?.product_id);
    setName(self?.name);
    setSlug(self?.slug);
    setBrand(self?.brand);
    setStatus(self?.status === "active" ? 1 : 0);
    setUnit(self?.unitSize);
    setContent(self?.desc);
    setBuyerPrice(self?.buyerPrice);
    setPrice(self?.price);
    setQty(self?.qty);
    setDiscount(self?.discount);
    setDiscountPer(self?.discountPer);
    setTotal(self?.total);
    setGrandTotal(self?.netPrice);
    setPhoto(self?.photo);
    setPhoneNumber(self?.phoneNumber);
    setTypeRoom(self?.typeRoom);
    setInterior(self?.interior);
    setSquare(self?.square);
    setEndow(self?.endow);
    setRating(self?.rating);
    setNote(self?.note);
    setUser(self?.user_manager);
    setRent(self?.rent ? 1 : 0);
    setProvince(self?.province);
    setDistrict(self?.district);
    setWard(self?.ward);
    setProvinceText(self?.provinceText);
    setDistrictText(self?.districtText);
    setWardText(self?.wardText);
    setAuthorPhone(self?.author_phone);
    setAddress(self?.address);
  }, [self]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "slug":
        setSlug(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "unit":
        setUnit(value);
        break;
      case "buyerPrice":
        setBuyerPrice(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "qty":
        setQty(value);
        break;
      case "discount":
        setDiscount(value);
        break;
      case "discountPer":
        setDiscountPer(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "typeRoom":
        setTypeRoom(value);
        break;

      case "interior":
        setInterior(value);
        break;
      case "square":
        setSquare(value);
        break;
      case "rating":
        setRating(value);
        break;
      case "note":
        setNote(value);
        break;
      case "user_manager":
        setUser(value);
        break;
      case "rent":
        setRent(parseInt(value));
        break;
      case "author_phone":
        setAuthorPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "product_id":
        setProductId(value);
        break;
      default:
        break;
    }
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
    setPhotoTemp(URL.createObjectURL(event.target.files[0]));
  };

  const handleContentChange = (contentHtml) => {
    setContent(contentHtml);
  };

  // const handleCheckPrice = () => {
  //   calculationTable();
  //   setToggle(!toggle);
  // };
  const handleUploadGzo = async () => {
    if(parseInt(id)=== 12 ) {
      const formData = new FormData();
      formData.append("file", image);
      setLoading(true);
      const res = await Axios.post(API_URL + "/api/v1/watermark", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = await res.data;
      return imageUrl;
    }
    else if(parseInt(id)=== 13) {
      const formData = new FormData();
      formData.append("file", image);
      setLoading(true);
      const res = await Axios.post("https://api.gzomedia.net/upload.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = await res.data;
      return imageUrl;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let photoProduct;
    if (image) {
      const imageResult = await handleUploadGzo();
      photoProduct = imageResult.file_path;
    } else {
      photoProduct = photo;
    }
    const formData = new FormData();
    formData.append("productId", uid);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("brand", brand);
    formData.append("status", status);
    formData.append("unitSize", unit);
    formData.append("desc", content);
    formData.append("photo", photoProduct);
    formData.append("buyerPrice", buyerPrice);
    formData.append("price", price);
    formData.append("qty", _.sumBy(size, "amount"));
    formData.append("discountPer", discountPer);
    formData.append("discount", discount);
    formData.append("total", total);
    formData.append("netPrice", grand_total);
    formData.append("images", JSON.stringify(images));
    formData.append("size", JSON.stringify(size));
    formData.append("phoneNumber", phoneNumber);
    formData.append("typeRoom", typeRoom);
    formData.append("interior", interior);
    formData.append("square", square);
    formData.append("endow", endow);
    formData.append("rating", rating);
    formData.append("note", note);
    formData.append("user_manager", user);
    formData.append("rent", rent);
    formData.append("province", province);
    formData.append("district", district);
    formData.append("ward", ward);
    formData.append("provinceText", provinceText);
    formData.append("districtText", districtText);
    formData.append("wardText", wardText);
    formData.append("author_phone", author_phone);
    formData.append("address", address);
    formData.append("product_id", productId);

    swal({
      title: "Bạn có chắc?",
      text: "Bạn có chắc muốn cập nhật sản phẩm này ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (success) => {
        if (success === null) {
          setLoading(false);
          return null;
        }
        if (success) {
          const imgList = await uploadImages(newAddImage);
          formData.append("newaddimage", JSON.stringify(imgList));
          let list = await update_product(formData, token);
          if (list) {
            setLoading(false);
            swal("Thông báo", "Cập nhật thành công", "success").then(() => {
              socket.emit("back_to_web", {
                to: "http://localhost:3000",
                roomId,
                search: searchT,
                page
              });
            });
          } else {
            NotificationManager.error("Có lỗi xảy ra, Vui lòng thử lại");
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        swal("Thông báo", "Mã token đã hết hạn, bạn vui lòng đăng nhập lại để lấy token mới")
      });
  };

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: API_URL + "/api/product/photo",
        method: "get",
        params: {
          productId: uid,
        },
      });
      const result = response.data;
      setImages(result.data);
    } catch (error) {}
  };

  const fetchData2 = async () => {
    try {
      const response = await Axios({
        url: API_URL + "/api/product/size",
        method: "get",
        params: {
          productId: uid,
        },
      });
      const result = response.data;
      setSize(result.data);
    } catch (error) {}
  };

  // const cloudinaryConfig = {
  //   cloud_name: "cockbook",
  //   upload_preset: "uem2kud5",
  // };
  const uploadImageToServer = async (imageObject) => {
    try {
      if (parseInt(id) === 13) {
        const { image } = imageObject;
        const formData = new FormData();
        formData.append("file", image);
        const response = await Axios.post(
          // `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
          `https://api.gzomedia.net/upload.php`,
          formData
        );

        const imageUrl = response.data.file_path;

        return {
          ...imageObject,
          imageUrl,
        };
      }
      if (parseInt(id) === 12) {
        const { image } = imageObject;
        const formData = new FormData();
        formData.append("file", image);

        const response = await Axios.post(
          API_URL + "/api/v1/watermark",
          formData
        );

        const imageUrl = response.data.file_path;

        return {
          ...imageObject,
          imageUrl,
        };
      }
    } catch (error) {
      console.error("Lỗi khi upload hình ảnh:", error);
      return imageObject;
    }
  };

  const uploadImages = async (imageObjects) => {
    const uploadedImages = await Promise.all(
      imageObjects.map((imageObject) => uploadImageToServer(imageObject))
    );

    return uploadedImages;
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, [productId]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getprovince = async (code) => {
    const response = await apiGetProvince(code);
    setProvinceDetail(response.results);
  };

  const getdistrict = async (code) => {
    const response = await apiGetWard(code);
    setListWard(response.results);
  };

  const fetchDataFromApi = () => {
    Axios.get("https://province.minhkhanggroup.vn/api/v1/province")
      .then((response) => {
        setListProvince(response.data.results);
      })
      .catch((error) => {
        setListProvince(null);
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (province) getprovince(province);
    if (district) getdistrict(district);
  }, [province, district]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mb-30">
            {/* <div className="card-title-2">
              <h4>Update Product</h4>
            </div> */}
            <div className="card-body-table">
            {loading ? <Loader /> : ""}
              <div className="news-content-right pd-20">
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Tên sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tên sản phẩm"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Người quản lý</label>
                        <select
                          id="user_manager"
                          name="user_manager"
                          className="form-control"
                          value={user}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value={undefined}>Chọn người quản lý</option>
                          {listUser.map((item, key) => (
                            <option value={item.id} key={key}>
                              {item.firstName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Mã sản phẩm</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mã sản phẩm"
                          name="product_id"
                          value={productId}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Địa chỉ chi tiết</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Địa chỉ"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Giá phòng</label>
                        <input
                          placeholder="Giá phòng"
                          type="text"
                          className="form-control"
                          name="price"
                          value={price}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Tỉnh / Thành phố</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={province}
                            // value={age}
                            onChange={(e) => setProvince(e.target.value)}
                          >
                            {/* eslint-disable-next-line */}
                            {listProvince
                              .map((item) => ({
                                ...item,
                                value: item.province_id,
                                label: item.province_name,
                              }))
                              .map((item, key) => (
                                <MenuItem
                                  onClick={() => setProvinceText(item.label)}
                                  value={item.value}
                                  key={key}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Quận / Huyện</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={district}
                            // value={age}
                            onChange={(e) => setDistrict(e.target.value)}
                          >
                            {/* eslint-disable-next-line */}
                            {provinceDetail
                              .map((el) => ({
                                ...el,
                                value: el.district_id,
                                label: el.district_name,
                              }))
                              .map((item, key) => (
                                <MenuItem

                                  onClick={() => setDistrictText(item.label)}
                                  value={item.value}
                                  key={key}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Phường / Xã</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ward}
                            // value={age}
                            onChange={(e) => setWard(e.target.value)}
                          >
                            {/* eslint-disable-next-line */}
                            {listWard
                              .map((el) => ({
                                ...el,
                                value: el.ward_id,
                                label: el.ward_name,
                              }))
                              .map((item, key) => (
                                <MenuItem
                                  onClick={() => setWardText(item.label)}
                                  value={item.value}
                                  key={key}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {/* <div className="col-lg-2 col-md-2">
                    <div className="form-group">
                      <label className="form-label">Trạng thái*</label>
                      <select
                        style={{ marginTop: 12 }}
                        id="status"
                        name="status"
                        className="form-control"
                        value={status}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">
                        Số điện thoại liên hệ
                      </label>
                      <input
                        type="text"
                        placeholder="Số điện thoại liên hệ"
                        className="form-control"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Hạng phòng</label>
                        <select
                          id="typeRoom"
                          name="typeRoom"
                          className="form-control"
                          value={typeRoom}
                          onChange={(e) => setTypeRoom(e.target.value)}
                        >
                          {/* <option value={1}>1 phòng ngủ</option>
                          <option value={2}>2 phòng ngủ</option>
                          <option value={3}>3 phòng ngủ</option>
                          <option value={4}>4 phòng ngủ</option>
                          <option value={5}>5 phòng ngủ</option>
                          <option value={6}>5+ phòng ngủ</option>
                          <option value={7}>Nhà nguyên căn</option>
                          <option value={8}>Phòng trọ</option>
                          <option value={9}>Chung cư cao cấp</option>
                          <option value={10}>Penhouse</option>
                          <option value={11}>Studio</option> */}
                          <option value={12}>Deluxe</option>
                          <option value={13}>Suite Double</option>
                          <option value={14}>Classic Double</option>
                          <option value={15}>Premier Deluxe</option>
                          <option value={16}>Ocean Penthouse</option>
                          <option value={17}>Grand Suites</option>
                          <option value={18}>Superior</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">
                          Số điện thoại chủ nhà
                        </label>
                        <input
                          placeholder="Số điện thoại chủ nhà"
                          type="text"
                          className="form-control"
                          name="author_phone"
                          value={author_phone}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Số sao</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Số sao"
                          name="rating"
                          value={rating}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Địa chỉ chủ</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Địa chỉ"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row mt-4">
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Giá phòng</label>
                        <input
                          placeholder="Giá phòng"
                          className="form-control"
                          name="price"
                          value={price}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Nội thất</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nội thất"
                          name="interior"
                          value={interior}
                          onChange={(e) => setInterior(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 12 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Ghi chú</label>
                        <input
                          className="form-control"
                          name="note"
                          value={note}
                          placeholder="Ghi chú"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">
                          Diện tích (m<sup>2</sup>)
                        </label>
                        <input
                          className="form-control"
                          placeholder="Diện tích"
                          name="square"
                          value={square}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Danh mục</label>
                      <select
                        id="endow"
                        name="endow"
                        className="form-control"
                        value={endow}
                        onChange={(e) => setEndow(e.target.value)}
                      >
                        <option value={0}>Không</option>
                        <option value={1}>Hot</option>
                        <option value={2}>Ưu đãi</option>
                        <option value={3}>Bán chạy</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Giảm giá (nếu có)</label>
                      <input
                        className="form-control"
                        name="discountPer"
                        value={discountPer}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Ghi chú</label>
                        <input
                          className="form-control"
                          name="note"
                          value={note}
                          placeholder="Ghi chú"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                  {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Loại phòng</label>
                        <select
                          id="typeRoom"
                          name="typeRoom"
                          className="form-control"
                          value={typeRoom}
                          onChange={(e) => setTypeRoom(e.target.value)}
                        >
                          <option value={undefined} selected>Chọn loại phòng</option>
                          <option value={1}>1 phòng ngủ</option>
                          <option value={2}>2 phòng ngủ</option>
                          <option value={3}>3 phòng ngủ</option>
                          <option value={4}>4 phòng ngủ</option>
                          <option value={7}>Duplex</option>
                          <option value={8}>Phòng trọ</option>
                          <option value={9}>Chung cư cao cấp</option>
                          <option value={10}>Penhouse</option>
                          <option value={11}>Studio</option>
                          {/* <option value={12}>Deluxe</option>
                          <option value={13}>Suite Double</option>
                          <option value={14}>Classic Double</option>
                          <option value={15}>Premier Deluxe</option>
                          <option value={16}>Ocean Penthouse</option>
                          <option value={17}>Grand Suites</option>
                          <option value={18}>Superior</option> */}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4" style={{}}>
                    <div className="form-group">
                      <label className="form-label">Tình trạng</label>
                      <select
                        id="rent"
                        name="rent"
                        className="form-control"
                        value={rent}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value={0}>Chưa thuê</option>
                        <option value={1}>Đã thuê</option>
                        <option value={2}>Sắp trống</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {/* {id == 13 && (
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Người quản lý</label>
                        <select
                          id="user_manager"
                          name="user_manager"
                          className="form-control"
                          value={user}
                          onChange={(e) => handleChange(e)}
                        >
                          {listUser.map((item, key) => (
                            <option value={item.id} key={key}>
                              {item.firstName + " " + (item.lastName || "")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )} */}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label className="form-label">Ảnh đại diện</label>
                      <div>
                        {photoTemp.length > 0 ? (
                          <Fragment>
                            <img
                              alt=""
                              src={photoTemp}
                              className={"mr-3 mb-3"}
                              style={{
                                width: 130,
                                height: 130,
                                borderRadius: 10,
                                objectFit: "cover",
                                marginBottom: 12,
                                marginTop: 12,
                              }}
                            />
                            <Button
                              onClick={() => setPhotoTemp("")}
                              style={{ marginTop: 12 }}
                              // color={"#f00"}
                              variant={"contained"}
                            >
                              Delete
                            </Button>
                          </Fragment>
                        ) : (
                          <img
                            alt=""
                            src={photo}
                            className={"mr-3 mb-3"}
                            style={{
                              width: 130,
                              height: 130,
                              borderRadius: 10,
                              objectFit: "cover",
                              marginBottom: 12,
                              marginTop: 12,
                            }}
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={onFileChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group w-100 mt-3">
                      <label className="form-label">Ảnh sản phẩm*</label>
                      <br />
                      <div className={""}>
                        <Grid container spacing={2}>
                          {images.length > 0 &&
                            images.map((item, key) => (
                              <Grid item key={key} xs={3}>
                                <div
                                  key={key}
                                  style={{
                                    position: "relative",
                                    aspectRatio: "1",
                                  }}
                                >
                                  <img
                                    key={key}
                                    src={item.imgUrl}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: 10,
                                      objectFit: "cover",
                                    }}
                                  />
                                  <button
                                    onClick={() => {
                                      setImages(
                                        images.filter(
                                          (item2) => item2.id !== item.id
                                        )
                                      );
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
                              </Grid>
                            ))}
                          {newAddImage.map((item, key) => (
                            <Grid item key={key} xs={3}>
                              <div
                                key={key}
                                style={{
                                  position: "relative",
                                  aspectRatio: "1",
                                }}
                              >
                                <img
                                  src={item.previewUrl}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                    objectFit: "cover",
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    setNewAddImage(
                                      newAddImage.filter(
                                        (item2) => item2.id !== item.id
                                      )
                                    );
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
                            </Grid>
                          ))}
                          <Grid item xs={3}>
                            <div
                              style={{
                                height: "100%",
                                borderRadius: 10,
                                objectFit: "cover",
                                backgroundColor: "#f2f0f5",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                aspectRatio: "1",
                              }}
                            >
                              <input
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  opacity: 0,
                                }}
                                multiple
                                type="file"
                                onChange={(e) => {
                                  e.persist();
                                  const files = e.target.files; // Lấy danh sách các tệp được chọn
                                  const newImages = Array.from(files).map(
                                    (file) => ({
                                      id: v4(),
                                      previewUrl: URL.createObjectURL(file),
                                      image: file,
                                    })
                                  );
                                  setNewAddImage((prev) => [
                                    ...prev,
                                    ...newImages,
                                  ]);
                                }}
                              />
                              Thêm ảnh
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                  {/* new */}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="form-label">Mô tả chi tiết</label>
                      <RichTextEditor
                        content={content}
                        handleContentChange={handleContentChange}
                        placeholder="insert text here..."
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="button_price">
                  <div
                    className="form-group"
                    style={toggle ? { display: "block" } : { display: "none" }}
                  >
                    <button
                      className="save-btn hover-btn"
                      type="submit"
                      onClick={handleSubmit}
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
};

export default EditProduct;
