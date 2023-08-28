// Profile — компонент страницы с профилем пользователя.

import "./Profile.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Profile() {
  return (
    <>
      <Header />
      <div className="Profile">
        <h1>Profile</h1>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
