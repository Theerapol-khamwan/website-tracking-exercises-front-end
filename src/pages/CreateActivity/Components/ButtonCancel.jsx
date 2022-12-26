import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

const ButtonCancel = (props) => {
  const { onClick, text, ...other } = props;

  return (
    <Button
      variant="outlined"
      startIcon={<CancelIcon />}
      onClick={onClick}
      className="m-3 hover:bg-zinc-200 text-zinc-900 border-gray-700 font-semibold w-52"
      {...other}
    >
      {text}
    </Button>
  );
};

export default ButtonCancel;
