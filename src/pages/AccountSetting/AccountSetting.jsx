import React, { useContext, useEffect } from "react";
import useFormValidation from "../../hooks/use-form-validation";
import { useState } from "react";

import { Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const AccountSetting = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userID = auth.userId;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useFormValidation(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useFormValidation(isNotEmpty);

  const isConfirm = (value) => value === passwordValue;

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordISValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useFormValidation(isConfirm);

  let formIsValid = false;

  if (emailIsValid & passwordIsValid & confirmPasswordISValid) {
    formIsValid = true;
  }

  useEffect(() => {
    const fetchDataProfile = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL`/users/${userID}`
        );
        const data = responseData.user.email;
        setLoadedUser(data);
      } catch (err) {}
    };
    fetchDataProfile();
  }, [sendRequest, userID]);

  const submithHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const createEditProfile = {
      email: emailValue,
      password: passwordValue,
    };

    await axios.patch(
      process.env.REACT_APP_BACKEND_URL+`/users/${userID}`,
      createEditProfile,
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    resetPassword();
    resetConfirmPassword();
    resetEmail();
    navigate("/" + auth.userId + "/activity");
  };

  const cancelHabdler = () => {
    resetPassword();
    resetConfirmPassword();
    resetEmail();
    navigate("/" + auth.userId + "/activity");
  };

  return (
    <Container
      maxWidth="sm"
      className=" flex justify-center items-center h-screen"
    >
      <form onSubmit={submithHandler} className="bg-white rounded-lg p-9">
        <Typography className="text-back font-semibold text-5xl m-4">
          Account Setting
        </Typography>

        <TextField
          fullWidth
          required
          label={loadedUser}
          id="ConfirmEmail"
          name="ConfirmEmail"
          type="text"
          variant="outlined"
          size="small"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText={
            emailHasError ? "Do not forget to fill in your e-mail." : ""
          }
          className="my-3"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          name="newPassword"
          label="New Password 🔑"
          type={showPassword ? "text" : "password"}
          id="newPassword"
          autoComplete="newPassword"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          helperText={
            passwordHasError ? "You will use this when you login" : ""
          }
          className="my-3"
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          name="confirmPassword"
          label="Confirm New Password 🎁"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          autoComplete="confirmPassword"
          value={confirmPasswordValue}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={confirmPasswordHasError}
          helperText={
            confirmPasswordHasError ? "You will use this when you login" : ""
          }
          className="my-3"
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div className="my-2 flex justify-between">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "30ch" }}
            startIcon={<SaveIcon />}
            disabled={!formIsValid}
            className="bg-slate-800 hover:bg-zinc-900 mr-4 font-semibold text-slate-100"
          >
            Change Password
          </Button>
          <Button
            type="cancel"
            variant="outlined"
            sx={{ width: "30ch" }}
            startIcon={<CancelIcon />}
            onClick={cancelHabdler}
            className=" hover:bg-zinc-200 text-zinc-900 border-gray-700 font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AccountSetting;
