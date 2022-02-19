import {
  Box,
  Button,
  FormHelperText,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(2),
}));

const AddSportModal = ({ open, onClose, onAddClick }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAddClicked = () => {
    if (!name) return setError("Bạn chưa nhập tên môn thể thao");
    if (onAddClick) onAddClick(name);
    setName("");
    onClose();
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(e.target.value);
    setError("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-sport"
      aria-describedby="modal-add-description"
    >
      <Container>
        <Box>
          <Typography variant="h4" component="div">
            Thêm môn thể thao
          </Typography>
        </Box>
        <Box>
          <TextField
            id="standard-basic"
            label="Nhập môn thể thao"
            variant="standard"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
          <FormHelperText error sx={{ textAlign: "center" }}>
            {error}
          </FormHelperText>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>
          <Box sx={{ width: 8 }} />
          <Button variant="contained" onClick={handleAddClicked}>
            Thêm
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default AddSportModal;
