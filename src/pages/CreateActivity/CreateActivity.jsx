import React, { useState, useContext } from "react";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Controls from "./Components/Controls";
import { Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import LoadingAnimation from "../../G-components/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../G-components/ImageUpload/ImageUpload";
import { useForm } from "../../hooks/form-hooks";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../G-components/ErrorModal";

const CreateActivity = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [activityType, setActivityType] = useState("");
  const [description, setDescription] = useState("");

  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        usValid: false,
      },
    },
    false
  );

  const onChangeActivityName = (e) => {
    setActivityName(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeTimeStart = (e) => {
    setTimeStart(e.target.value);
  };
  const onChangeTimeEnd = (e) => {
    setTimeEnd(e.target.value);
  };
  const onChangeActivityType = (e) => {
    setActivityType(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  let formIsValid = false;

  if (
    activityName &&
    date &&
    timeStart &&
    timeEnd &&
    activityType &&
    description
  ) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", activityName);
      formData.append("date", date);
      formData.append("timeStart", timeStart);
      formData.append("timeEnd", timeEnd);
      formData.append("sport", activityType);
      formData.append("description", description);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);

      await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/activity",
        formData,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      navigate("/" + auth.userId + "/activity");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }

    setActivityName("");
    setDate("");
    setTimeStart("");
    setTimeEnd("");
    setActivityType("");
    setDescription("");
  };

  const resetCancel = () => {
    setActivityName("");
    setDate("");
    setTimeStart("");
    setTimeEnd("");
    setActivityType("");
    setDescription("");
    navigate("/" + auth.userId + "/activity");
  };

  return (
    <>
      {isLoading && <LoadingAnimation asOverlay />}
      <Container component="main" maxWidth="sm" className="flex justify-center">
        <Paper className="w-full p-6 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-white-600">
          <form component="form" onSubmit={submitHandler} noValidate>
            <Typography className="text-black font-bold text-2xl text-center">
              Create Activity
            </Typography>

            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />

            <Controls.Input
              naem="activityName"
              value={activityName}
              onChange={onChangeActivityName}
            />

            <Controls.SelectSport
              value={activityType}
              onChange={onChangeActivityType}
            />

            <Controls.DatePicker value={date} onChange={onChangeDate} />

            <div className="flex justify-between">
              <Controls.TimepickerStart
                value={timeStart}
                onChange={onChangeTimeStart}
              />

              <Controls.TimepickerEnd
                value={timeEnd}
                onChange={onChangeTimeEnd}
              />
            </div>

            <Controls.Description
              value={description}
              onChange={onChangeDescription}
            />
            {!formIsValid && (
              <p className="text-white bg-red-500 text-center rounded-full text-xl">
                Please fill out all information 🥺
              </p>
            )}

            <div className="flex justify-start">
              <Controls.ButtonSave
                type="submit"
                text="submit"
                disabled={!formIsValid}
              />
              <Controls.ButtonCancel
                type="cancel"
                text="cancel"
                onClick={resetCancel}
              />
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateActivity;
