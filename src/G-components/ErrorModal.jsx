import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid red",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function ErrorModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            An Error Occurred!👻
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
