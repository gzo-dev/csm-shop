import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getCookie } from "../../../../../function";
import get_list_employee_of_leader from "../../../../../api/get_list_employee_of_leader";
import update_employee_manage_product from "../../../../../api/update_employee_manage_product";
import swal from "sweetalert";
import _ from "lodash";
import { useInView } from "react-intersection-observer";

function ManageEmployeeProduct(props) {
  const {setChange, setChange1 }= props
  const uid = getCookie("auid");
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [listEmployee, setEmployee] = useState([]);
  const filteredData = listEmployee.filter(
    (item) => item.role === "leader" || item.role === "employee"
  );

  // Nhóm các object theo role và chèn divider
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.role]) {
      acc[item.role] = [];
    }
    acc[item.role].push(item);
    return acc;
  }, {});

  const displayData = Object.keys(groupedData).reduce((acc, role) => {
    acc.push({ type: "divider", role });
    acc.push(...groupedData[role]);
    return acc;
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        list: checkedItems,
        productId: props?.id,
        owner: uid,
      };
      const result = await update_employee_manage_product(data);
      if (result?.ok === true) {
        swal("Thông báo", "Cập nhật thành công", "success");
        setChange1(prev=> !prev)
        setOpen(false)
        setChange(prev=> !prev)
      }
    } catch (error) {
      console.log(error);
      swal("Thông báo", error?.response?.data?.message);
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checkedItems.indexOf(value);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
  };

  const handleSelectAll = () => {
    if (checkedItems.length === listEmployee.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(listEmployee?.map((item) => item.id));
    }
  };
  useEffect(() => {
    if (inView === true) {
      (async () => {
        try {
          const result = await get_list_employee_of_leader({ uid });
          // console.log(result)
          setEmployee(result?.data);
          setCheckedItems(
            result?.data
              ?.filter((item) =>
                _.some(item.user_manager_products, {
                  product_id: parseInt(props?.id),
                  user_manager: item.id,
                })
              )
              ?.map((item) => item.id)
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [uid, inView]);

  return (
    <div style={{ marginLeft: 12, display: "flex" }}>
      <Link
        title="Xem lịch sử chỉnh sửa sản phẩm"
        to={{
          pathname: `/admin`,
        }}
        onClick={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
      >
        <Typography className="edit-btn">
          <i className="fas fa-fill-drip" />
        </Typography>
      </Link>
      <Dialog ref={ref} open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Phân quyền nhân viên quản lý sản phẩm</DialogTitle>
        <DialogContent>
          <Button onClick={handleSelectAll}>
            {checkedItems.length === listEmployee?.length
              ? "Bỏ chọn tất cả"
              : "Chọn tất cả"}
          </Button>
          <List>
            {displayData.map((item, key) =>
              item.type === "divider" ? (
                <React.Fragment key={key}>
                  <Typography variant="body1" gutterBottom>
                    {item.role=== "employee" && "Nhân viên"}
                    {item.role=== "leader" && "Quản lý"}
                  </Typography>
                  <Divider />
                </React.Fragment>
              ) : (
                <ListItem key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedItems.indexOf(item.id) !== -1}
                        onChange={handleToggle(item?.id)}
                      />
                    }
                    label={<ListItemText primary={item?.firstName} />}
                  />
                </ListItem>
              )
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageEmployeeProduct;
