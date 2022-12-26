import React from "react";
import styles from "../G-components/LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.loaderAll}>
      <div className={styles.loaderContainer}>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
