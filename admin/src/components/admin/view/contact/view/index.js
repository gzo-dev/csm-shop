import React, { Fragment, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { GetPaymentDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../../../config1";
import ReplyContact from "./reply_contact";
import delete_contact from "../../../../../api/delete_contact";
import ViewReply from "./view_replied_contact";
import ViewContentReply from "./ViewContentReply";
import { useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import get_list_contact from "../../../../../api/get_list_contact";

const View = () => {
  const { id } = useParams();
  const history = useHistory();
  const [originList, setOriginList] = useState([]);
  const [getList, setGetList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [change, setChange] = useState(false);
  const [selectType, setSelectType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getList.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      await getContact();
    };
    fetchData();
  }, [change]);

  const handleBack = () => {
    history.goBack();
  };
  const [listCheck, setListCheck] = useState([]);
  const handleChange = (item) => {
    if (listCheck.includes(item)) {
      setListCheck(listCheck.filter((item1) => item1 != item));
    } else {
      setListCheck((prev) => [...prev, item]);
    }
  };

  const getContact = async () => {
    const result= await get_list_contact({type: id})
    let list = result.data;
    list = list.filter((item) => item.type == id);
    if (list) {
      setOriginList(list);
      setGetList(list);
      setIsLoaded(false);
    }
  };

  const handlDeleteById = async (id) => {
    swal({
      title: "Bạn có chắc?",
      text: "You want to delete User from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetPaymentDetails.getDeleteUserList(id);
        if (value) {
          NotificationManager.success(value.msg, "Status");
          setTimeout(async function () {
            window.location.reload();
          }, 1000);
        }
      }
    });
  };

  const handleAddNewUser = () => {
    history.push({ pathname: `/admin/user/create` });
  };

  const refreshProduct = () => {
    setGetList(originList);
    setSelectType();
  };

  useEffect(() => {
    if (selectType) {
      setGetList(originList.filter((item) => item.type == selectType));
    }
  }, [selectType]);

  const renderType = (type) => {
    switch (type) {
      case 1:
        return "Bất động sản";
        break;
      case 2:
        return "Đặt tour";
        break;
      case 3:
        return "Hotel/Villa/Homestay";
        break;
      case 4:
        return "Đặt vé máy bay";
        break;
      case 5:
        return "Vé tham quan";
        break;
      case 6:
        return "Đặt vé tàu lửa";
        break;
      default:
        return "Không xác định";
        break;
    }
  };

  const renderStatus = (type) => {
    switch (type) {
      case "waiting for reply":
        return "Chờ phản hồi";
        break;
      case "replied":
        return "Đã phản hồi";
      default:
        return "Không xác định";
        break;
    }
  };

  const renderTrip = (type) => {
    switch (type) {
      case 1:
        return "Một chiều";
        break;
      case 2:
        return "Khứ hồi";
      case 3:
        return "Nhiều chawnjg";

      default:
        return "Không xác định";
        break;
    }
  };

  return (
    <div className="container-fluid">
      {/* <div className="row">
        <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Danh sách liên hệ</h2> 
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div>
      </div> */}
      {/* <ol className="breadcrumb mb-30">
        <li className="breadcrumb-item">Dashboard</li>
        <li className="breadcrumb-item active">voucher</li>
      </ol> */}
      {/* <div className="col-lg-12 col-md-12">
        <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Loại liên hệ
            </InputLabel>
            <Select
              style={{ height: 32 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectType}
              onChange={(e) => setSelectType(e.target.value)}
            >

              <MenuItem
                value={"Đặt phòng khách sạn"}
              >
                {"Đặt phòng khách sạn"}
              </MenuItem>
              <MenuItem
                value={"Cho thuê căn hộ"}
              >
                {"Cho thuê căn hộ"}
              </MenuItem>
              <MenuItem
                value={"Đặt tour"}
              >
                {"Đặt tour"}
              </MenuItem>
              <MenuItem
                value={"Đặt vé máy bay"}
              >
                {"Đặt vé máy bay"}
              </MenuItem>
              <MenuItem
                value={"Đặt vé tàu lửa"}
              >
                {"Đặt vé tàu lửa"}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div> */}
      {/* <div className="col-lg-12 col-md-12 mt-2">
        <Button
          onClick={refreshProduct}
          color={"primary"}
          variant="contained"
        >
          Đặt lại
        </Button>
      </div> */}
      <div className="row justify-content-between">
        <div className="col-lg-12 col-md-12">
          {isLoaded ? <Loader /> : ""}
          <div className="card card-static-2 mt-30 mb-30">
            {/* <div className="card-title-2">
              <h4>Tất cả liên hệ</h4>
            </div> */}
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead >
                    {(parseInt(id) == 4 || parseInt(id) == 6) && (
                      <tr>
                        <th style={{whiteSpace: "nowrap"}} ></th>
                        <th style={{whiteSpace: "nowrap"}} >Tên khách hàng</th>
                        <th style={{whiteSpace: "nowrap"}} >Ngày gửi</th>
                        {/* <th style={{whiteSpace: "nowrap"}} >Loại hình liên hệ</th> */}
                        <th style={{whiteSpace: "nowrap"}} >Ngày đi</th>
                        <th style={{whiteSpace: "nowrap"}} >Ngày đến</th>
                        <th style={{whiteSpace: "nowrap"}} >Điểm đi</th>
                        <th style={{whiteSpace: "nowrap"}} >Điểm đến</th>
                        <th style={{whiteSpace: "nowrap"}} >Số điện thoại</th>
                        <th style={{whiteSpace: "nowrap"}} >Số lượng khách</th>
                        <th style={{whiteSpace: "nowrap"}} >Hành trình</th>
                        <th style={{whiteSpace: "nowrap"}} >Trạng thái</th>
                        <th style={{whiteSpace: "nowrap"}} >Hành động</th>
                      </tr>
                    )}
                    {(parseInt(id) == 1 || parseInt(id) == 3) && (
                      <tr>
                        <th style={{whiteSpace: "nowrap"}} ></th>
                        <th style={{whiteSpace: "nowrap"}} >Tên khách hàng</th>
                        <th style={{whiteSpace: "nowrap"}} >Ngày liên hệ</th>
                        {/* <th style={{whiteSpace: "nowrap"}} >Loại hình liên hệ</th> */}
                        <th style={{whiteSpace: "nowrap"}} >Sản phẩm liên hệ</th>
                        <th style={{whiteSpace: "nowrap"}} >Nội dung</th>
                        <th style={{whiteSpace: "nowrap"}} >Email</th>
                        <th style={{whiteSpace: "nowrap"}} >Số điện thoại</th>
                        <th style={{whiteSpace: "nowrap"}} >Người xử lý</th>
                        <th style={{whiteSpace: "nowrap"}} >Trạng thái</th>
                        <th style={{whiteSpace: "nowrap"}} >Hành động</th>
                      </tr>
                    )}
                    {parseInt(id) == 2 && (
                      <tr>
                        <th style={{whiteSpace: "nowrap"}} ></th>
                        <th style={{whiteSpace: "nowrap"}} >Tên khách hàng</th>
                        <th style={{whiteSpace: "nowrap"}} >Ngày gửi</th>
                        {/* <th style={{whiteSpace: "nowrap"}} >Loại hình liên hệ</th> */}
                        <th style={{whiteSpace: "nowrap"}} >Loại hình</th>
                        <th style={{whiteSpace: "nowrap"}} >Sản phẩm liên hệ</th>
                        <th style={{whiteSpace: "nowrap"}} >Nội dung</th>
                        <th style={{whiteSpace: "nowrap"}} >SĐT</th>
                        <th style={{whiteSpace: "nowrap"}} >Email</th>
                        <th style={{whiteSpace: "nowrap"}} >Trạng thái</th>
                        <th style={{whiteSpace: "nowrap"}} >Hành động</th>
                      </tr>
                    )}
                    {parseInt(id) == 5 && (
                      <tr>
                        <th style={{whiteSpace: "nowrap"}} ></th>
                        <th style={{whiteSpace: "nowrap"}} >Tên khách hàng</th>
                        <th style={{whiteSpace: "nowrap"}} >Ngày gửi</th>
                        {/* <th style={{whiteSpace: "nowrap"}} >Loại hình liên hệ</th> */}
                        <th style={{whiteSpace: "nowrap"}} >Sản phẩm liên hệ</th>
                        <th style={{whiteSpace: "nowrap"}} >Giá vé</th>
                        <th style={{whiteSpace: "nowrap"}} >SĐT</th>
                        <th style={{whiteSpace: "nowrap"}} >Ghi chú</th>
                        <th style={{whiteSpace: "nowrap"}} >Người xử lý</th>
                        <th style={{whiteSpace: "nowrap"}} >Trạng thái</th>
                        <th style={{whiteSpace: "nowrap"}} >Hành động</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {/* Hiển thị danh sách item của trang hiện tại */}
                    {currentItems?.map((row, index) => (
                      <tr key={index}>
                        {(parseInt(id) == 1 || parseInt(id) == 3) && (
                          <Fragment>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            {/* <td>{renderType(parseInt(row.type))}</td> */}
                            <td>{row.product}</td>
                            <td>
                              <p
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: 200,
                                  display: "inline",
                                }}
                              >
                                {row.content}
                              </p>
                            </td>
                            <td>{row.email}</td>
                            <td>{row.phone || "Không xác định"}</td>
                            <td>
                              {(row.user && row.user.firstName) ||
                                "Không xác định"}
                            </td>
                            <td>{renderStatus(row.status)}</td>
                            <td className="action-btns">
                              {row.status === "waiting for reply" ? (
                                <ReplyContact {...row} setChange={setChange} />
                              ) : (
                                <ViewReply {...row} />
                              )}
                              <Link
                                title={"Delete"}
                                className="edit-btn"
                                onClick={() => {
                                  swal("Notice", "Bạn có muốn xóa không ?", {
                                    buttons: {
                                      ok: "OK",
                                      cancel: "Cancel",
                                    },
                                  })
                                    .then(async (value) => {
                                      if (value === "ok") {
                                        const result = await delete_contact(
                                          row.id
                                        );
                                        if (result.ok === true) {
                                          swal(
                                            "Notice",
                                            "Đã xóa thành công",
                                            "success"
                                          ).then(() =>
                                            setChange((prev) => !prev)
                                          );
                                        } else {
                                          swal(
                                            "Notice",
                                            "Xóa thất bại",
                                            "error"
                                          );
                                        }
                                      }
                                    })
                                    .catch(() => {
                                      swal("Notice", "Xóa thất bại", "error");
                                    });
                                }}
                              >
                                <i className="fas fa-trash" />
                              </Link>
                              <ViewContentReply content={row.content} />
                            </td>
                          </Fragment>
                        )}
                        {parseInt(id) == 5 && (
                          <Fragment>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            {/* <td>{renderType(parseInt(row.type))}</td> */}
                            <td>{row.product}</td>
                            <td>{row.price}</td>
                            <td>{row.phone}</td>
                            <td>{row.content || "Không xác định"}</td>
                            <td>
                              {(row.user && row.user.firstName) ||
                                "Không xác định"}
                            </td>
                            <td>{row.status}</td>
                            <td className="action-btns">
                              {row.status === "waiting for reply" ? (
                                <ReplyContact {...row} setChange={setChange} />
                              ) : (
                                <ViewReply {...row} />
                              )}
                              <Link
                                title={"Delete"}
                                className="edit-btn"
                                onClick={() => {
                                  swal("Notice", "Bạn có muốn xóa không ?", {
                                    buttons: {
                                      ok: "OK",
                                      cancel: "Cancel",
                                    },
                                  })
                                    .then(async (value) => {
                                      if (value === "ok") {
                                        const result = await delete_contact(
                                          row.id
                                        );
                                        if (result.ok === true) {
                                          swal(
                                            "Notice",
                                            "Đã xóa thành công",
                                            "success"
                                          ).then(() =>
                                            setChange((prev) => !prev)
                                          );
                                        } else {
                                          swal(
                                            "Notice",
                                            "Xóa thất bại",
                                            "error"
                                          );
                                        }
                                      }
                                    })
                                    .catch(() => {
                                      swal("Notice", "Xóa thất bại", "error");
                                    });
                                }}
                              >
                                <i className="fas fa-trash" />
                              </Link>
                              <ViewContentReply content={row.content} />
                            </td>
                          </Fragment>
                        )}
                        {parseInt(id) == 2 && (
                          <Fragment>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            {/* <td>{renderType(parseInt(row.type))}</td> */}
                            <td>
                              {row.kindof == 1 && "Tour daily"}
                              {row.kindof == 2 && "Tour miền bắc"}
                              {row.kindof == 3 && "Tour miền trung"}
                              {row.kindof == 4 && "Tour miền nam"}
                              {row.kindof == 5 && "Tour tây nguyên"}
                              {row.kindof == 6 && "Tour biển đảo"}
                            </td>
                            <td>{row.product}</td>
                            <td>{row.phone}</td>
                            <td>{row.content || "Không xác định"}</td>
                            <td>
                              {(row.user && row.user.firstName) ||
                                "Không xác định"}
                            </td>
                            <td>{row.status}</td>
                            <td className="action-btns">
                              {row.status === "waiting for reply" ? (
                                <ReplyContact {...row} setChange={setChange} />
                              ) : (
                                <ViewReply {...row} />
                              )}
                              <Link
                                title={"Delete"}
                                className="edit-btn"
                                onClick={() => {
                                  swal("Notice", "Bạn có muốn xóa không ?", {
                                    buttons: {
                                      ok: "OK",
                                      cancel: "Cancel",
                                    },
                                  })
                                    .then(async (value) => {
                                      if (value === "ok") {
                                        const result = await delete_contact(
                                          row.id
                                        );
                                        if (result.ok === true) {
                                          swal(
                                            "Notice",
                                            "Đã xóa thành công",
                                            "success"
                                          ).then(() =>
                                            setChange((prev) => !prev)
                                          );
                                        } else {
                                          swal(
                                            "Notice",
                                            "Xóa thất bại",
                                            "error"
                                          );
                                        }
                                      }
                                    })
                                    .catch(() => {
                                      swal("Notice", "Xóa thất bại", "error");
                                    });
                                }}
                              >
                                <i className="fas fa-trash" />
                              </Link>
                              <ViewContentReply content={row.content} />
                            </td>
                          </Fragment>
                        )}
                        {(parseInt(id) == 4 || parseInt(id) == 6) && (
                          <Fragment>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>{row.name}</td>
                            <td>{row.createdAt}</td>
                            {/* <td>{renderType(parseInt(row.type))}</td> */}
                            <td>
                              {row.kindof == 1 && "Tour daily"}
                              {row.kindof == 2 && "Tour miền bắc"}
                              {row.kindof == 3 && "Tour miền trung"}
                              {row.kindof == 4 && "Tour miền nam"}
                              {row.kindof == 5 && "Tour tây nguyên"}
                              {row.kindof == 6 && "Tour biển đảo"}
                            </td>
                            <td>
                              {row.kindof == 1 && "Tour daily"}
                              {row.kindof == 2 && "Tour miền bắc"}
                              {row.kindof == 3 && "Tour miền trung"}
                              {row.kindof == 4 && "Tour miền nam"}
                              {row.kindof == 5 && "Tour tây nguyên"}
                              {row.kindof == 6 && "Tour biển đảo"}
                            </td>
                            <td>{row.departureText}</td>
                            <td>{row.destinationText}</td>
                            <td>{row.phone}</td>
                            <td>{row.guest}</td>
                            <td>{renderTrip(parseInt(row.trip)) || "Không xác định"}</td>
                            <td>{row.status}</td>
                            <td className="action-btns">
                              {row.status === "waiting for reply" ? (
                                <ReplyContact {...row} setChange={setChange} />
                              ) : (
                                <ViewReply {...row} />
                              )}
                              <Link
                                title={"Delete"}
                                className="edit-btn"
                                onClick={() => {
                                  swal("Notice", "Bạn có muốn xóa không ?", {
                                    buttons: {
                                      ok: "OK",
                                      cancel: "Cancel",
                                    },
                                  })
                                    .then(async (value) => {
                                      if (value === "ok") {
                                        const result = await delete_contact(
                                          row.id
                                        );
                                        if (result.ok === true) {
                                          swal(
                                            "Notice",
                                            "Đã xóa thành công",
                                            "success"
                                          ).then(() =>
                                            setChange((prev) => !prev)
                                          );
                                        } else {
                                          swal(
                                            "Notice",
                                            "Xóa thất bại",
                                            "error"
                                          );
                                        }
                                      }
                                    })
                                    .catch(() => {
                                      swal("Notice", "Xóa thất bại", "error");
                                    });
                                }}
                              >
                                <i className="fas fa-trash" />
                              </Link>
                              <ViewContentReply content={row.content} />
                            </td>
                          </Fragment>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 flex-row-reverse">
            <Pagination
              count={Math.ceil(getList.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
