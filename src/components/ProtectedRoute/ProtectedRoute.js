import { Navigate } from "react-router-dom";
import { PAGES } from "../../utils/const";

function ProtectedRoute ({ element: Component, loggedIn, ...props  }) {

  return (
    loggedIn ? <Component loggedIn={loggedIn} {...props} /> : <Navigate to={PAGES.MAIN}  replace/>
)}

export default ProtectedRoute;
