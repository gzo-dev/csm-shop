import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import Loader from "../../../../loader";
import Pagination from "@material-ui/lab/Pagination";
// import Pagination from "./Pagination";
import "./View.css";
import { IoIosSearch } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { getCookie } from "../../../../../function";
import useQuery from "../../../../../util/useQuery";
const View = ({ history }) => {
  const role = getCookie("role");
  const query = useQuery();
  const [listSearch, setListSearch] = useState([]);
  const [getList, setGetList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [orgtableData, setOrgtableData] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const handlePageChange = (event, value) => {
    // setCurrentPage(value);
    history.push("/admin/user/list?page=" + value);
  };
  useEffect(() => {
    if (parseInt(query.get("page")) >= 1) {
      setCurrentPage(parseInt(query.get("page")));
    } else {
      setCurrentPage(1);
    }
  }, [query.get("page"), currentPage]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      await getCustomer();
    };
    fetchData();
  }, []);

  const getCustomer = async () => {
    let list = await GetUserLogin.getAllUserList();
    if (list) {
      var tdata = list.data;
      setGetList(list.data);
      setOrgtableData(tdata);
      setIsLoaded(false);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value.length <= 0) {
      setGetList(orgtableData);
    }
    if (!searchText) {
      setGetList(orgtableData); // Hiển thị toàn bộ danh sách nếu không có từ khóa tìm kiếm
      return;
    }

    const filteredList = orgtableData.filter((item) =>
      (item.firstName.toLowerCase().includes(searchText.toLowerCase()))
    );
    console.log(filteredList);

    setListSearch(filteredList);
  };

  const handleSearch = () => {
    if (!searchText) {
      setGetList(orgtableData); // Hiển thị toàn bộ danh sách nếu không có từ khóa tìm kiếm
      return;
    }

    const filteredList = orgtableData.filter((item) =>
      item.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filteredList);
    setListSearch(filteredList);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handlDeleteById = (id) => {
    swal({
      title: "Bạn có chắc?",
      text: "You want to delete User from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetUserLogin.getDeleteUserList(id);
        if (value) {
          NotificationManager.success(value.msg, "Status");
          setTimeout(async function () {
            window.location.reload();
          }, 1000);
        }
      }
    });
  };

  const handlEditRow = (row) => {
    history.push({
      pathname: `/admin/user/edit/${row.id}`,
      state: row,
    });
  };

  const handleAddNewUser = () => {
    history.push({ pathname: `/admin/user/create` });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getList.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(indexOfFirstItem, indexOfLastItem)
  const handleClick = () => {
    history.push({ pathname: "/admin/user/create" });
  };
  const handleChange = (e) => {
    setSelectedRole(e.target.value);
    console.log(e.target.value);
    console.log(orgtableData);
    setGetList(
      orgtableData.filter(
        (item) => item.role == e.target.value
      )
    );
  };

  const renderRole = (role) => {
    if (role == "leader") {
      return "Quản lý";
    }
    if (role == "employee") {
      return "Nhân viên";
    }
    if (role == "operator") {
      return "Tổng đài viên";
    }
    if (role == "fulltime") {
      return "Full time";
    }
    if (role == "marketing") {
      return "Marketing";
    }
    if (role == "ceo") {
      return "CEO";
    }
    if (role == "admin") {
      return "Admin";
    }
    if (role == "parttime") {
      return "Part time";
    } else return role;
  };

  const renderName = (row) => {
    if (row.role == "leader") {
      return `${row.firstName}`;
    }

    if (row.role == "operator") {
      return `${row.firstName}`;
    }
    if (row.role == "fulltime") {
      return `${row.firstName}`;
    }
    if (row.role == "marketing") {
      return `${row.firstName}`;
    }
    if (row.role == "ceo") {
      return `${row.firstName}`;
    }
    if (row.role == "admin") {
      return "Admin";
    }
    if (row.role == "employee") {
      return `${row.firstName} | ${
        row.userManager ? row.userManager.firstName : "Chưa thiết lập người quản lý"
      }`;
    }
    if (row.role == "parttime") {
      return `${row.firstName}`;
    } else return row?.firstName;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Quản lý người dùng hệ thống</h2>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div> */}
      </div>
      {/* <ol className="breadcrumb mb-30">
        <li className="breadcrumb-item">Dashboard</li>
        <li className="breadcrumb-item active">Người dùng</li>
      </ol> */}
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div
              className="col-lg-4 col-md-4 d-flex align-items-center pl-4"
              style={{ position: "relative" }}
            >
              <br />
              <input
                className="inp-mk"
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1px solid #e7e7e7",
                  borderRadius: 80,
                  padding: 10,
                  color: "#fff",
                  background: "#F37335",
                  paddingLeft: 40,
                }}
                type="text"
                value={searchText}
                onChange={handleSearchInputChange}
                placeholder="Tìm tên người dùng..."
              />
              <IoIosSearch
                size={24}
                color={"#fff"}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translate(0, -50%)",
                  left: "15%",
                }}
              />
            </div>
            {/* <div className="col-lg-2 col-md-2">
                    <button
                      className="save-btn hover-btn"
                      onClick={handleSearch}
                    >
                      Tìm kiếm
                    </button>
                  </div> */}
          </div>
        </div>
        <div className="col-6 d-flex flex-row-reverse pr-4 align-items-center">
          <Button
            onClick={handleClick}
            variant="contained"
            style={{
              height: 42,
              borderRadius: 80,
              background: "#F37335",
              color: "#fff",
            }}
          >
            <IoIosAdd color={"#fff"} size={24} />
            Thêm tài khoản
          </Button>
          <select
            className="form-control"
            name="selectedRole"
            value={selectedRole}
            onChange={(e) => handleChange(e)}
            style={{ width: 200, marginRight: 20 }}
          >
            <option>Chọn chức vụ</option>
            <option value="ceo">CEO</option>
            <option value="hr">HR</option>
            <option value="marketing">Marketing</option>
            <option value="operator">Tổng đài viên</option>
            <option value="parttime">Part time</option>
            <option value="leader">Quản lý</option>
            <option value="employee">Nhân viên</option>
          </select>
          <Button
            onClick={() => {
              setGetList(orgtableData);
            }}
            variant="contained"
            style={{
              height: 42,
              borderRadius: 80,
              background: "#F37335",
              color: "#fff",
              marginRight: 20,
            }}
          >
            Đặt lại
          </Button>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-lg-12 col-md-12">
          {isLoaded ? <Loader /> : ""}
          <div className="card card-static-2 mt-30 mb-30">
            {/* <div className="card-title-2">
              <h4>Tất cả người dùng</h4>
            </div> */}

            <div className="card-body-table">
              <div className="table-responsive">
                {searchText.length <= 0 && (
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>Mã NV</th>
                        <th style={{ whiteSpace: "nowrap" }}>Tên NV</th>
                        <th style={{ whiteSpace: "nowrap" }}>Chức vụ</th>
                        <th style={{ whiteSpace: "nowrap" }}>Số điện thoại</th>
                        <th style={{ whiteSpace: "nowrap" }}>Email</th>
                        <th style={{ whiteSpace: "nowrap" }}>Địa chỉ</th>
                        <th style={{ whiteSpace: "nowrap" }}>Thông tin chung</th>
                        <th style={{ whiteSpace: "nowrap" }}>Trạng thái</th>
                        <th style={{ whiteSpace: "nowrap" }}>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((row, index) => (
                        <tr key={index}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {row.user_id ? row.user_id : "Chưa thiết lập"}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{renderName(row)}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {renderRole(row.role)}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{row.phone ? row.phone : "Chưa thiết lập"}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{row.email ? row.email : "Chưa thiết lập"}</td>
                          <th>
                            {row.address ? row.address : "Chưa thiết lập"}
                          </th>
                          <th>{row.note ? row.note : "Chưa thiết lập"}</th>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {row.verify ? (
                              <span className="text-success">Đã xác thực</span>
                            ) : (
                              <span className="text-danger">Chờ xác thực</span>
                            )}
                          </td>
                          <td className="action-btns">
                            <a onClick={() => handlEditRow(row)}>
                              <i className="fas fas fa-edit" />
                            </a>
                            {role === "admin" && (
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {searchText.length > 0 && (
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th>Mã NV</th>
                        <th>Tên NV</th>
                        <th>Chức vụ</th>
                        <th style={{ whiteSpace: "nowrap" }}>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Thông tin chung</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSearch.map((row, index) => (
                        <tr key={index}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {row.user_id ? row.user_id : "Chưa thiết lập"}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{renderName(row)}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {renderRole(row.role)}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>{row.phone ? row.phone : "Chưa thiết lập"}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{row.email ? row.email : "Chưa thiết lập"}</td>
                          <th>
                            {row.address ? row.address : "Chưa thiết lập"}
                          </th>
                          <th>{row.note ? row.note : "Chưa thiết lập"}</th>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {row.verify ? (
                              <span className="text-success">Đã xác thực</span>
                            ) : (
                              <span className="text-danger">Chờ xác thực</span>
                            )}
                          </td>
                          <td className="action-btns">
                            <a onClick={() => handlEditRow(row)}>
                              <i className="fas fas fa-edit" />
                            </a>
                            {role === "admin" && (
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
