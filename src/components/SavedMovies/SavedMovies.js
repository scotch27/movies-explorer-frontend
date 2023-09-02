import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

// Movies — компонент страницы с поиском по фильмам
function SavedMovies({ loggedIn, cards }) {
  cards = cards.filter((element) => element.saved);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <SearchForm />
        <MoviesCardList cards={cards} type="saved" />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
