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
      <main className="movies">
        <SearchForm />
        <MoviesCardList cards={cards} type="saved" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
