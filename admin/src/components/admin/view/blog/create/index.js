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
import { apiCreateBlog } from "../../../../../api";
import { useHistory } from "react-router-dom";
import Loading2 from "../../../../loader/loading2";
import { getCookie } from "../../../../../function";
import { useParams } from "react-router-dom";

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

const Create = () => {
  const {id }= useParams()
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [type, setType] = useState(id);
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
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState();
  const history = useHistory();

  // const [photo, setPhoto]= useState()

  const handleBack = () => {
    // Logic to handle going back
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "status") setStatus(value);
    if (name === "price") setPrice(value);
    if (name === "discountPer") setDiscountPer(value);
  };

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
        discountPer,
        desc,
        content,
        type,
        image: imageUrl.file_path,
        author: getCookie("name"),
      };
      const result = await apiCreateBlog({ ...data });
      setLoading(false);
      swal("Thông báo", "Thêm thành công", "success").then(() =>
        history.push(`/admin/blog/list`)
      );
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
      <Loading2 open={loading} setOpen={setLoading} />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mb-30">
            {/* <div className="card-title-2">
              <h4>Thêm blog</h4>
            </div> */}
            <div className="card-body-table">
              <div className="news-content-right pd-20">
                <div className="row mt-4">
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Tên blog</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tiêu đề blog"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  {/*  */}

                  {/* 
                  <div className="col-lg-2 col-md-2">
                    <div className="form-group">
                      <label className="form-label">Brand*</label>
                      <input
                        style={{ marginTop: 12 }}
                        type="text"
                        className="form-control"
                        placeholder="Brand Name"
                        name="brand"
                        value={brand}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div> */}

                  
                </div>
                {/* <div className="row mt-2 mb-2">
                  <div className="col-lg-2 col-md-2">
                    <div className="form-group">
                      <label className="form-label">Loại blog*</label>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Loại blog
                          </InputLabel>
                          <Select
                            style={{ height: 32 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <MenuItem value={1}>Cẩm nang du lịch</MenuItem>
                            <MenuItem value={2}>Năng lực Minh Khang</MenuItem>
                            <MenuItem value={3}>Đi muôn nơi</MenuItem>
                            <MenuItem value={4}>Tư tưởng cốt lõi</MenuItem>
                            <MenuItem value={5}>Tuyển dụng</MenuItem>
                            <MenuItem value={6}>Hoạt động nội bộ</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                </div> */}
                <div className="row mt-4">
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
                      <label className="form-label">Mô tả blog</label>
                      <input
                        type="text"
                        className="form-control"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4" style={{ paddingTop: "2rem" }}>
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
                <div className="button_price">
                  {/* <div className="form-group">
                      <Button
                        className="checkprice"
                        variant="contained"
                        onClick={() => handleCheckPrice()}
                      >
                        Preview
                      </Button>
                    </div> */}
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

export default Create;
