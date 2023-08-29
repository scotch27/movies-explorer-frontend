import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { PAGES } from "../../utils/const";

function App() {
  const [currentUser, setCurrentUser] = useState({name: "Виталий", email:"pochta@yandex.ru"});
  const [loggedIn, setLoggedIn] = useState(true);

  const signOut = () => {
     setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path={PAGES.MAIN} element={<Main loggedIn={loggedIn} />} />
          <Route path={PAGES.MOVIES} element={<Movies loggedIn={loggedIn}/>} />
          <Route path={PAGES.SAVED_MOVIES} element={<SavedMovies loggedIn={loggedIn}/>} />
          <Route path={PAGES.PROFILE} element={<Profile loggedIn={loggedIn} signOut={signOut} />} />
          <Route path={PAGES.LOGIN} element={<Login />} />
          <Route path={PAGES.REGISTER} element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
