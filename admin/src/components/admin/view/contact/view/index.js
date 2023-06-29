import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { GetPaymentDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import swal from "sweetalert";
import Axios from "axios";
import { API_URL } from "../../../../../config1";
import ReplyContact from "./reply_contact";
import delete_contact from "../../../../../api/delete_contact";

const View = () => {
  const history = useHistory();
  const [getList, setGetList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [change, setChange]= useState(false)
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

  const getContact = async () => {
    // let list = await GetPaymentDetails.getAllPaymentList();
    const res = await Axios({
      url: API_URL + "/api/contact",
      method: "get",
    });
    const result = await res.data;
    let list = result.data;
    // console.log("list", list)
    if (list) {
      setGetList(list);
      setIsLoaded(false);
    }
  };

  const handlDeleteById = async (id) => {
    swal({
      title: "Are you sure?",
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

  const handlEditRow = (row) => {
    history.push({
      pathname: `/admin/user/edit/${row.id}`,
      state: row,
    });
  };

  const handleAddNewUser = () => {
    history.push({ pathname: `/admin/user/create` });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Contact List</h2>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div>
      </div>
      <ol className="breadcrumb mb-30">
        <li className="breadcrumb-item">Dashboard</li>
        <li className="breadcrumb-item active">voucher</li>
      </ol>
      <div className="row justify-content-between">
        {/* <div className="col-lg-3 col-md-4">
          <div className="bulk-section mt-30">
            <div className="input-group">
              <select id="action" name="action" className="form-control">
                <option selected>Bulk Actions</option>
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
                <option value={3}>Delete</option>
              </select>
              <div className="input-group-append">
                <button className="status-btn hover-btn" type="submit">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div
          className="col-lg-5 col-md-3 col-lg-6 back-btn"
          style={{ display: "none" }}
        >
          <Button
            variant="contained"
            className="status-btn hover-btn"
            onClick={handleAddNewUser}
          >
            Add New User
          </Button>
        </div>
        <div className="col-lg-12 col-md-12">
          {isLoaded ? <Loader /> : ""}
          <div className="card card-static-2 mt-30 mb-30">
            <div className="card-title-2">
              <h4>All Contact</h4>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>
                        <input type="checkbox" className="check-all" />
                      </th>
                      <th style={{ width: 60 }}>ID</th>
                      <th>Customer name</th>
                      <th>Date send</th>
                      <th>Content</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getList.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            className="check-item"
                            name="ids[]"
                            defaultValue={7}
                          />
                        </td>
                        <td>{++index}</td>
                        <td>{row.name}</td>
                        <td>{row.createdAt}</td>
                        <td>{row.content}</td>
                        <td>{row.email}</td>
                        <td className="action-btns">
                          <ReplyContact {...row} />
                          <Link
                            className="edit-btn"
                            onClick={()=> {
                              swal("Thông báo", "Bạn có muốn xóa không ?", {buttons: {
                                ok: "OK",
                                cancel: "Cancel"
                              }})
                              .then(async (value)=> {
                                if(value=== "ok") {
                                  const result= await delete_contact(row.id)
                                  if(result.ok=== true) {
                                    swal("Thông báo", "Đã xóa thành công", "success")
                                    .then(()=> setChange(prev=> !prev))
                                  }
                                  else {
                                    swal("Thông báo", "Xóa thất bại", "error")
                                  }
                                }
                              })
                              .catch(()=> {
                                swal("Thông báo", "Xóa thất bại", "error")
                              })
                            }}
                          >
                            <i className="fas fa-trash" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
