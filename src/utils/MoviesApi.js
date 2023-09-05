import { MOVIES_API } from "./const";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getMovies() {
    return this._request(`/beatfilm-movies`, { headers: this._headers() });
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    res.json().then((data) => console.log(data));
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleResponse);
  }
}

const api = new MoviesApi({
  baseUrl: MOVIES_API,
  headers: () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  },
});

export default api;
