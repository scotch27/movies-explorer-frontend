// NotFound — компонент ненайденной страницы

import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";
import { PAGES } from "../../utils/const";

function NotFound() {
  const navigate = useNavigate();

  console.log(navigate(-1));
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__text">Страница не найдена</p>
      <Link
        onClick={() => navigate(-1)}
        to={PAGES.MAIN}
        className="notfound__link"
      >
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
