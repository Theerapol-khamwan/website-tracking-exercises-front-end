import { Button } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LoadingAnimation from "../../G-components/LoadingAnimation";
import ErrorModal from "../../G-components/ErrorModal";
import useFormValidation from "../../hooks/use-form-validation";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";

import styles from "../SignIn/SignIn.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const SignIn = (props) => {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"/users/login",
        "POST",
        JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData.userId, responseData.token);

      resetPassword();
      resetemail();
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal open={error} onClose={clearError} />
      {isLoading && <LoadingAnimation asOverlay />}
      <div className={styles.container}>
        <Container component="main" maxWidth="xl">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Paper
              style={{ padding: 30, margin: "15px" }}
              sx={{
                width: 480,
                height: 496,
              }}
            >
              <Box>
                <Typography
                  component="h3"
                  fontSize="40px"
                  fontWeight="700"
                  className="flex justify-start"
                >
                  SIGN IN
                </Typography>

                <Typography
                  color="black"
                  fontSize="20px"
                  className="flex justify-start"
                >
                  "Never Stop Running"
                </Typography>
              </Box>

              {/*---- E-mail ---- */}
              <Box>
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
                  helperText={emailHasError ? "This will be your new ID." : ""}
                />

                {/*--------- Password --------- */}
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
                    passwordHasError ? "You will use this when you login" : ""
                  }
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
              </Box>

              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={submithHandler}
                  sx={{ width: "25ch" }}
                  className="bg-slate-800 hover:bg-zinc-900 font-semibold mb-4"
                >
                  Sign In
                </Button>
              </Box>
              <p>
                Do not have an account?{" "}
                <a
                  href="#SignUp"
                  style={{ textDecoration: "none" }}
                  className=" font-medium hover:text-neutral-600"
                >
                  <Link to="/signUp">Sign Up</Link>
                </a>
              </p>
            </Paper>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
