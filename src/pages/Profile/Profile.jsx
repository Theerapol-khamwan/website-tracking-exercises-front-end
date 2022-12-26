import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import Navbar from "../../G-components/Navbar";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../G-components/ImageUpload/ImageUpload";
import { useForm } from "../../hooks/form-hooks";

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [dateBrith, setDateBrith] = useState(dayjs());
  const [quote, setQuote] = useState("");
  const [dayAndWeek, setDayAndWeek] = useState("");
  const [calories, setCalories] = useState("");

  const [formState, inputHandler] = useForm(false);

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const onChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const onChangeHeight = (event) => {
    setHeight(event.target.value);
  };

  const onChangeGender = (event) => {
    setGender(event.target.value);
  };

  const onChangeDateBrith = (event) => {
    setDateBrith(event);
  };

  const onChangeQuote = (event) => {
    setQuote(event.target.value);
  };

  const onChangeDayAndWeek = (event) => {
    setDayAndWeek(event.target.value);
  };

  const onChangeCalories = (event) => {
    setCalories(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", firstName);
      formData.append("lastname", lastName);
      formData.append("weight", weight);
      formData.append("height", height);
      formData.append("gender", gender);
      formData.append("dateBrith", dateBrith.$d);
      formData.append("motivation", quote);
      formData.append("calories", calories);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", auth.userId);

      await axios.post(process.env.REACT_APP_BACKEND_URL+"/profile", formData, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      navigate("/" + auth.userId + "/activity");
    } catch (err) {}
  };

  return (
    <>
      <Container
        maxWidth="sm"
        className="flex justify-center items-center h-screen"
      >
        <div className="bg-white rounded-lg p-4">
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
          />
        </div>

        <form
          component="form"
          onSubmit={submitHandler}
          noValidate
          className="bg-white ml-60 rounded-lg p-4"
        >
          <h1 className="text-7xl	mb-7 text-start m-4 font-bold">
            CREATE A PROFILE
          </h1>
          <div className="flex justify-between m-4">
            <TextField
              value={firstName}
              onChange={onChangeFirstName}
              type="text"
              id="outlined-basic"
              label="First name"
              sx={{ width: "25ch" }}
              className="mr-9"
              variant="outlined"
            />

            <TextField
              value={lastName}
              onChange={onChangeLastName}
              type="text"
              id="outlined-basic"
              label="Last name"
              sx={{ width: "25ch" }}
              variant="outlined"
            />
          </div>

          <div className="flex justify-between m-4">
            <TextField
              value={weight}
              onChange={onChangeWeight}
              type="number"
              label="Weight"
              id="outlined-start-adornment"
              sx={{ width: "25ch" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg.</InputAdornment>
                ),
              }}
            />

            <TextField
              value={height}
              onChange={onChangeHeight}
              type="number"
              label="Height"
              id="outlined-start-adornment"
              sx={{ width: "25ch" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm.</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex justify-between m-4">
            <FormControl sx={{ width: "25ch" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gender}
                label="Gender"
                onChange={onChangeGender}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of Brith"
                inputFormat="DD/MM/YYYY"
                value={dateBrith}
                onChange={onChangeDateBrith}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="flex justify-between m-4">
            <TextField
              value={quote}
              onChange={onChangeQuote}
              type="text"
              fullWidth
              id="fullWidth"
              label="Motivation quote for yourself"
              variant="outlined"
            />
          </div>

          <div className="flex justify-between m-4">
            <TextField
              value={calories}
              onChange={onChangeCalories}
              type="number"
              label="Calories"
              id="outlined-start-adornment"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kcal</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex justify-start m-4">
            <Button
              variant="contained"
              sx={{ width: "25ch" }}
              type="submit"
              className="bg-slate-800 hover:bg-zinc-900 mr-4"
              endIcon={<SendIcon />}
            >
              submit
            </Button>

            <Button
              variant="outlined"
              type="cancel"
              sx={{ width: "25ch" }}
              className=" hover:bg-zinc-200 text-zinc-900 border-gray-700"
              startIcon={<DeleteIcon />}
            >
              cancel
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Profile;
