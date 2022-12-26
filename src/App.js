import React, { useCallback, useEffect, useState, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageLandingNew from "./pages/Landing/PageLandingNew";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

// import Profile from "./pages/Profile/Profile";
// import HomePersonal from "./pages/HomePersonal/HomePersonal";
// import CreateActivity from "./pages/CreateActivity/CreateActivity";
// import AccountSetting from "./pages/AccountSetting/AccountSetting";
// import EditActivity from "./pages/EditActivity/EditActivity";
// import EditProfile from "./pages/EditProfile/EditProfile";

import { AuthContext } from "./context/auth-context";
import LoadingAnimation from "./G-components/LoadingAnimation";

const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const HomePersonal = React.lazy(() =>
  import("./pages/HomePersonal/HomePersonal")
);
const CreateActivity = React.lazy(() =>
  import("./pages/CreateActivity/CreateActivity")
);
const AccountSetting = React.lazy(() =>
  import("./pages/AccountSetting/AccountSetting")
);
const EditActivity = React.lazy(() =>
  import("./pages/EditActivity/EditActivity")
);
const EditProfile = React.lazy(() => import("./pages/EditProfile/EditProfile"));

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path={`/${userId}/activity`} element={<HomePersonal />} />
        <Route path={`/${userId}/profile`} element={<EditProfile />} />
        <Route path="/activity/new" element={<CreateActivity />} />
        <Route path="/profile/new" element={<Profile />} />
        <Route path="/activity/:aid" element={<EditActivity />} />
        <Route
          path={`/${userId}/accountSetting`}
          element={<AccountSetting />}
        />

        <Route
          path="*"
          element={<Navigate to={`/${userId}/activity`} replace />}
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<PageLandingNew />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Suspense
          fallback={
            <div>
              <LoadingAnimation />
            </div>
          }
        >
          {routes}
        </Suspense>
      </AuthContext.Provider>
    </>
  );
};

export default App;
