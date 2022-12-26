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
import React, { useContext, useState, useEffect } from "react";
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
import { useHttpClient } from "../../hooks/http-hook";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedProfile, setLoadedProfile] = useState();
  const userID = auth.userId;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [dateBrith, setDateBrith] = useState(dayjs());
  const [quote, setQuote] = useState("");
  const [calories, setCalories] = useState("");

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

  const onChangeCalories = (event) => {
    setCalories(event.target.value);
  };

  useEffect(() => {
    const fetchDataProfile = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/profile/user/${userID}`
        );
        const data = responseData.activities[0];
        setLoadedProfile(data);

        setFirstName(data.name);
        setLastName(data.lastname);
        setWeight(data.weight);
        setHeight(data.height);
        setGender(data.gender);
        setDateBrith(data.dateBrith);
        setQuote(data.motivation);
        setCalories(data.calories);
      } catch (err) {}
    };
    fetchDataProfile();
  }, [sendRequest, userID]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const newItemDataProfile = {
        name: firstName,
        lastname: lastName,
        weight: weight,
        height: height,
        gender: gender,
        dateBrith: dateBrith.$d,
        motivation: quote,
        calories: calories,
      };

      await axios.patch(
        process.env.REACT_APP_BACKEND_URL+`/profile/${loadedProfile.id}`,
        newItemDataProfile,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      navigate("/" + auth.userId + "/activity");
    } catch (err) {}
  };

  return (
    <>
      <Container
        maxWidth="sm"
        className=" flex justify-center items-center h-screen"
      >
        <form
          component="form"
          onSubmit={submitHandler}
          noValidate
          className="bg-white rounded-lg p-9"
        >
          <h1 className="text-back font-semibold text-7xl m-4">Edit Profile</h1>
          <div className="flex justify-between m-4">
            <TextField
              value={firstName}
              onChange={onChangeFirstName}
              type="text"
              sx={{ width: "25ch" }}
              id="outlined-basic"
              label="First name"
              variant="outlined"
            />

            <TextField
              value={lastName}
              onChange={onChangeLastName}
              type="text"
              sx={{ width: "25ch" }}
              id="outlined-basic"
              label="Last name"
              variant="outlined"
            />
          </div>

          <div className="flex justify-between m-4">
            <TextField
              className="mr-8"
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

          <div className="flex justify-start m-4 ">
            <Button
              variant="contained"
              sx={{ width: "25ch" }}
              type="submit"
              className="bg-slate-800 hover:bg-zinc-900 mr-4 font-semibold"
              endIcon={<SendIcon />}
            >
              submit
            </Button>
            <Button
              variant="outlined"
              type="cancel"
              sx={{ width: "25ch" }}
              className=" hover:bg-zinc-200 text-zinc-900 border-gray-700 font-semibold"
              startIcon={<CancelIcon />}
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
