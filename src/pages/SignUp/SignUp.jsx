import * as React from "react";
import useFormValidation from "../../hooks/use-form-validation";

import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import ErrorModal from "../../G-components/ErrorModal";
import LoadingAnimation from "../../G-components/LoadingAnimation";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

import styles from "../SignUp/SignUp.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const SignUp = () => {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetemail,
  } = useFormValidation(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useFormValidation(isNotEmpty);

  let formIsValid = false;

  if (emailIsValid & passwordIsValid) {
    formIsValid = true;
  }

  const submithHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL+"/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      auth.login(responseData.userId, responseData.token);
      navigate("/profile/new");

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }

    resetPassword();
    resetemail();
  };

  const theme = createTheme();
  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <ErrorModal open={error} onClose={errorHandler} />
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="false"
          className={styles.container}
        >
          <div className=" flex justify-around text-9xl font-bold ">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <h1 className={styles.textAccount}>
                CREATE AN <br />
                ACCOUNT
              </h1>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Paper
                sx={{
                  width: 480,
                  height: 596,
                }}
              >
                <Box className="p-5">
                  <div className={styles.BoxOne}>
                    <h2>What's your email?</h2>
                    <hr className={styles.linegreen} />
                    <p>Easy and Fast</p>
                  </div>

                  <form onSubmit={submithHandler} >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email 📧"
                      name="email"
                      type="text"
                      autoComplete="email"
                      value={emailValue}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      error={emailHasError}
                      helperText={
                        emailHasError ? "This will be your new ID." : ""
                      }
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password 🔑"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="password"
                      value={passwordValue}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      error={passwordHasError}
                      helperText={
                        passwordHasError
                          ? "You will use this when you login"
                          : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formIsValid}
                      sx={{ width: "25ch" }}
                      className="bg-slate-800 hover:bg-zinc-900 font-semibold mb-4 text-white"
                    >
                      Create Account
                    </Button>
                  </form>
                </Box>
              </Paper>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
