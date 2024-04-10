import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import AutoSelect from "../../../../common/autoselect";
import {
  GetLocationDetails,
  GetProductDetails,
  GetUserLogin,
} from "../../../../services";
import swal from "sweetalert";
import { v4 } from "uuid";
import RichTextEditor from "../../../../RichTextEditor";
import { toast } from "react-toastify";
import Axios from "axios";
import { apiEditTicket, apiEditTour, apiGetProvince, apiGetWard } from "../../../../../api";
import { useHistory } from "react-router-dom";
import Loading2 from "../../../../loader/loading2";
import { useParams } from "react-router-dom";

const Edit = (props) => {
  const { id } = useParams();
  const self = props.location.state.row;
  const [files, setFiles] = useState([]);
  const [uid, setUid]= useState(self.id)
  const [type, setType] = useState(self.type);
  const [departure, setDeparture] = useState(self.departure);
  const [departureText, setDepartureText] = useState(self.departureText);
  const [destination, setDestination] = useState(self.destination);
  const [destinationText, setDestinationText] = useState(self.destinationText);
  const [childrenPrice, setChildrenPrice] = useState(self.children_price);
  const [agentPrice, setAgentPrice] = useState(self.agent_price);
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState(self.name);
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState();
  const [content, setContent] = useState(self.content);
  const [price, setPrice] = useState(self.price);
  const [discountPer, setDiscountPer] = useState(self.discountPer);
  const [previewImage, setPreviewImage] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [kindof, setKindof] = useState(self.kindof);
  const [desc, setDesc] = useState(self.desc);
  const [bonus, setBonus] = useState(self.bonus);
  const [car, setCar] = useState(self.car);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [ticketId, setTicketId] = useState(self.ticket_id);
  const [province, setProvince] = useState(self.province);
  const [listWard, setListWard] = useState([]);
  const [district, setDistrict] = useState(self.district);
  const [provinceText, setProvinceText] = useState(self.provinceText);
  const [districtText, setDistrictText] = useState(self.districtText);
  const [wardText, setWardText] = useState(self.wardText);
  const [buffe, setBuffe]= useState(self.buffe)
  const [provinceDetail, setProvinceDetail] = useState([]);
  const [ward, setWard] = useState(self.ward);
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
  // const [photo, setPhoto]= useState()
  const [user, setUser] = useState();
  const [listUser, setListUser] = useState([]);
  const getCustomer = async () => {
    let list = await GetUserLogin.getAllUserList();
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
    if (name === "children_price") {
      setChildrenPrice(value);
    }
    if (name === "agent_price") {
      setAgentPrice(value);
    }
    if (name === "ticket_id") {
        setTicketId(value);
    }
    if (name === "buffe") {
        setBuffe(value);
    }
    if (name === "car") {
        setCar(value);
    }
    if(name=== "desc") {
        setDesc(value)
    }
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
          ticket_id: ticketId,
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
          province, district, ward,
          provinceText, districtText, wardText, buffe, car
        };
        const result = await apiEditTicket({ ...data });
        setLoading(false);
        swal("Thông báo", "Cập nhật thành công", "success").then(() =>
          history.push(`/admin/tk/${id}/list`)
        );
      } else {
        const data = {
          id: uid,
          ticket_id: ticketId,
          name,
          children_price: childrenPrice,
          agent_price: agentPrice,
          status,
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
          province, district, ward,
          provinceText, districtText, wardText, buffe, car
        };
        const result = await apiEditTicket({ ...data });
        swal("Thông báo", "Cập nhật thành công", "success");
        setLoading(false).then(() => history.push(`/admin/tk/${id}/list`));
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
    <div className="container-fluid wrap-item-product">
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
                                {item.firstName + " " + item.lastName}
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
                              
                                {listProvince.map((item) => ({
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
                                {listProvince.map((item) => ({
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
                            style={{ marginBottom: 0 }}
                            className="form-label"
                          >
                            Danh mục
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Danh mục
                              </InputLabel>
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
                              <InputLabel id="demo-simple-select-label">
                                Tỉnh / Thành phố
                              </InputLabel>
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
                              <InputLabel id="demo-simple-select-label">
                                Quận / Huyện
                              </InputLabel>
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
                              <InputLabel id="demo-simple-select-label">
                                Xã / Phường
                              </InputLabel>
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
                                <InputLabel id="demo-simple-select-label">
                                  Điểm đến
                                </InputLabel>
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
                                {item.firstName + " " + item.lastName}
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
                              
                                {listProvince.map((item) => ({
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
                                {listProvince.map((item) => ({
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
                            style={{ marginBottom: 0 }}
                            className="form-label"
                          >
                            Danh mục
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Danh mục
                              </InputLabel>
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
                            style={{ marginBottom: 0 }}
                            className="form-label"
                          >
                            Tỉnh / Thành phố
                          </label>
                          <Box sx={{ width: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Tỉnh / Thành phố
                              </InputLabel>
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
