import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/system";

import Navbar from "../../G-components/Navbar";
import AllCard from "./Components/card/AllCard";
import ActivitySummary from "./Components/ActivitySummary/ActivitySummary";
import PageHomePersonal from "./Components/PageHomePersonal/PageHomePersonal";
import PageHomePersonalRight from "./Components/PageHomePersonalRight/PageHomePersonalRight";
import { Grid } from "@mui/material";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

const HomePersonal = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = auth.userId;

  const [dataProfile, setdataProfile] = useState("");

  useEffect(() => {
    const fetchDataProfile = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/profile/user/${userID}`
        );
        const data = responseData.activities[0];
        setdataProfile(data);
      } catch (err) {}
    };
    fetchDataProfile();
  }, [sendRequest, userID]);

  return (
    <>
      <div style={{ backgroundColor: "#15202B", height: "auto" }}>
        <Container maxWidth="xl">
          <div className="flex flex-row">
            <div className="basis-1/4">
              <div className="top-0 left-0 sticky">
                <PageHomePersonal dataProfile={dataProfile} />
              </div>
            </div>

            <div className="basis-3/5">
              <AllCard />
            </div>

            <div className="basis-1/4">
              <PageHomePersonalRight dataProfile={dataProfile} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePersonal;
