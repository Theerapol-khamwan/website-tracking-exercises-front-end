import React, { useEffect, useState, useContext } from "react";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Controls from "./../CreateActivity/Components/Controls";
import { Typography } from "@mui/material";
import { useHttpClient } from "../../hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import LoadingAnimation from "../../G-components/LoadingAnimation";
import ErrorModal from "../../G-components/ErrorModal";

const EditActivity = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedActivities, setLoadedActivities] = useState();
  const actID = useParams().aid;
  const navigate = useNavigate();

  const [photo, setPhoto] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [activityType, setActivityType] = useState("");
  const [description, setDescription] = useState("");

  const onChangePhoto = (e) => {
    setPhoto([...e.target.files]);
  };
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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/activity/${actID}`
        );
        setLoadedActivities(responseData.activity);

        setActivityName(responseData.activity.title);
        setDate(responseData.activity.date);
        setTimeStart(responseData.activity.timeStart);
        setTimeEnd(responseData.activity.timeEnd);
        setActivityType(responseData.activity.sport);
        setDescription(responseData.activity.description);
      } catch (err) {}
    };
    fetchActivities();
  }, [sendRequest, actID]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const createActivityData = {
        image: photo,
        title: activityName,
        date: date,
        timeStart: timeStart,
        timeEnd: timeEnd,
        sport: activityType,
        description: description,
      };

      await axios.patch(
        process.env.REACT_APP_BACKEND_URL+`/activity/${actID}`,
        createActivityData,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      navigate("/" + auth.userId + "/activity");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  if (!loadedActivities && !error) {
    return (
      <div>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <>
      {!isLoading && loadedActivities && (
        <Container
          component="main"
          maxWidth="sm"
          className="grid h-screen place-items-center"
        >
          <Paper className="w-full p-6 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-white-600">
            <form component="form" onSubmit={submitHandler} noValidate>
              <Typography className="text-black font-bold text-3xl text-start uppercase">
                Change Activity
              </Typography>

              <Controls.Input
                naem="activityName"
                value={activityName}
                onChange={onChangeActivityName}
              />

              <Controls.DatePicker value={date} onChange={onChangeDate} />

              <div className="flex justify-evenly">
                <Controls.TimepickerStart
                  value={timeStart}
                  onChange={onChangeTimeStart}
                />

                <Controls.TimepickerEnd
                  value={timeEnd}
                  onChange={onChangeTimeEnd}
                />
              </div>

              <Controls.SelectSport
                value={activityType}
                onChange={onChangeActivityType}
              />

              <Controls.Description
                value={description}
                onChange={onChangeDescription}
              />

              <div className="flex justify-between">
                <Controls.ButtonSave type="submit" text="submit" />
                <Controls.ButtonCancel type="cancel" text="cancel" />
              </div>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default EditActivity;
