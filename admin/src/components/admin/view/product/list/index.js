import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { GetCategoryDetails, GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import numberWithCommas from "../../../../../util/number_thousand_separator";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  apiGetChildCategory,
  apiGetProvince,
  apiGetWard,
  getListProvince,
} from "../../../../../api";
import { getCookie } from "../../../../../function";
import { useParams } from "react-router-dom";
import SelectBox3 from "../../../../../util/SelectBox3";
import {
  listBedRoom,
  listPrice,
  listSquare,
  listStar,
  listStatusRoom,
} from "../../../../../data/data";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import delete_bulk_product from "../../../../../api/delete_bulk_product";
import { AppContext } from "../../../../../App";
import { useHistory } from "react-router-dom";
import useQuery from "../../../../../util/useQuery";
import { CLIENT_URL } from "../../../../../config1";
import getAllProductListCategory from "../../../../../api/get_list_product_category";



const List = () => {
  const { id, subid } = useParams();
  // const
  const query = useQuery();
  const history= useHistory()
  const { user } = useContext(AppContext);
  const [originList, setOriginList] = useState([]);
  const [getList, setGetList] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const isSearching = searchText.length > 0 ? true : false;
  const [isloaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(30);
  const [orgtableData, setOrgtableData] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [selectSubCategory, setSelectSubCategory] = useState();
  const [listSubCategory, setListSubCategory] = useState([]);
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
  const [rent, setRent]= useState()
  const [listCheck, setListCheck] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getList.slice(indexOfFirstItem, indexOfLastItem);
  const role = getCookie("role");
  const auid = getCookie("auid");
  const handlePageChange = (event, value) => {
    // setCurrentPage(value);
    history.push("/admin/p/"+ id + "/" + subid + "/list?page="+ value)
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
    // your code here
    // For example:
    // props.history.goBack();
  };
  const handleSearchFilter = () => {
    if (id == 13) {
      let data = [];
      data = originList;
      // typeRoom, square, price, province, district, ward
      if (typeRoom) {
        data = data.filter((item) => item.typeRoom == typeRoom);
      }
      
      if (rent && rent.toString().length > 0) {
        switch (parseInt(rent)) { 
          case 0:
            console.log(0)
            data = data.filter((item) => item.rent=== false);
            break;
          case 1:
            console.log(1)
            data = data.filter((item) => item.rent=== true);
            break;
          
        }
      }
      if (square) {
        switch (square) { 
          case 1:
            data = data.filter((item) => parseInt(item.square) >= 0 && parseInt(item.square) <= 20);
            break;
          case 2:
            data = data.filter((item) => parseInt(item.square) >= 20 && parseInt(item.square) <= 40);
            break;
          case 3:
            data = data.filter((item) => parseInt(item.square) >= 40);
            break;
          default:
            break;
        }
      }
      if (price) {
        switch (price) {
          case 1:
            data = data.filter((item) => parseInt(item.price) >= 0 && parseInt(item.price) <= 1000000);
            break;
          case 2:
            data = data.filter((item) => parseInt(item.price) >= 1000000 && parseInt(item.price) <= 3000000);
            break;
          case 3:
            data = data.filter((item) => parseInt(item.price) >= 3000000 && parseInt(item.price) <= 5000000);
            break;
          case 4:
            data = data.filter((item) => parseInt(item.price) >= 5000000 && parseInt(item.price) <= 10000000);
            break;
          case 5:
            data = data.filter((item) => parseInt(item.price) >= 10000000);
            break;
          default:
            break;
        }
      }

      if (province) {
        data = data.filter((item) => item.province == province);
      }
      if (district) {
        data = data.filter((item) => item.district == district);
      }
      if (ward) {
        data = data.filter((item) => item.ward == ward);
      }
      setGetList(data);
    }
    //
    if (id == 12) {
      let data = [];
      data = originList;
      // typeRoom, square, price, province, district, ward
      if (typeRoom) {
        data = data.filter((item) => item.typeRoom == typeRoom);
      }
      if (star) {
        data = data.filter((item) => item.rating == star);
      }
      if (province) {
        data = data.filter((item) => item.province == province);
      }
      if (district) {
        data = data.filter((item) => item.district == district);
      }
      if (ward) {
        data = data.filter((item) => item.ward == ward);
      }
      setGetList(data);
    }
  };

  const handleChange = (item) => {
    if (listCheck.includes(item)) {
      setListCheck(listCheck.filter((item1) => item1 != item));
    } else {
      setListCheck((prev) => [...prev, item]);
    }
  };

  const getListCategory = async () => {
    const list = await GetCategoryDetails.getCategoryList();
    setListCategory(list.data);
  };

  const getListChildCategory = async () => {
    const list = await apiGetChildCategory({ categoryId: selectCategory });
    setListSubCategory(list.data);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const getProductList = async () => {
    setIsLoaded(false);
    let list = await getAllProductListCategory({id, subid});
    if (list) {
      var tdata = list;
      var slice = tdata;
      setGetList(
        slice.filter(
          (item) => item.categoryId == id && item.subCategoryId == subid
        )
      );
      setOriginList(
        slice.filter(
          (item) => item.categoryId == id && item.subCategoryId == subid
        )
      );
      setOrgtableData(tdata);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getProductList();
  }, [id, subid]);

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    getListChildCategory();
  }, [selectCategory]);

  useEffect(() => {
    if (selectCategory && selectSubCategory) {
      setGetList(
        originList.filter(
          (item) =>
            item.categoryId == selectCategory &&
            item.subCategoryId == selectSubCategory
        )
      );
    } else if (selectCategory) {
      setGetList(
        originList.filter((item) => item.categoryId == selectCategory)
      );
    } else if (selectSubCategory) {
    }

    // setGetList(originList?.filter(item))
  }, [selectCategory, selectSubCategory]);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    if (!searchText) {
      setGetList(
        orgtableData.filter(
          (item) => item.categoryId == id && item.subCategoryId == subid
        )
      ); 
      return;
    }

    const filteredList = originList.filter((item) => {
      // Điều kiện lọc theo categoryId và subCategoryId
      const categoryMatches = item.categoryId == id && item.subCategoryId == subid;
    
      // Điều kiện lọc theo product_id và tên sản phẩm (item.name)
      const productIdMatches = item.product_id.toLowerCase().includes(event.target.value.toLowerCase());
      const nameMatches = item.name.includes(event.target.value);
      const addressMatches= item.address.includes(event.target.value)

      const wardMathes= item.wardText.includes(event.target.value)
      const districtMatches= item.districtText.includes(event.target.value)
      const provinceMacthes= item.provinceText.includes(event.target.value)
      const priceMatches= item.price.toString().includes(event.target.value)
      const updatedAtMatches= moment(item.updatedAt).format("DD-MM-YYYY HH:mm:ss").includes(event.target.value)
      const createdAtMatches= moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss").includes(event.target.value)
      // Kết hợp cả hai điều kiện
      return categoryMatches && (productIdMatches || nameMatches || wardMathes || districtMatches || provinceMacthes || addressMatches || priceMatches || updatedAtMatches || createdAtMatches);

    });

    setListSearch(filteredList);
  };

  const handleSearch = () => {
    if (!searchText) {
      setGetList(orgtableData); // Hiển thị toàn bộ danh sách nếu không có từ khóa tìm kiếm
      return;
    }

    const filteredList = orgtableData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setListSearch(filteredList);
  };

  const handlDeleteById = async (id) => {
    swal({
      title: "Bạn có chắc?",
      text: "You want to delete Category from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getDeleteProduct(id);
        if (value) {
          getProductList();
        }
      }
    });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(newOffset);
    loadMoreData();
  };

  const loadMoreData = () => {
    const data = orgtableData;
    const slice = data;
    setGetList(slice);
  };

  const exportToExcel = (e) => {
    e.preventDefault();
    const headers = ["Tên sản phẩm", "Thể loại", "Giá", "Giảm giá"];

    // Thêm tiêu đề cột vào mảng dữ liệu

    const worksheet = XLSX.utils.json_to_sheet(
      getList.map((product) => [
        product.name,
        product.SubCategory
          ? `${product.SubCategory.category.name} | ${product.SubCategory.sub_name}`
          : "..",
        product.price,
        product.discountPer,
      ])
    );
    getList.unshift(headers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sản phẩm");
    XLSX.writeFile(workbook, "product.xlsx");
  };

  const refreshProduct = () => {
    setGetList(originList);
    setSelectCategory();
    setSelectSubCategory();
  };

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

  const bulkDelete = async () => {
    try {
      const result = await delete_bulk_product({ list: listCheck });
      if (result.ok === true) {
        swal("Thông báo", "Đã xoá thành công", "success")
          .then(() => {
            setListCheck([]);
          })
          .then(() => {
            getProductList();
          });
      }
    } catch (error) {
      swal("Thông báo", "Đã có lỗi xảy ra", "error");
      console.log(error);
    }
    // const result= await res.data
  };

  const renderAuthorPhone = (row) => {
    if (
      role === "manager" ||
      role === "admin" ||
      role === "ceo" ||
      role === "operator" ||
      role === "marketing"
    ) {
      return row.author_phone ? row.author_phone : "Chưa thiết lập";
    }
    if (row.user) {
      if (role === "leader" && auid == row.user.id) {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      } else if (role === "employee" && user.user_manager == row.user.id) {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      } else if (role === "leader" && auid != row.user.id) {
        return "Đã ẩn";
      } else if (role === "employee" && user.user_manager != row.user.id) {
        return "Đã ẩn";
      } else if (role === "parttime") {
        return "Đã ẩn";
      } else {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      }
    } else {
      return row.author_phone ? row.author_phone : "Chưa thiết lập";
    }
  };

  const renderAuthorNote = (row) => {
    if (
      role === "manager" ||
      role === "admin" ||
      role === "ceo" ||
      role === "operator" ||
      role === "marketing" ||
      role === "leader"
    ) {
      return row.note ? row.note : "Chưa thiết lập";
    }
    if (row.user) {
      if (role === "employee" && user.user_manager == row.user.id) {
        return row.note ? row.note : "Chưa thiết lập";
      } else if (role === "employee" && user.user_manager != row.user.id) {
        return "Đã ẩn";
      } else if (role === "parttime") {
        return "Đã ẩn";
      } else {
        return row.note ? row.note : "Chưa thiết lập";
      }
    } else {
      return row.note ? row.note : "Chưa thiết lập";
    }
  };

  const checkAuthorProduct = (row) => {
    if (
      role === "manager" ||
      role === "admin" ||
      role === "ceo" ||
      role === "operator" ||
      role === "marketing"
    ) {
      return true;
    }
    if (row.user) {
      if (role === "leader" && auid == row.user.id) {
        return true;
      } else if (role === "employee" && user.user_manager == row.user.id) {
        return true;
      } else if (role === "leader" && auid != row.user.id) {
        return false;
      } else if (role === "employee" && user.user_manager != row.user.id) {
        return false;
      } else if (role === "parttime") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  
  const tableRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX - tableRef.current.offsetLeft);
    setScrollLeft(tableRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    
    const x = event.pageX - tableRef.current.offsetLeft;
    const distance = x - startX;
    tableRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseOut = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-between mt-3">
        <div className="w-100 d-flex justify-content-between">
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <Link
              to={"/admin/p/" + id + "/" + subid + "/create"}
              className="add-btn hover-btn"
              style={{
                background: "#F37335",
                borderRadius: 15,
                width: "auto",
                whiteSpace: "nowrap",
                alignSelf: "end",
              }}
            >
              Thêm sản phẩm
            </Link>
            <input
              style={{
                width: "100%",
                height: "42px",
                border: "1px solid #e7e7e7",
                borderRadius: 15,
                padding: 10,
                background: "#F37335",
                alignSelf: "end",
                color: "white",
              }}
              type="text"
              value={searchText}
              className="inp-mk"
              onChange={handleSearchInputChange}
              placeholder="Tìm kiếm..."
            />
          </div>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <a
              href={`/admin/p/${id}/${subid}/edit`}
              onClick={(e) => {
                e.preventDefault();
                setTypeRoom(null)
                getProductList();
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
              href={`/admin/p/${id}/${subid}/edit`}
              onClick={(e) => {
                e.preventDefault();
                handleSearchFilter();
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
                  Loại phòng
                </div>
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
                  Trạng thái
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  padding: 5,
                  background: "white",
                  width: "100%",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  gap: 40,
                }}
              >
                <div style={{ width: 200 }}>
                  {id == 13 && (
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
                        value={typeRoom}
                        setValue={setTypeRoom}
                        label={"Hạng phòng"}
                        list={listBedRoom.filter(
                          (item) => parseInt(item.value) <= 11
                        )}
                      />
                    </div>
                  )}
                  {id == 12 && (
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
                        value={typeRoom}
                        setValue={setTypeRoom}
                        label={"Hạng phòng"}
                        list={listBedRoom.filter(
                          (item) => parseInt(item.value) > 11
                        )}
                      />
                    </div>
                  )}
                  {/*  */}
                  {id == 13 && (
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
                        value={square}
                        setValue={setSquare}
                        label={"Diện tích"}
                        list={listSquare}
                      />
                    </div>
                  )}
                  {id == 12 && (
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
                        value={star}
                        setValue={setStar}
                        label={"Số sao"}
                        list={listStar}
                      />
                    </div>
                  )}
                  {/*  */}
                  {id == 13 && (
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
                        value={price}
                        setValue={setPrice}
                        label={"Giá tiền"}
                        list={listPrice}
                      />
                    </div>
                  )}
                  {id == 12 && (
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
                        value={price}
                        setValue={setPrice}
                        label={"Giá tiền"}
                        list={listPrice}
                      />
                    </div>
                  )}
                </div>
                {/*  */}
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
                      list={listProvince.map((item) => ({
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
                      list={provinceDetail.map((el) => ({
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
                      list={listWard.map((el) => ({
                        ...el,
                        value: el.ward_id,
                        label: el.ward_name,
                      }))}
                    />
                  </div>
                </div>
                {/*  */}
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
                      value={rent}
                      setValue={setRent}
                      label={"Trạng thái sản phẩm"}
                      list={listStatusRoom}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {getCookie("role") === "admin" && (
          <div
            onClick={exportToExcel}
            className="col-lg-12 mt-3"
            style={{ cursor: "pointer" }}
          >
            <a style={{ color: "#fff" }} className="add-btn hover-btn">
              Xuất file excel
            </a>
          </div>
        )} */}
        {/* <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <br />
              
            </div>
            <div className="col-lg-2 col-md-2">
              <button className="save-btn hover-btn" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="col-lg-12 col-md-12 mt-2">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
              <Select
                style={{ height: 32 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                {listCategory
                  .map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.name,
                  }))
                  .map((item, key) => (
                    <MenuItem
                      value={item.value}
                      key={key}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div> */}
        {/*  */}
        {/* <br /> */}
        {/* <br /> */}
        {/*  */}
        {/* <div className="col-lg-12 col-md-12">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Thể loại con
              </InputLabel>
              <Select
                style={{ height: 32 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSubCategory}
                onChange={(e) => setSelectSubCategory(e.target.value)}
              >
                {listSubCategory
                  .map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.sub_name,
                  }))
                  .map((item, key) => (
                    <MenuItem
                      value={item.value}
                      key={key}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div> */}
        {/* <br />
        <br /> */}
        {/* <div className="col-lg-12 col-md-12 mt-2">
          <Button
            onClick={refreshProduct}
            color={"primary"}
            variant="contained"
          >
            Đặt lại
          </Button>
        </div> */}
        {/*  */}
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            {/* <div className="card-title-2">
              <h4>Tất cả sản phẩm</h4>
            </div> */}
            <div className="card-body-table">
              <div className="table-responsive position-relative" id="container-table-transform">
                <table ref={tableRef}
                id="table-transform"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseOut} className="table ucp-table table-hover">
                  <thead>
                    {id == 13 && (
                      <tr>
                        {/* <th style={{ width: 60 }}>Mã SP</th> */}
                        <th>
                          {/* <Checkbox /> */}
                          {listCheck.length > 0 && (
                            <Button
                              onClick={bulkDelete}
                              variant={"contained"}
                              color={"primary"}
                            >
                              Xoá
                            </Button>
                          )}
                        </th>
                        <th style={{ width: 100 }}>Hình ảnh</th>
                        <th style={{ whiteSpace: "nowrap" }}>Mã sản phẩm</th>

                        <th style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</th>
                        <th style={{ whiteSpace: "nowrap" }}>Cập nhật lần cuối</th>
                        <th style={{ whiteSpace: "nowrap" }}>Thời gian tạo</th>

                        <th style={{ whiteSpace: "nowrap" }}>Người quản lý</th>
                        {/* <th style={{ whiteSpace: "nowrap" }}>SĐT liên hệ</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>SĐT chủ nhà</th>
                        <th style={{ whiteSpace: "nowrap" }}>Địa chỉ chủ</th>

                        <th style={{ whiteSpace: "nowrap" }}>Giá bán</th>
                        <th style={{ whiteSpace: "nowrap" }}>Ghi chú</th>
                        {/* <th>Giá</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>Trạng thái</th>
                        <th>Action</th>
                      </tr>
                    )}
                    {id == 12 && (
                      <tr>
                        <th>
                          {/* <Checkbox /> */}
                          {listCheck.length > 0 && (
                            <Button
                              onClick={bulkDelete}
                              variant={"contained"}
                              color={"primary"}
                            >
                              Xoá
                            </Button>
                          )}
                        </th>
                        {/* <th style={{ width: 60 }}>Mã SP</th> */}
                        <th style={{ width: 100 }}>Hình ảnh</th>
                        <th style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</th>
                        <th style={{ whiteSpace: "nowrap" }}>Cập nhật lần cuối</th>

                        <th style={{ whiteSpace: "nowrap" }}>Khu vực</th>

                        <th style={{ whiteSpace: "nowrap" }}>Giá bán</th>
                        {/* <th style={{ whiteSpace: "nowrap" }}>SĐT liên hệ</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>Giá đại lý</th>
                        <th style={{ whiteSpace: "nowrap" }}>Địa chỉ</th>
                        <th style={{ whiteSpace: "nowrap" }}>Ghi chú</th>
                        {/* <th>Giá</th> */}
                        {/* <th style={{ whiteSpace: "nowrap" }}>Trạng thái</th> */}
                        <th>Action</th>
                      </tr>
                    )}
                  </thead>
                  {id == 13 && (
                    <tbody>
                      {!isSearching &&
                        currentItems.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      listCheck.filter((item) => item == row.id)
                                        .length > 0
                                        ? true
                                        : false
                                    }
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <a href={CLIENT_URL + "/product/" + row.id} target="_blank">
                                <img
                                  style={{
                                    width: 130,
                                    borderRadius: 10,
                                    aspectRatio: 4 / 3,
                                    height: 100,
                                  }}
                                  src={row.photo ? row.photo : "Can't display"}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td>{row.product_id}</td>
                            <td>{row.name}</td>
                            <td>{moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}</td>
                            <td>
                              {moment(row.createdAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>

                            <td>
                              {row.user ? row.user.firstName : "Chưa thiết lập"}
                            </td>
                            {/* <td>
                              {row.phoneNumber
                                ? row.phoneNumber
                                : "Chưa thiết lập"}
                            </td> */}
                            <td>{renderAuthorPhone(row)}</td>
                            <td>
                              {row.address +
                                " " +
                                row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>{renderAuthorNote(row)}</td>
                            {/* <td>{row.brand}</td> */}
                            {/* <td>{row.unitSize}</td> */}
                            {/* <td>VND{numberWithCommas(row.buyerPrice)}</td> */}
                            {/* <td>
                              VND
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td> */}
                            {/* <td>
                              {row.status === "active" ? (
                                <span className="badge-item badge-status-success">
                                  {row.status}
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  {row.status}
                                </span>
                              )}
                            </td> */}
                            <td>
                              {row.rent == 1 ? (
                                <span className="badge-item badge-status-success">
                                  Đã thuê
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  Chưa thuê
                                </span>
                              )}
                            </td>
                            <td className="action-btns">
                              {checkAuthorProduct(row) === true && (
                                <Fragment>
                                  <Link
                                    to={{
                                      pathname: `/admin/p/${id}/${subid}/edit`,
                                      state: { row },
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  <Typography
                                    className="delete-btn"
                                    onClick={() => handlDeleteById(row.id)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
                                </Fragment>
                              )}
                            </td>
                          </tr>
                        ))}
                      {isSearching &&
                        listSearch.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      listCheck.filter((item) => item == row.id)
                                        .length > 0
                                        ? true
                                        : false
                                    }
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <a href={CLIENT_URL + "/product/" + row.id} target="_blank">
                                <img
                                  style={{
                                    width: 130,
                                    borderRadius: 10,
                                    aspectRatio: 4 / 3,
                                    height: 100,
                                  }}
                                  src={row.photo ? row.photo : "Can't display"}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td>{row.product_id}</td>
                            <td>{row.name}</td>
                            <td>{moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}</td>
                            <td>
                              {moment(row.createdAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>

                            <td>
                              {row.user ? row.user.firstName : "Chưa thiết lập"}
                            </td>
                            {/* <td>
                              {row.phoneNumber
                                ? row.phoneNumber
                                : "Chưa thiết lập"}
                            </td> */}
                            <td>{renderAuthorPhone(row)}</td>
                            <td>
                              {row.address +
                                " " +
                                row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>{renderAuthorNote(row)}</td>
                            {/* <td>{row.brand}</td> */}
                            {/* <td>{row.unitSize}</td> */}
                            {/* <td>VND{numberWithCommas(row.buyerPrice)}</td> */}
                            {/* <td>
                              VND
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td> */}
                            {/* <td>
                              {row.status === "active" ? (
                                <span className="badge-item badge-status-success">
                                  {row.status}
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  {row.status}
                                </span>
                              )}
                            </td> */}
                            <td>
                              {row.rent == 1 ? (
                                <span className="badge-item badge-status-success">
                                  Đã thuê
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  Chưa thuê
                                </span>
                              )}
                            </td>
                            <td className="action-btns">
                              {checkAuthorProduct(row) === true && (
                                <Fragment>
                                  <Link
                                    to={{
                                      pathname: `/admin/p/${id}/${subid}/edit`,
                                      state: { row },
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  <Typography
                                    className="delete-btn"
                                    onClick={() => handlDeleteById(row.id)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
                                </Fragment>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  {/*  */}
                  {id == 12 && (
                    <tbody>
                      {!isSearching &&
                        currentItems.map((row, index) => (
                          <tr key={index}>
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
                            <td>
                              <img
                                style={{
                                  width: 130,
                                  borderRadius: 10,
                                  aspectRatio: 4 / 3,
                                  height: 100,
                                }}
                                src={row.photo ? row.photo : "Can't display"}
                                alt=""
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}</td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            {/* <td>
                              {row.phoneNumber
                                ? row.phoneNumber
                                : "Chưa thiết lập"}
                            </td> */}
                            <td>{row.note ? row.note : "Chưa thiếp lập"}</td>
                            {/* <td>{row.brand}</td> */}
                            {/* <td>{row.unitSize}</td> */}
                            {/* <td>VND{numberWithCommas(row.buyerPrice)}</td> */}
                            {/* <td>
                              VND
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td> */}
                            {/* <td>
                              {row.status === "active" ? (
                                <span className="badge-item badge-status-success">
                                  {row.status}
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  {row.status}
                                </span>
                              )}
                            </td> */}
                            <td className="action-btns">
                              <Link
                                to={{
                                  pathname: `/admin/p/${id}/${subid}/edit`,
                                  state: { row },
                                }}
                              >
                                <Typography className="edit-btn">
                                  <i className="fas fa-edit" />
                                </Typography>
                              </Link>
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      {isSearching &&
                        listSearch.map((row, index) => (
                          <tr key={index}>
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
                            <td>
                              <img
                                style={{
                                  width: 130,
                                  borderRadius: 10,
                                  aspectRatio: 4 / 3,
                                  height: 100,
                                }}
                                src={row.photo ? row.photo : "Can't display"}
                                alt=""
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}</td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            {/* <td>
                              {row.phoneNumber
                                ? row.phoneNumber
                                : "Chưa thiết lập"}
                            </td> */}
                            <td>{row.note ? row.note : "Chưa thiếp lập"}</td>
                            {/* <td>{row.brand}</td> */}
                            {/* <td>{row.unitSize}</td> */}
                            {/* <td>VND{numberWithCommas(row.buyerPrice)}</td> */}
                            {/* <td>
                              VND
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td> */}
                            {/* <td>
                              {row.status === "active" ? (
                                <span className="badge-item badge-status-success">
                                  {row.status}
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  {row.status}
                                </span>
                              )}
                            </td> */}
                            <td className="action-btns">
                              <Link
                                to={{
                                  pathname: `/admin/p/${id}/${subid}/edit`,
                                  state: { row },
                                }}
                              >
                                <Typography className="edit-btn">
                                  <i className="fas fa-edit" />
                                </Typography>
                              </Link>
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
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
