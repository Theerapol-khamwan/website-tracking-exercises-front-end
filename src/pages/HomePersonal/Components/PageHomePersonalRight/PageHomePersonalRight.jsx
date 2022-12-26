import React from "react";
import styles from "./PageHomePersonalRight.module.css";
import ActivitySummary from "../ActivitySummary/ActivitySummary";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import MessageIcon from "@mui/icons-material/Message";

const PageHomePersonalRight = (props) => {
  const dataProfile = props.dataProfile;

  const goal = "🔥 Calories " + dataProfile.calories + " kcal";
  const quotes = dataProfile.motivation;

  return (
    <>
      <div className="top-0 right-0 sticky">
        <div className={styles.PageHomePersonalRight}>
          <ActivitySummary dataProfile={dataProfile} />
          <div className={styles.goal}>
            <p className="text-white font-medium mt-3 text-xl">
              <FlagCircleIcon className="mr-2" />
              Goal
            </p>
            <div className={styles.goalIn}>{goal}</div>
          </div>
          <div className={styles.motivation}>
            <p className="text-white font-medium text-xl">
              <MessageIcon className="mr-2" />
              motivation quotes
            </p>
            <div className={styles.motivationIn}>{quotes}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHomePersonalRight;
