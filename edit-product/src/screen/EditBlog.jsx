import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import Axios from "axios";
import { apiEditBlog } from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "../SocketContainer/SocketContainer";
import RichTextEditor from "../component/RichTextEditor";
import get_detail_blog from "../api/get_detail_blog";

const EditBlog = (props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { socket } = useContext(SocketContext);
  const { id, uid, roomId } = useParams();
  const [changeImage, setChangeImage] = useState(false);
  const [self, setSelf] = useState();
  // const navigate = useNavigate();
  const [status, setStatus] = useState(1);
  // const [files, setFiles] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [discountPer, setDiscountPer] = useState();
  // const [previewImage, setPreviewImage] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
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
    if (name === "meta_description") {
      setMetaDescription(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (changeImage) {
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
          name,
          status,
          price,
          discountPer,
          desc,
          content,
          type,
          image: imageUrl.file_path,
          photo: imageUrl.file_path,
          meta_description: metaDescription,
        };
        const result = await apiEditBlog({ ...data }, token);
        swal("Thông báo", "Cập nhật thành công", "success").then(() =>
          // history.goBack()
          {
            socket.emit("back_to_web", { to: "http://localhost:3000", roomId });
          }
        );
        console.log(result);
      } else {
        const data = {
          id: self.id,
          name,
          status,
          price,
          discountPer,
          desc,
          content,
          type,
          image: self.photo,
          photo: self.photo,
          meta_description: metaDescription,
        };
        const result = await apiEditBlog({ ...data }, token);
        swal("Thông báo", "Cập nhật thành công", "success").then(() => {
          socket.emit("back_to_web", { to: "http://localhost:3000", roomId });
        });
        console.log(result);
      }
    } catch (error) {
      swal(
        "Thông báo",
        "Mã token đã hết hạn, bạn vui lòng đăng nhập lại để lấy token mới"
      );
    }
  };

  const onFileChange = (event) => {
    console.log(event.target);
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setChangeImage(true);
      setImage(event.target.files[0]);
    } else {
      setChangeImage(false);
    }
  };

  const handleContentChange = (contentHtml) => {
    setContent(contentHtml);
  };

  // const fileSelectedHandler = (e) => {
  //   setFiles(e.target.files);
  //   const arr = [];
  //   Object.values(e.target.files).map((item) => console.log(item));

  //   Object.values(e.target.files).map((item) =>
  //     arr.push({ preview: URL.createObjectURL(item), id: item.lastModified })
  //   );
  //   setPreviewImage(arr);
  // };

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
    (async () => {
      const result = await get_detail_blog({ id: uid });
      setContent(result?.data[0]?.content);
      setSelf(result?.data?.[0]);
    })();
  }, [uid]);

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { roomId });
    }
  }, [socket, roomId]);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    setType(self?.type);
    setName(self?.name);
    setContent(self?.content);
    setPrice(self?.price);
    setDesc(self?.desc);
    setDiscountPer(self?.discountPer);
    setMetaDescription(self?.meta_description)
  }, [self]);

  return (
    <div className="container-fluid wrap-item-product">
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
                      Sửa
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

export default EditBlog;
