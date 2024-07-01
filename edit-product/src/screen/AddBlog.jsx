import React, { useState, useEffect, useContext } from "react";
import {
  // Box,
  // Button,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
} from "@mui/material";
import swal from "sweetalert";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading2 from "../component/Loading2";
import { apiCreateBlog } from "../api";
import RichTextEditor from "../component/RichTextEditor";
import { SocketContext } from "../SocketContainer/SocketContainer";

const NewBlog = () => {
  const [searchParams]= useSearchParams()
  const token= searchParams.get("token")
  const { socket } = useContext(SocketContext);

  const { id, uid, roomId } = useParams();
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
  // const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "status") setStatus(value);
    if (name === "price") setPrice(value);
    if (name === "discountPer") setDiscountPer(value);
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
        discountPer,
        desc,
        content,
        type,
        image: imageUrl.file_path,
        user_author: uid,
        // author: getCookie("name"),
      };
      const result = await apiCreateBlog({ ...data }, token);
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
                </div>
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

export default NewBlog;
