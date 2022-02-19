import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";

export const NotificationContext = React.createContext(null);

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const NotificationWrapper = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const notification = (message, type) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
        key={123}
      >
        {type === "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : type === "error" ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        ) : (
          <div>{message}</div>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export default NotificationWrapper;
