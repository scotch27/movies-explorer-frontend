import Api from "./Api";
import { MOVIES_API } from "./const";

class MoviesApi extends Api {
  getMovies() {
    return this._request(`/beatfilm-movies`, { headers: this._headers() });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API,
  headers: () => ({
      "Content-Type": "application/json",
      Accept: "application/json",
    })
});

export default moviesApi;
