// NotFound — компонент ненайденной страницы

import { Link } from "react-router-dom";
import "./NotFound.css";
import { PAGES, ERROR_MSG_PAGE_NOT_FOUND } from "../../utils/const";

function NotFound() {
  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__text">{ERROR_MSG_PAGE_NOT_FOUND}</p>
      <Link
        to={PAGES.MAIN}
        className="notfound__link"
      >
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
