import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import submit_contact from '../../../api/submit_contact';
import swal from "sweetalert"

export default function ContactPopup() {
  const [open, setOpen] = React.useState(false); 
  const [email, setEmail]= React.useState("")
  const [name, setName]= useState("")
  const [phone, setPhone]= useState("")
  const [content, setContent]= useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Contact
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Contact"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField value={name} onChange={(e)=> setName(e.target.value)} style={{width: 500, height: 40, marginTop: 12, marginBottom: 12}} placeholder={"Your name"} />
            <TextField value={email} onChange={(e)=> setEmail(e.target.value)} style={{width: 500, height: 40, marginTop: 12, marginBottom: 12}} placeholder={"Your email"} />
            <TextField value={phone} onChange={(e)=> setPhone(e.target.value)} style={{width: 500, height: 40, marginTop: 12, marginBottom: 12}} placeholder={"Your phone"} />
            <TextField value={content} onChange={(e)=> setContent(e.target.value)} style={{width: 500, height: 40, marginTop: 12, marginBottom: 12}} placeholder={"Type here what you want ask"} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={async ()=> {
            const result= await submit_contact({email, name, content, date_send: new Date(), status: "unprocessing", phone})
            console.log("result", result)
            if(result.ok=== true) {
                swal("Thông báo", "Đã gửi thành công", "success")
                .then(()=> {
                    setEmail("")
                    setName("")
                    setContent("")
                })
                .then(()=> handleClose())
            }
            else {
                swal("Thông báo", "Gửi thất bại", "error")
            }
          }} color="primary" autoFocus variant={"contained"}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}