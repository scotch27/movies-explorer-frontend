import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { PAGES } from "../../utils/const";
import cards from "../../utils/initialCards";
import MainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState({ name: "", email: "" });
  const [autchOk, setAutchOk] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const navigate = useNavigate();

  const signOut = () => {
    console.log("signOut");
    localStorage.removeItem("jwt");
    setUserData({});
    setLoggedIn(false);
    navigate(PAGES.MAIN, { replace: true });
  };

  const handleLogin = ({ email, password }) => {
    console.log({ email, password });
    MainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setUserData({ email: email });
          setLoggedIn(true);
          // navigate("/", { replace: true });
        } else {
          setAutchOk(false);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setAutchOk(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleRegister = ({ name, email, password }) => {
    MainApi.register({ name, email, password })
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        setAutchOk(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserData({ name: res.name, email: res.email });
            setLoggedIn(true);
            // navigate(PAGES.MOVIES, { replace: true });
          }
        })
        .catch((err) => {
          setAutchOk(false);
          // setIsInfoToolTipOpen(true);
        });
    }
  };

  function handleUpdateUser(values) {
    MainApi.setUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path={PAGES.MAIN} element={<Main loggedIn={loggedIn} />} />

        <Route element={<ProtectedRoute loggedIn={loggedIn} toAuth={false} />}>
          <Route
            path={PAGES.LOGIN}
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path={PAGES.REGISTER}
            element={<Register handleRegister={handleRegister} />}
          />
        </Route>
        <Route element={<ProtectedRoute loggedIn={loggedIn} toAuth={true} />}>
          <Route
            path={PAGES.MOVIES}
            element={<Movies loggedIn={loggedIn} cards={cards} />}
          />
          <Route
            path={PAGES.SAVED_MOVIES}
            element={<SavedMovies loggedIn={loggedIn} cards={cards} />}
          />
          <Route
            path={PAGES.PROFILE}
            element={
              <Profile signOut={signOut} onUpdateUser={handleUpdateUser} />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
