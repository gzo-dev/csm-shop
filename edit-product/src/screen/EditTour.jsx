import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import swal from "sweetalert";
import Axios from "axios";
// import { apiEditTour } from "../../../../../api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import get_detail_tour from "../api/get_detail_tour";
import RichTextEditor from "../component/RichTextEditor";
import { apiEditTour } from "../api";
import "react-quill/dist/quill.snow.css";
import { SocketContext } from "../SocketContainer/SocketContainer";

const EditTour = (props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { socket } = useContext(SocketContext);
  const { uid, roomId } = useParams();
  const [self, setSelf] = useState();
  const [files, setFiles] = useState([]);
  const [type, setType] = useState(self?.type);
  const [departure, setDeparture] = useState(null);
  const [departureText, setDepartureText] = useState(self?.departureText);
  const [destination, setDestination] = useState(null);
  const [destinationText, setDestinationText] = useState(self?.destinationText);
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState(self?.name);
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(self?.price);
  const [discountPer, setDiscountPer] = useState(self?.discountPer);
  const [previewImage, setPreviewImage] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [kindof, setKindof] = useState(self?.kindof);
  const [desc, setDesc] = useState(self?.desc);
  const [childrenPrice, setChildrenPrice] = useState(self?.children_price);
  const [agentPrice, setAgentPrice] = useState(self?.agent_price);
  const [tourId, setTourId] = useState(self?.tour_id);
  const [car, setCar] = useState(self?.car);
  const [timeText, setTimeText] = useState(self?.timeText);
  const [loading, setLoading] = useState(false);
  const [metaDescription, setMetaDescription] = useState("");
  const history = useNavigate();
  // const [photo, setPhoto]= useState()

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { roomId });
    }
  }, [socket, roomId]);

  useEffect(() => {
    (async () => {
      const result = await get_detail_tour({ id: uid });
      setContent(result?.data[0]?.content);
      setSelf(result?.data?.[0]);
    })();
  }, [uid]);

  useEffect(() => {
    setDeparture(self?.departure);
    setName(self?.name);
    setDepartureText(self?.departureText);
    setDestination(self?.destination);
    setDestinationText(self?.destinationText);
    setType(self?.type);
    setPrice(self?.price);
    setDiscountPer(self?.discountPer);
    setTourId(self?.tour_id);
    setTimeText(self?.timeText);
    setCar(self?.car);
    setKindof(self?.kindof);
    setDesc(self?.desc);
    setChildrenPrice(self?.children_price);
    setAgentPrice(self?.agent_price);
    setMetaDescription(self?.meta_description);
  }, [self]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "status") setStatus(value);
    if (name === "price") setPrice(value);
    if (name === "discountPer") setDiscountPer(value);
    if (name === "children_price") setChildrenPrice(value);
    if (name === "agent_price") setAgentPrice(value);
    if (name === "tour_id") setTourId(value);
    if (name === "car") setCar(value);
    if (name === "timeText") setTimeText(value);
    if (name === "meta_description") {
      setMetaDescription(value);
    }
  };

  const handleSubmit = async (event, is_draft) => {
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
          car,
          timeText,
          meta_description: metaDescription,
        };
        let isDraft
        if(is_draft== -1) {
          isDraft= self.is_draft
        }
        else {
          isDraft= is_draft
        }
        const result = await apiEditTour({ ...data, is_draft: isDraft }, token);
        setLoading(false);
        // socket.emit("back_to_web", {to: "http://localhost:3000", roomId})
        swal("Thông báo", "Cập nhật thành công", "success").then(() => {
          // history(-1)
          socket.emit("back_to_web", { to: "http://localhost:3000", roomId });
        });
      } else {
        const data = {
          id: uid,
          tour_id: tourId,
          name,
          status,
          children_price: parseInt(childrenPrice),
          agent_price: parseInt(agentPrice),
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
          car,
          timeText,
          meta_description: metaDescription,
        };
        let isDraft
        if(is_draft== -1) {
          isDraft= self.is_draft
        }
        else {
          isDraft= is_draft
        }
        const result = await apiEditTour({ ...data, is_draft: isDraft }, token);
        swal("Thông báo", "Cập nhật thành công", "success").then(() => {
          socket.emit("back_to_web", { to: "http://localhost:3000", roomId });
        });

        // setLoading(false).then(() => {
        // });
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
    if (socket) {
      socket.on("to_website", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

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
                      <label className="form-label">
                        Mô tả thẻ meta description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mô tả meta description"
                        name="meta_description"
                        value={metaDescription}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
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
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Phương tiện</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phương tiện"
                        name="car"
                        value={car}
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
                          {/* <InputLabel id="demo-simple-select-label">
                            Điểm đi
                          </InputLabel> */}
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
                                  value={parseInt(item.value)}
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
                          {/* <InputLabel id="demo-simple-select-label">
                            Điểm đến
                          </InputLabel> */}
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
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Thời gian</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Thời gian"
                        name="timeText"
                        value={timeText}
                        onChange={(e) => handleChange(e)}
                      />
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
                      <label className="form-label">
                        Mô tả chi tiết tour*{" "}
                      </label>

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
                        handleSubmit(e, -1);
                      }}
                    >
                      Sửa
                    </button>
                    {self?.is_draft && 
                      <button
                        className="save-btn hover-btn"
                        type="submit"
                        onClick={(e)=> handleSubmit(e, false)}
                      >
                        Đăng bài
                      </button>
                    }
                    {!self?.is_draft && 
                      <button
                        className="save-btn hover-btn"
                        type="submit"
                        onClick={(e)=> handleSubmit(e, true)}
                      >
                        Lưu bài viết dưới dạng bản nháp
                      </button>
                    }
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

export default EditTour;
