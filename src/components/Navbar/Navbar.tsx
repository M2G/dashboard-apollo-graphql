/*eslint-disable*/
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserFilters from 'containers/UserFilters';

function Navbar() {
  const { i18n } = useTranslation();
  const [state, setState] = useState<boolean>(false);

  console.log('state', state)
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a href="/" className="nav-link active">
                Home
              </a>
            </li>
          </ul>
          <button type="button" className="me-2 btn btn-light" onClick={() => {
            setState(!state);
            if (state) return i18n?.changeLanguage("fr");
            i18n?.changeLanguage("en");
          }}>{state ? 'fr' : 'en'}</button>
          <UserFilters />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
