import React, { useState, useEffect } from "react";
import { GetLocationDetails } from "../../../../services";
import { Typography, Button } from "@material-ui/core";
import Edit from "../../tours/edit";
import swal from "sweetalert";
import {
  apiDeleteTour,
  apiGetListTour,
  apiGetProvince,
  apiGetWard,
  getListProvince,
} from "../../../../../api";
import moment from "moment";
import { Link } from "react-router-dom";
import SelectBox3 from "../../../../../util/SelectBox3";
import { useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import useQuery from "../../../../../util/useQuery";

const List = ({ history }) => {
  const { id } = useParams();
  const query= useQuery()
  const [originList, setOriginList] = useState([]);
  const [getList, setGetList] = useState([]);
  const [provinceDetail, setProvinceDetail] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [ward, setWard] = useState();
  const [typeRoom, setTypeRoom] = useState();
  const [square, setSquare] = useState();
  const [price, setPrice] = useState();
  const [star, setStar] = useState();
  const [listProvince, setListProvince] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getList.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    // setCurrentPage(value);
    history.push("/admin/t/"+ id + "/list?page="+ value)
  };
  useEffect(()=> {
    if(parseInt(query.get("page")) >= 1) {
      setCurrentPage(parseInt(query.get("page")))
    }
    else {
      setCurrentPage(1)
    }
  }, [query.get("page"), currentPage])
  const handleBack = () => {
    history.goBack();
  };


  const getData = async () => {
    try {
      const list = await apiGetListTour();
      setOriginList(list.data.filter((item) => item.type == id));
      setGetList(list.data.filter((item) => item.type == id));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  
  

  const handlDeleteById = async (id) => {
    try {
      const success = await swal({
        title: "Bạn có chắc?",
        text: "Bạn có chắc muốn xoá khỏi danh sách",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (success) {
        const value = await apiDeleteTour({ id: id });
        if (value) {
          getData();
        }
      }
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
  useEffect(() => {
    (async () => {
      const result = await getListProvince();
      setListProvince(result);
    })();
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
        <li className="breadcrumb-item active">Tours</li>
      </ol> */}
      <div className="w-100 d-flex justify-content-between">
        <div className="d-flex align-items-center" style={{ gap: 20 }}>
          <Link
            to={"/admin/t/" + id + "/create"}
            className="add-btn hover-btn"
            style={{
              background: "#F37335",
              borderRadius: 15,
              width: "auto",
              whiteSpace: "nowrap",
              alignSelf: "end",
            }}
          >
            Thêm tour
          </Link>
        </div>
        <div className="d-flex align-items-center" style={{ gap: 20 }}>
          <a
            href="/admin/product/create"
            onClick={(e) => {
              e.preventDefault();
              setGetList(originList);
              // setProvince()
            }}
            className="add-btn hover-btn"
            style={{
              background: "#F37335",
              borderRadius: 80,
              width: "auto",
              whiteSpace: "nowrap",
              alignSelf: "end",
            }}
          >
            Đặt lại bộ lọc
          </a>
          <a
            href="/admin/product/create"
            onClick={(e) => {
              e.preventDefault();
              setGetList(
                originList.filter((item) => item.departure == province)
              );
            }}
            className="add-btn hover-btn"
            style={{
              background: "#F37335",
              borderRadius: 80,
              width: "auto",
              whiteSpace: "nowrap",
              alignSelf: "end",
            }}
          >
            Tìm kiếm
          </a>

          <div style={{ borderRadius: 10 }}>
            <div
              style={{
                padding: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                gap: 40,
              }}
              className="bg-gra d-flex align-items-center"
            >
              <div
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: 200,
                  whiteSpace: "nowrap",
                }}
              >
                Địa điểm, vị trí
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                padding: 10,
                background: "white",
                width: "100%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                gap: 40,
              }}
            >
              <div style={{ width: 200 }}>
                <div
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: "1px solid #e7e7e7",
                    background: "#fff",
                    padding: 5,
                    marginBottom: 12,
                  }}
                >
                  <SelectBox3
                    size={"small"}
                    value={province}
                    setValue={setProvince}
                    label={"Tỉnh / Thành phố"}
                    list={listProvince?.map((item) => ({
                      ...item,
                      value: item.province_id,
                      label: item.province_name,
                    }))}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: "1px solid #e7e7e7",
                    background: "#fff",
                    padding: 5,
                    marginBottom: 12,
                  }}
                >
                  <SelectBox3
                    size={"small"}
                    value={district}
                    setValue={setDistrict}
                    label={"Quận / Huyện"}
                    list={provinceDetail?.map((el) => ({
                      ...el,
                      value: el.district_id,
                      label: el.district_name,
                    }))}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: "1px solid #e7e7e7",
                    background: "#fff",
                    padding: 5,
                    marginBottom: 12,
                  }}
                >
                  <SelectBox3
                    size={"small"}
                    value={ward}
                    setValue={setWard}
                    label={"Xã / Phường"}
                    list={listWard?.map((el) => ({
                      ...el,
                      value: el.ward_id,
                      label: el.ward_name,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            <div className="card-title-2">
              <h4>Tất cả tour</h4>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead>
                    <tr>
                      <th>Mã tour</th>
                      <th>Tên tour</th>
                      {/* <th>Điểm đi</th> */}
                      <th>Địa điểm</th>
                      <th>Giá tour</th>
                      <th>Giá trẻ em</th>
                      <th>Giá giảm</th>
                      <th>Giá đại lý</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row, index) => (
                      <tr key={index}>
                        <td>{row.tour_id}</td>
                        <td>{row.name}</td>
                        {/* <td>{row.departureText || ""}</td> */}
                        <td>{row.destinationText || ""}</td>
                        <td>{row.price}</td>
                        <td>{row.children_price}</td>
                        <td>{row.discountPer}</td>
                        <td>{row.agent_price}</td>
                        <td className="action-btns">
                          <Link
                            to={{
                              pathname: `/admin/t/` + id + `/edit`,
                              state: { row },
                            }}
                          >
                            <Typography className="edit-btn">
                              <i className="fas fa-edit" />
                            </Typography>
                          </Link>
                          <Typography
                            className="delete-btn"
                            onClick={(e) => handlDeleteById(row.id)}
                          >
                            <i className="fas fa-trash-alt" />
                          </Typography>
                        </td>
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

export default List;
