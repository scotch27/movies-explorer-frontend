import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesApi from "../../utils/MoviesApi";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, cards }) {
  const onSearchMovies = () => {
    console.log("onSearchMovies");
    MoviesApi
      .getMovies()
      .then((data) => console.log(data))
      .catch(console.error);
  };


  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchMovies={onSearchMovies}  />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
