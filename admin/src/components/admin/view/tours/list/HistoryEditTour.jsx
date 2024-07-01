import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";

import { useInView } from "react-intersection-observer";
import { FaHistory } from "react-icons/fa";
import { MdEditNotifications } from "react-icons/md";
import { useEffect } from "react";
import get_list_history_edit_product from "../../../../../api/get_list_history_edit_product";
import moment from "moment"
import get_list_history_edit_tour from "../../../../../api/get_list_history_edit_tour";

const HistoryEditTour = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setData]= useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView === true) {
      (async () => {
        try {
          const result = await get_list_history_edit_tour({
            tour_id: props?.id,
          });
          setData(result?.data)
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [inView, props]);

  return (
    <div>
      <Typography style={{marginLeft: 10}} className="delete-btn" onClick={() => handleClickOpen()}>
        <FaHistory />
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-history-dialog-title"
      >
        <DialogTitle id="edit-history-dialog-title">
          <div ref={ref}>Lịch sử chỉnh sửa</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lịch sử các thay đổi đã được thực hiện:
          </DialogContentText>
          <List>
            {data?.length > 0 && data?.map((edit, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {/* <HistoryIcon /> */}
                  <FaHistory />
                </ListItemIcon>
                <ListItemText
                  primary={<div>Chỉnh sửa bởi <strong>{edit?.user?.firstName}</strong> vào thời điểm</div>}
                  secondary={moment(edit?.time_updated).format("DD-MM-YYYY HH:mm:ss")}
                />
              </ListItem>
            ))}
            {
                data?.length=== 0 && <div style={{textAlign: "center"}}>Chưa có lịch sử chỉnh sửa</div>
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistoryEditTour;
