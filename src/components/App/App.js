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
// import cards from "../../utils/initialCards";
import mainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedCards, setSavedCards] = useState([]);

  const [autchOk, setAutchOk] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const navigate = useNavigate();

  const signOut = () => {
    console.log("signOut");
    // localStorage.removeItem("jwt");
    localStorage.clear();
    setLoggedIn(false);
    navigate(PAGES.MAIN, { replace: true });
  };

  const handleLogin = ({ email, password }) => {
    console.log({ email, password });
    mainApi
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
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
    mainApi
      .register({ name, email, password })
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
          setAutchOk(false);
          // setIsInfoToolTipOpen(true);
        });
    }
  };

  function handleUpdateUser(values) {
    mainApi
      .setUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error);
  }

  function handleSaveCard(card) {
    // console.log("handleSaveCard");
    // console.log(card);

    mainApi
      .setMovie(card)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch(console.error);
  }

  function onDeleteCard(card) {
    // console.log("onDeleteCard");
    // console.log(card);
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
