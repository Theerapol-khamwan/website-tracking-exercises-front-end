import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "../../../../context/auth-context";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardItem = (props) => {
  const auth = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cancelDeleteHandler = () => {
    setOpen(false);
  };

  const confirmDeleteHandler = async () => {
    setOpen(false);
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/activity/${props.id}`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  //============================= end confirm Delete Handler ====================================//

  function convertToMinutes(time) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = time.split(":");

    // Convert the hours and minutes to integers
    const intHours = parseInt(hours, 10);
    const intMinutes = parseInt(minutes, 10);

    // Calculate the total number of minutes
    const totalMinutes = intHours * 60 + intMinutes;

    return totalMinutes;
  }

  const timeStart = convertToMinutes(props.timeStart);
  const timeEnd = convertToMinutes(props.timeEnd);
  const allTime = timeEnd - timeStart;

  //============================= end convert To Minutes ====================================//

  let emojiSport;
  if (props.sport === "Bicycle ride") {
    emojiSport = "🚴‍♂️";
  } else if (props.sport === "Run") {
    emojiSport = "🏃";
  } else if (props.sport === "Swim") {
    emojiSport = "🏊‍♀️";
  } else if (props.sport === "Walk") {
    emojiSport = "🚶‍♂️";
  } else if (props.sport === "Hike") {
    emojiSport = "🥾";
  }

  //============================= end emojiSport ====================================//

  return (
    <>
      <li className="m-3">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Activity?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
              This can’t be undone and it will be removed from your profile
            </Typography>
            <Box>
              <Button
                variant="contained"
                fullWidth
                onClick={confirmDeleteHandler}
                sx={{
                  bgcolor: "#F51145",
                  mb: 2,
                  "&:hover": {
                    color: "#FFFFFF",
                    bgcolor: "#900625",
                  },
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={cancelDeleteHandler}
                sx={{
                  border: "1px solid #000000",
                  color: "#000000",
                  "&:hover": {
                    color: "#FFFFFF",
                    bgcolor: "#747474",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* ------------------------------------------End Modal----------------------------------------*/}

        <Card sx={{ maxWidth: 545 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
          />
          <CardContent>
            <div className="flex justify-between align-middle">
              <Typography gutterBottom variant="h5" component="div">
                {props.activityName}
              </Typography>
              <Typography variant="body1">
                {props.sport} {emojiSport}
              </Typography>
            </div>

            <Typography variant="body1" color="text.secondary">
              📅 {props.date} 🕐 {props.timeStart} ({allTime} minutes)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
          <CardActions className="flex justify-start">
            {auth.userId === props.creatorId && (
              <Button size="small" className="text-gray-700 hover:bg-gray-300">
                <Link to={`/activity/${props.id}`}>
                  <EditIcon /> Edit
                </Link>
              </Button>
            )}

            {auth.userId === props.creatorId && (
              <Button
                size="small"
                onClick={handleOpen}
                className="text-gray-300 hover:bg-gray-200"
              >
                <DeleteIcon /> Delete
              </Button>
            )}
          </CardActions>
        </Card>

        {/* ------------------------------------------End Cared 1----------------------------------------*/}
      </li>
    </>
  );
};

export default CardItem;
