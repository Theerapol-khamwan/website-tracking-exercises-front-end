import styles from "./PageHomePersonal.module.css";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import CalculateBMI from "../ActivitySummary/components/CalculateBMI";

const PageHomePersonal = (props) => {
  const dataProfile = props.dataProfile;
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  const weight = dataProfile.weight;
  const height = dataProfile.height;
  const gender = dataProfile.gender;
  const dateString = dataProfile.dateBrith;

  // ==================== end variable =====================================//

  const dateOfBirth = new Date(dateString);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

  // ================= end calculate Age ====================================//

  const heightSquared = height * height;
  const calculateBMI = (weight / heightSquared) * 10000;

  // ================= end calculate BMI ====================================//

  function calculateBMR(weight, height, age, gender) {
    if (gender === "Male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "Female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  const resultBMR = calculateBMR(weight, height, age, gender);

  // ================= end calculate BMR ====================================//
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.profilePic}>
          <Avatar
            src={`${process.env.REACT_APP_ASSET_URL}/${dataProfile.image}`}
            sx={{ width: 150, height: 150 }}
          />
        </div>

        <div>
          <div className="flex justify-center">
            <p className={styles.perInfo}>{dataProfile.name}</p>
            <p className={styles.perInfo}>{dataProfile.lastname}</p>
          </div>

          <ul>
            <NavLink to={`/${userId}/activity`}>
              <li className=" text-white text-start hover:bg-gray-700 font-semibold text-xl rounded-full p-2 mb-2">
                <HomeIcon sx={{ marginRight: 2 }} /> Home
              </li>
            </NavLink>
            <NavLink to={`/${userId}/profile`}>
              <li className=" text-white text-start hover:bg-gray-700 font-semibold text-xl  rounded-full p-2 mb-2">
                <AccountCircleIcon sx={{ marginRight: 2 }} />
                Profile
              </li>
            </NavLink>
            <NavLink to={`/${userId}/accountSetting`}>
              <li className=" text-white text-start hover:bg-gray-700 font-semibold text-xl  rounded-full p-2 mb-2">
                <VpnKeyIcon sx={{ marginRight: 2 }} />
                Account settings
              </li>
            </NavLink>
            <button
              onClick={auth.logout}
              className=" text-white text-start hover:bg-gray-700 font-semibold text-xl  rounded-full p-2 mb-4 w-full"
            >
              <li>
                <LogoutIcon sx={{ marginRight: 2 }} />
                Logout
              </li>
            </button>
          </ul>

          <div className={styles.top}>
            <div className={styles.height}>
              <h2>height</h2>
              <h3>{dataProfile.height}</h3>
            </div>
            <div className={styles.weight}>
              <h2>weight</h2>
              <h3>{dataProfile.weight}</h3>
            </div>
            <div className={styles.age}>
              <h2>age</h2>
              <h3>{age}</h3>
            </div>
          </div>

          <div className={styles.middle}>
            <div className={styles.middleLeft}>BMI</div>
            <CalculateBMI dataProfile={dataProfile} />
          </div>

          <div className={styles.bottom}>
            <div className={styles.bottomLeft}>BMR</div>
            <div className={styles.bottomRight}>{resultBMR}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHomePersonal;
