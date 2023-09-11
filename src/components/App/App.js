import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import {
  PAGES,
  ERROR_MSG_DUBLICATE_EMAIL,
  ERROR_MSG_REGISTER_OTHER,
  ERROR_MSG_LOGIN_BAD,
  ERROR_MSG_SERVER,
  ERROR_MSG_LOGIN_TOCKEN_FORMAT,
  ERROR_MSG_PROFILE_OTHER,
} from "../../utils/const";
// import cards from "../../utils/initialCards";
import mainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const path = useLocation().pathname;
  const navigate = useNavigate();

  const signOut = () => {
    console.log("signOut");
    localStorage.clear();
    setLoggedIn(false);
    navigate(PAGES.MAIN, { replace: true });
  };

  const handleLogin = ({ email, password }) => {
    // console.log({ email, password });
    setErrorMessage("");
    mainApi
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          setErrorMessage(ERROR_MSG_LOGIN_TOCKEN_FORMAT);
        }
      })
      .catch((err) => {
        // console.log(err);
        setErrorMessage(
          err.code === 400 ? ERROR_MSG_LOGIN_BAD : ERROR_MSG_SERVER
        );
        // setErrorMessage(ERROR_MSG_LOGIN_BAD);
      });
  };

  const handleRegister = ({ name, email, password }) => {
    setErrorMessage("");
    mainApi
      .register({ name, email, password })
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        // console.log(err);
        setErrorMessage(
          err.code === 409
            ? ERROR_MSG_DUBLICATE_EMAIL
            : ERROR_MSG_REGISTER_OTHER
        );
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ ...res });
            // console.log(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(ERROR_MSG_SERVER);
        });
    }
  };

  function handleUpdateUser(values) {
    mainApi
      .setUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        // console.log(err);
        setErrorMessage(
          err.code === 409 ? ERROR_MSG_DUBLICATE_EMAIL : ERROR_MSG_PROFILE_OTHER
        );
      });
  }

  function handleSaveCard(card) {
    mainApi
      .setMovie(card)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch(console.error);
  }

  function onDeleteCard(card) {
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        setSavedCards((newArray) =>
          newArray.filter((item) => card._id !== item._id)
        );
      })
      .catch(console.error);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMovies()
        .then((cards) => {
          console.log(cards);
          setSavedCards(cards);
        })
        .catch(console.error);
      // if (path === PAGES.LOGIN && path === PAGES.REGISTER) {
      //   console.log(path);
      //   navigate(PAGES.MOVIES, { replace: true });
      // }
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path={PAGES.MAIN} element={<Main loggedIn={loggedIn} />} />

        <Route
          path={PAGES.LOGIN}
          element={<Login handleLogin={handleLogin} message={errorMessage} />}
        />
        <Route
          path={PAGES.REGISTER}
          element={
            <Register handleRegister={handleRegister} message={errorMessage} />
          }
        />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path={PAGES.MOVIES}
            element={
              <Movies
                loggedIn={loggedIn}
                onSaveCard={handleSaveCard}
                onDeleteCard={onDeleteCard}
                savedCards={savedCards}
              />
            }
          />
          <Route
            path={PAGES.SAVED_MOVIES}
            element={
              <SavedMovies
                loggedIn={loggedIn}
                onDeleteCard={onDeleteCard}
                savedCards={savedCards}
              />
            }
          />
          <Route
            path={PAGES.PROFILE}
            element={
              <Profile
                loggedIn={loggedIn}
                signOut={signOut}
                onUpdateUser={handleUpdateUser}
                message={errorMessage}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
