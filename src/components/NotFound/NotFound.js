// NotFound — компонент ненайденной страницы

import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";
import { PAGES, ERROR_MSG_PAGE_NOT_FOUND } from "../../utils/const";

function NotFound() {
  const navigate = useNavigate();

  function onBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__text">{ERROR_MSG_PAGE_NOT_FOUND}</p>
      <Link onClick={onBack} to={PAGES.MAIN} className="notfound__link">
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
