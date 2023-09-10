import Api from "./Api";
import { MAIN_API } from "./const";

class MainApi extends Api {
  register({ name, email, password }) {
    console.log({ name, email, password });
    return this._request(`/signup`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({ name, email, password }),
    });
  }

  authorize({ email, password }) {
    return this._request(`/signin`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
  }

  checkToken(token) {
    return this._request(`/users/me`, {
      headers: this._headers(),
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, { headers: this._headers() });
  }

  setUserInfo({ name, email }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers(),
      body: JSON.stringify({ name, email }),
    });
  }

  // Movies

  getMovies() {
    return this._request(`/movies`, { headers: this._headers() });
  }

  setMovie(card) {
    // console.log(card);
    return this._request(`/movies`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: card.image,
        trailerLink: card.trailerLink,
        thumbnail: card.thumbnail,
        movieId: card.movieId,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    });
  }

  deleteMovie(cardId) {
    return this._request(`/movies/${cardId}`, {
      method: "DELETE",
      headers: this._headers(),
    });
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API,
  headers: () => {
    return {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  },
});

export default mainApi;
