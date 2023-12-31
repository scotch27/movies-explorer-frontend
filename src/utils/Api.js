class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      // console.log("API OK: " + res.status)
      return res.json();
    }
    res.json().then((body) => console.log(body));
    // если ошибка, отклоняем промис
    return Promise.reject({ "code" : res.status});
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleResponse);
  }
}

export default Api;
