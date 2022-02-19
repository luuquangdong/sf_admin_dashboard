import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

export default function IconConfirm({
  icon: Icon,
  titleConfirm,
  contentConfirm,
  onAgreeClick,
  data,
  fontSize = "small",
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreeClicked = () => {
    if (onAgreeClick) onAgreeClick(data);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Icon fontSize={fontSize} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleConfirm}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentConfirm}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button onClick={handleAgreeClicked} variant="contained">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
