import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import CardList from "./CardList";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { useHttpClient } from "../../../../hooks/http-hook";
import { AuthContext } from "../../../../context/auth-context";

const AllCard = () => {
  const auth = useContext(AuthContext);
  const [loadedActivities, setLoadedActivities] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  const userId = auth.userId;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/activity/user/${userId}`
        );
        setLoadedActivities(responseData.activities);
      } catch (err) {}
    };
    fetchActivities();
  }, [sendRequest, userId]);

  const placeActivityHandler = (deletedActivityId) => {
    setLoadedActivities((prevActivity) =>
      prevActivity.filter((act) => act.id !== deletedActivityId)
    );
  };

  return (
    <>
      <Container
        className="p-5"
        maxWidth="xl"
        style={{ backgroundColor: "#15202B" }}
      >
        <Link to="/activity/new">
          <Button
            variant="contained"
            fullWidth
            className="bg-slate-700 hover:bg-slate-600 mb-3 sticky top-0"
          >
            <h1 className="font-bold text-lg">POST 💭</h1>
          </Button>
        </Link>

        {isLoading && <div>isLoading ..........</div>}

        {!isLoading && loadedActivities && (
          <CardList
            items={loadedActivities}
            onDeleteActivity={placeActivityHandler}
          />
        )}
      </Container>
    </>
  );
};

export default AllCard;
