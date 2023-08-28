import { Route, Routes} from "react-router-dom";
import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { PAGES } from '../../utils/const';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PAGES.MAIN} element={<Main />} />
        <Route path={PAGES.MOVIES} element={<Movies />} />
        <Route path={PAGES.SAVED_MOVIES} element={<SavedMovies />} />
        <Route path={PAGES.PROFILE} element={<Profile />} />
        <Route path={PAGES.LOGIN} element={<Login />} />
        <Route path={PAGES.REGISTER} element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
