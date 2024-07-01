import React, { useState, useEffect, Fragment, useContext } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import swal from "sweetalert";
import Axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { apiCreateTicket, apiGetProvince, apiGetWard } from "../api";
import get_all_user_list from "../api/get_all_user_list";
import Loading2 from "../component/Loading2";
import RichTextEditor from "../component/RichTextEditor";
import { SocketContext } from "../SocketContainer/SocketContainer";

const NewTicket = () => {
  const [searchParams]= useSearchParams()
  const token= searchParams.get("token")
  const { socket } = useContext(SocketContext);

  const { id, roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [files, setFiles] = useState([]);
  const [type, setType] = useState(id);
  const [kindof, setKindof] = useState();
  const [departure, setDeparture] = useState();
  const [departureText, setDepartureText] = useState();
  const [destination, setDestination] = useState();
  const [destinationText, setDestinationText] = useState();
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPer, setDiscountPer] = useState(0);
  const [previewImage, setPreviewImage] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [address, setAddress] = useState();
  const [childrenPrice, setChildrenPrice] = useState();
  const [agentPrice, setAgentPrice] = useState();
  const [vehicle, setVehicle] = useState();
  const [bonus, setBonus] = useState();
  const [car, setCar] = useState();
  const [desc, setDesc] = useState();
  const [ticketId, setTicketId] = useState();
  const [province, setProvince] = useState();
  const [listWard, setListWard] = useState([]);
  const [district, setDistrict] = useState();
  const [provinceText, setProvinceText] = useState();
  const [districtText, setDistrictText] = useState();
  const [wardText, setWardText] = useState();
  const [provinceDetail, setProvinceDetail] = useState([]);
  const [ward, setWard] = useState();
  const [buffe, setBuffe] = useState();
  // const [photo, setPhoto]= useState()
  const getprovince = async (code) => {
    const response = await apiGetProvince(code);
    setProvinceDetail(response.results);
  };

  const getdistrict = async (code) => {
    const response = await apiGetWard(code);
    setListWard(response.results);
  };

  useEffect(() => {
    if (province) getprovince(province);
    if (district) getdistrict(district);
  }, [province, district]);

  const [user, setUser] = useState();
  const [listUser, setListUser] = useState([]);
  const getCustomer = async () => {
    let list = await get_all_user_list({}, token);
    if (list) {
      var tdata = list.data;
      setListUser(tdata);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const handleBack = () => {
    // Logic to handle going back
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "status") setStatus(value);
    if (name === "price") setPrice(value);
    if (name === "discountPer") setDiscountPer(value);
    if (name === "ticket_id") {
      setTicketId(value);
    }
    if (name === "children_price") {
      setChildrenPrice(value);
    }
    if (name === "agent_price") {
      setAgentPrice(value);
    }
    if (name === "bonus") {
      setBonus(value);
    }
    if (name === "car") {
      setCar(value);
    }
    if (name === "buffe") {
      setBuffe(value);
    }
    if (name === "desc") {
      setDesc(value);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { roomId });
    }
  }, [socket, roomId]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      var formData = new FormData();
      formData.append("file", image);
      setLoading(true);
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
        name,
        status,
        price,
        children_price: childrenPrice,
        agent_price: agentPrice,
        bonus: bonus,
        ticket_id: ticketId,
        discountPer,
        desc,
        departure,
        departureText,
        destination,
        destinationText,
        content,
        type,
        image: imageUrl.file_path,
        kindof,
        province,
        district,
        ward,
        provinceText,
        districtText,
        wardText,
        buffe,
        car,
      };
      const result = await apiCreateTicket({ ...data });
      setLoading(false);
      swal("Thông báo", "Thêm thành công", "success").then(() => {
        socket.emit("back_to_web", {
          to: "http://localhost:3000",
          roomId,
        });
      });
      console.log(result);
    } catch (error) {
      setLoading(false);
    } finally {
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

  return (
    <div className="container-fluid wrap-item-product">
      <Loading2 open={loading} setOpen={setLoading} />
      {/* <div className="row">
        <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Tours</h2>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div>
      </div>
      <ol className="breadcrumb mb-30">
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
                {/* Done */}
                {parseInt(id) < 4 && (
                  <Fragment>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Tên vé</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tên vé"
                            name="name"
                            value={name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
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
                                {item.firstName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <label className="form-label">Điểm đi*</label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Điểm đi</InputLabel>
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={departure}
                              
                                onChange={(e) => setDeparture(e.target.value)}
                              >
                              
                                {listProvince?.map((item) => ({
                                  ...item,
                                  value: item.province_id,
                                  label: item.province_name,
                                })).map((item, key) => <MenuItem onClick={() => setDepartureText(item.label)} value={item.value} key={key}>{item.label}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div> */}
                      {/*  */}
                      {/* <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <label className="form-label">Điểm đến*</label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Điểm đến</InputLabel>
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                              >
                                {listProvince?.map((item) => ({
                                  ...item,
                                  value: item.province_id,
                                  label: item.province_name,
                                })).map((item, key) => <MenuItem onClick={() => setDestinationText(item.label)} value={item.value} key={key}>{item.label}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div> */}
                      {/*  */}
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label"
                          >
                            Danh mục
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                // value={age}
                                onChange={(e) => setType(e.target.value)}
                                style={{ height: 30 }}
                              >
                                {/* eslint-disable-next-line */}
                                <MenuItem value={1}>
                                  Vé tham quan miền Bắc
                                </MenuItem>
                                <MenuItem value={2}>
                                  Vé tham quan miền Trung
                                </MenuItem>
                                <MenuItem value={3}>
                                  Vé tham quan miền Nam
                                </MenuItem>
                                <MenuItem value={4}>Vé máy bay</MenuItem>
                                <MenuItem value={5}>Vé tàu/xe</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        {/*  */}
                      </div>
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
                                onChange={(e) => setProvince(e.target.value)}
                              >
                                {listProvince
                                  .map((item) => ({
                                    ...item,
                                    value: item.province_id,
                                    label: item.province_name,
                                  }))
                                  .map((item, key) => (
                                    <MenuItem
                                      onClick={() =>
                                        setProvinceText(item.label)
                                      }
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
                          <label className="form-label">Quận / Huyện</label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                              >
                                {provinceDetail
                                  .map((el) => ({
                                    ...el,
                                    value: el.district_id,
                                    label: el.district_name,
                                  }))
                                  .map((item, key) => (
                                    <MenuItem
                                      onClick={() =>
                                        setDistrictText(item.label)
                                      }
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
                                onChange={(e) => setWard(e.target.value)}
                              >
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
                      {parseInt(id) >= 4 && (
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label
                              style={{ marginBottom: 0 }}
                              className="form-label"
                            >
                              Điểm đến
                            </label>
                            <Box sx={{ width: "100%" }}>
                              <FormControl fullWidth>
                                <Select
                                  style={{ height: 32 }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={destination}
                                  onChange={(e) =>
                                    setDestination(e.target.value)
                                  }
                                >
                                  {listProvince
                                    .map((item) => ({
                                      ...item,
                                      value: item.province_id,
                                      label: item.province_name,
                                    }))
                                    .map((item, key) => (
                                      <MenuItem
                                        onClick={() =>
                                          setDestinationText(item.label)
                                        }
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
                      )}
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Vé trẻ em</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Vé trẻ em"
                            name="children_price"
                            value={childrenPrice}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Dịch vụ bổ sung</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Dịch vụ bổ sung"
                            name="bonus"
                            value={bonus}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Xe đưa đón</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Xe đưa đón"
                            name="car"
                            value={car}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">
                            Giá vé (hiển thị)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giá vé (hiển thị)"
                            name="price"
                            value={price}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Mã SP</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mã SP"
                            name="ticket_id"
                            value={ticketId}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Buffe</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Buffe"
                            name="buffe"
                            value={buffe}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">
                            Giảm giá (nếu có)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giảm giá (nếu có)"
                            name="discountPer"
                            value={discountPer}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Giá đại lý</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giá đại lý"
                            name="agent_price"
                            value={agentPrice}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Ảnh vé</label>
                          <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={onFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
                {/* ------ */}
                {parseInt(id) >= 4 && (
                  <Fragment>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Tên vé</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tên vé"
                            name="name"
                            value={name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
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
                                {item.firstName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <label className="form-label">Điểm đi*</label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Điểm đi</InputLabel>
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={departure}
                              
                                onChange={(e) => setDeparture(e.target.value)}
                              >
                              
                                {listProvince?.map((item) => ({
                                  ...item,
                                  value: item.province_id,
                                  label: item.province_name,
                                })).map((item, key) => <MenuItem onClick={() => setDepartureText(item.label)} value={item.value} key={key}>{item.label}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div> */}
                      {/*  */}
                      {/* <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <label className="form-label">Điểm đến*</label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Điểm đến</InputLabel>
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                              >
                                {listProvince?.map((item) => ({
                                  ...item,
                                  value: item.province_id,
                                  label: item.province_name,
                                })).map((item, key) => <MenuItem onClick={() => setDestinationText(item.label)} value={item.value} key={key}>{item.label}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div> */}
                      {/*  */}
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label"
                          >
                            Danh mục
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                        
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                // value={age}
                                onChange={(e) => setType(e.target.value)}
                                style={{ height: 30 }}
                              >
                                {/* eslint-disable-next-line */}
                                <MenuItem value={1}>
                                  Vé tham quan miền Bắc
                                </MenuItem>
                                <MenuItem value={2}>
                                  Vé tham quan miền Trung
                                </MenuItem>
                                <MenuItem value={3}>
                                  Vé tham quan miền Nam
                                </MenuItem>
                                <MenuItem value={4}>Vé máy bay</MenuItem>
                                <MenuItem value={5}>Vé tàu/xe</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        {/*  */}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label
                            className="form-label"
                          >
                            Tỉnh / Thành phố
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                          
                              <Select
                                style={{ height: 32 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)}
                              >
                                {listProvince
                                  .map((item) => ({
                                    ...item,
                                    value: item.province_id,
                                    label: item.province_name,
                                  }))
                                  .map((item, key) => (
                                    <MenuItem
                                      onClick={() =>
                                        setDepartureText(item.label)
                                      }
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
                          <label className="form-label">Dịch vụ bổ sung</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Dịch vụ bổ sung"
                            name="bonus"
                            value={bonus}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Vé trẻ em</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Vé trẻ em"
                            name="children_price"
                            value={childrenPrice}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Mã SP</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mã SP"
                            name="ticket_id"
                            value={ticketId}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">
                            Giá vé (hiển thị)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giá vé (hiển thị)"
                            name="price"
                            value={price}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Giá đại lý</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giá đại lý"
                            name="agent_price"
                            value={agentPrice}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">
                            Giảm giá (nếu có)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Giảm giá (nếu có)"
                            name="discountPer"
                            value={discountPer}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-4">
                        <div className="form-group">
                          <label className="form-label">Ảnh vé</label>
                          <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={onFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
                {/*  */}
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Mô tả ngắn về vé</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mô tả ngắn"
                        name="desc"
                        value={desc}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="row mt-4">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="form-label">Mô tả chi tiết vé</label>
                      <RichTextEditor
                        content={content}
                        handleContentChange={handleContentChange}
                        placeholder="insert text here..."
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
                      Thêm
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

export default NewTicket;
