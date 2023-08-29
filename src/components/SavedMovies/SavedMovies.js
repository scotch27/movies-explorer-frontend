// SavedMovies — компонент страницы с сохранёнными карточками фильмов.

import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="SavedMovies">
        <h1>SavedMovies</h1>
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
