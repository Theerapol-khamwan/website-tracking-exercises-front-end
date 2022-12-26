import React from "react";
import styles from "./PageLanding.module.css";
import { Link } from "react-router-dom";

const PageLandingNew = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.left}>
        <p className={styles.textGreen}>Your body can do it,</p>
        <p className={styles.textBlack}>it’s time to convince your mind!</p>

        <div className={styles.btnBox}>
          <Link to="/login" className={styles["btn-21"]}>
            <button variant="contained">Let's go!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageLandingNew;
