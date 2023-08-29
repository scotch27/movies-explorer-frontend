import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Movies — компонент страницы с поиском по фильмам
function Movies({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="Movies">
        <h1>Movies</h1>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
