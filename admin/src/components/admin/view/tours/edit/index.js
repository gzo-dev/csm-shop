import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import AutoSelect from "../../../../common/autoselect";
import { GetLocationDetails, GetProductDetails } from "../../../../services";
import swal from "sweetalert";
import { v4 } from "uuid";
import RichTextEditor from "../../../../RichTextEditor";
import { toast } from "react-toastify";
import Axios from "axios";
import { apiEditTour } from "../../../../../api";
import { useHistory } from "react-router-dom";
import Loading2 from "../../../../loader/loading2";
import get_detail_tour from "../../../../../api/get_detail_tour";

const Arrays = (data, fieldName, fieldValue) => {
  let arrayItem = [];
  if (data && Array.isArray(data)) {
    data.map((item, key) => {
      arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
      return null;
    });
  }
  return arrayItem;
};

const Edit = (props) => {
  const self = props.location.state.row;
  const [files, setFiles] = useState([]);
  const [type, setType] = useState(self.type);
  const [departure, setDeparture] = useState(self.departure);
  const [departureText, setDepartureText] = useState(self.departureText);
  const [destination, setDestination] = useState(self.destination);
  const [destinationText, setDestinationText] = useState(self.destinationText);
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState(self.name);
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(self.price);
  const [discountPer, setDiscountPer] = useState(self.discountPer);
  const [previewImage, setPreviewImage] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [kindof, setKindof] = useState(self.kindof);
  const [desc, setDesc] = useState(self.desc);
  const [childrenPrice, setChildrenPrice] = useState(self.children_price);
  const [agentPrice, setAgentPrice] = useState(self.agent_price);
  const [tourId, setTourId] = useState(self.tour_id);
  const [uid, setUid]= useState(self.id)
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const [photo, setPhoto]= useState()

  useEffect(() => {
    (async () => {
      const result = await get_detail_tour({ id: self.id });
      setContent(result.data[0].content);
    })();
  }, [self]);
  const handleBack = () => {
    // Logic to handle going back
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "status") setStatus(value);
    if (name === "price") setPrice(value);
    if (name === "discountPer") setDiscountPer(value);
    if (name === "children_price") setChildrenPrice(value);
    if (name === "agent_price") setAgentPrice(value);
    if (name === "tour_id") setTourId(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      if (image) {
        console.log(1);
        var formData = new FormData();
        formData.append("file", image);
        const res = await Axios.post(
          "https://api.gzomedia.net/upload.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = await res.data;
        // console.log(imageUrl)
        const data = {
          id: uid,
          tour_id: tourId,
          name,
          status,
          children_price: childrenPrice,
          agent_price: agentPrice,
          price,
          discountPer,
          desc,
          departure,
          departureText,
          destination,
          destinationText,
          content,
          type,
          image: imageUrl.file_path,
          photo: imageUrl.file_path,
          kindof,
        };
        const result = await apiEditTour({ ...data });
        setLoading(false);
        swal("Thông báo", "Cập nhật thành công", "success").then(() =>
          history.goBack()
        );
        console.log(result);
      } else {
        const data = {
          id: uid,
          tour_id: tourId,
          name,
          status,
          children_price: childrenPrice,
          agent_price: agentPrice,
          price,
          discountPer,
          desc,
          departure,
          departureText,
          destination,
          destinationText,
          content,
          type,
          kindof,
        };
        const result = await apiEditTour({ ...data });
        swal("Thông báo", "Cập nhật thành công", "success");
        setLoading(false).then(() => history.goBack());
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleContentChange = (contentHtml) => {
    setContent(contentHtml);
  };

  const fileSelectedHandler = (e) => {
    setFiles(e.target.files);
    const arr = [];
    Object.values(e.target.files).map((item) => console.log(item));

    Object.values(e.target.files).map((item) =>
      arr.push({ preview: URL.createObjectURL(item), id: item.lastModified })
    );
    setPreviewImage(arr);
  };

  const fetchDataFromApi = () => {
    Axios.get("https://vapi.vnappmob.com/api/province")
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

  return (
    <div className="container-fluid">
      {/* <div className="row">
                <div className="col-lg-5 col-md-9 col-lg-6">
                    <h2 className="mt-30 page-title">Tours</h2>
                </div>
                <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                    <Button variant="contained" onClick={handleBack}>
                        <i className="fas fa-arrow-left" /> Back
                    </Button>
                </div>
            </div> */}
      {/* <ol className="breadcrumb mb-30">
                <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                    <a href="#">Tour</a>
                </li>
                <li className="breadcrumb-item active">Thêm Tour</li>
            </ol> */}
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mb-30">
            <div className="card-body-table">
              <div className="news-content-right pd-20">
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Tên tour</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tên tour"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Mã tour</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mã tour"
                        name="tour_id"
                        value={tourId}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Điểm đi</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Điểm đi
                          </InputLabel>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={departure}
                            // value={age}
                            onChange={(e) => setDeparture(e.target.value)}
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
                                  onClick={() => setDepartureText(item.label)}
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
                      <label className="form-label">Điểm đến</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Điểm đến
                          </InputLabel>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={destination}
                            // value={age}
                            onChange={(e) => setDestination(e.target.value)}
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
                                  onClick={() => setDestinationText(item.label)}
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
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">
                        Mô tả các điểm dừng (Hà Nội - Đà Nẵng - ...)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Ảnh đại diện</label>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={onFileChange}
                      />
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
                  {/* <div className="col-lg-2 col-md-2">
                    <div className="form-group">
                      <label className="form-label">Số điện thoại liên hệ*</label>
                      <input
                        style={{ marginTop: 12 }}
                        type="number"
                        className="form-control"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Giá tour</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Giá trẻ em</label>
                      <input
                        type="number"
                        className="form-control"
                        name="children_price"
                        value={childrenPrice}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  {/* <div
                    className="col-lg-1 col-md-1"
                    style={{}}
                  >
                    <div className="form-group">
                      <label className="form-label">Diện tích (nếu có)</label>
                      <input
                        style={{ marginTop: 12 }}
                        type="text"
                        className="form-control"
                        name="square"
                        value={square}
                        onChange={(e) => setSquare(e.target.value)}
                      />
                    </div>
                  </div> */}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Giá đại lý</label>
                      <input
                        type="number"
                        className="form-control"
                        name="agent_price"
                        value={agentPrice}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4" style={{}}>
                    <div className="form-group">
                      <label className="form-label">Giảm giá (Nếu có)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="discountPer"
                        value={discountPer}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {/* <div className="form-group" style={{ opacity: 0 }}>
                    <label className="form-label">Sort Description*</label>
                    <textarea
                      style={{ marginTop: 12 }}
                      rows="4"
                      cols="100"
                      className="form-control"
                      name="sortDesc"
                      value={sortDesc}
                      onChange={(e) => handleChange(e)}
                    />
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="form-label">Mô tả chi tiết tour* </label>
                      
                      <RichTextEditor
                        content={content}
                        handleContentChange={handleContentChange}
                        placeholder="Insert text here..."
                      />
                    </div>
                  </div>
                </div>
                <div className="button_price">
                  <div
                    className="form-group"
                    style={toggle ? { display: "block" } : { display: "none" }}
                  >
                    <button
                      className="save-btn hover-btn"
                      type="submit"
                      onClick={async (e) => {
                        handleSubmit(e);
                      }}
                    >
                      Sửa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading === true && <Loading2 open={loading} setOpen={setLoading} />}
    </div>
  );
};

export default Edit;
