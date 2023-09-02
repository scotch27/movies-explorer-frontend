import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, cards }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <SearchForm />
        <MoviesCardList cards={cards} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
