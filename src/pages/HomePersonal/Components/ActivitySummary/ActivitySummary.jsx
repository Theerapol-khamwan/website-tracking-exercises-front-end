import { Box, Container } from "@mui/material";
import PieChart from "./components/PieChart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import CalculateBMI from "./components/CalculateBMI";
import PieChartIcon from '@mui/icons-material/PieChart';

const ActivitySummary = (props) => {
  const auth = useContext(AuthContext);
  const [loadedActivities, setLoadedActivities] = useState();
  const { sendRequest } = useHttpClient();
  const userId = auth.userId;

  // #GET DATA Profile
  const dataProfile = props.dataProfile;

  // #GET DATA Activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/activity/user/${userId}`
        );
        setLoadedActivities(responseData.activities);
      } catch (err) {}
    };
    fetchActivities();
  }, [sendRequest, userId]);

  // #Count Type Sport
  let labelArr1,
    dataArr1,
    countRun,
    countBicycle,
    countSwim,
    countWalk,
    countHike;
  if (loadedActivities) {
    const activities = loadedActivities.map((data) => data.sport);
    const activityString = activities.join(",");
    console.log(activityString);

    countRun = (activityString.match(/Run/g) || []).length;
    countBicycle = (activityString.match(/Bicycle ride/g) || []).length;
    countSwim = (activityString.match(/Swim/g) || []).length;
    countWalk = (activityString.match(/Walk/g) || []).length;
    countHike = (activityString.match(/Hike/g) || []).length;

    // #DATA TYPE SPORT
    const UserData = {
      Run: countRun,
      "Bicycle ride": countBicycle,
      Swim: countSwim,
      Walk: countWalk,
      Hike: countHike,
    };

    labelArr1 = Object.keys(UserData);
    dataArr1 = Object.values(UserData);
  } else {
    console.log("error");
  }

  // #Input Data piechart
  const userData = {
    labels: labelArr1,
    datasets: [
      {
        label: "count",
        data: dataArr1,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Box className="flex flex-wrap text-center justify-between">
        <h2 className="text-slate-50 uppercase mb-4 font-medium"><PieChartIcon className="mr-2"/>Your activity</h2>
        <Box className="p-2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
          <PieChart chartData={userData} />
        </Box>
      </Box>
    </>
  );
};

export default ActivitySummary;
