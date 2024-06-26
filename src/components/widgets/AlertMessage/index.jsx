import React from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertMessage = ({ openMessage, setOpenMessage }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  return (
    <>
      <div className="desktop">
        <Snackbar
          open={openMessage.state}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={openMessage.type || "success"}
            variant="filled"
            sx={{ width: "100%", scale: "1.2", marginLeft: "1em" }}
          >
            {openMessage.message}
          </Alert>
        </Snackbar>
      </div>
      <div className="mobile">
        <Snackbar
          open={openMessage.state}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={openMessage.type || "success"}
            variant="filled"
            sx={{ width: "100%", scale: "1", marginLeft: "1em" }}
          >
            {openMessage.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AlertMessage;
