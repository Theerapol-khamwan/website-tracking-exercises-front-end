import React from "react";
import { Button } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const ButtonSave = (props) => {
  const { onClick, text, disabled, ...other } = props;

  return (
    <Button
      variant="contained"
      color="success"
      className="m-3 w-52 bg-slate-800 hover:bg-zinc-900 mr-4 font-semibold text-slate-100"
      startIcon={<LibraryAddIcon />}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {text}
    </Button>
  );
};

export default ButtonSave;
