import type { JSX } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar(): JSX.Element {
  const { i18n } = useTranslation();
  const [state, setState] = useState<boolean>(false);
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <button
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarCollapse"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav me-auto mb-2 mb-md-0" />
          <button
            onClick={async () => {
              setState(!state);
              if (state) return i18n?.changeLanguage('fr');
              i18n?.changeLanguage('en');
            }}
            className="me-2 btn btn-light"
            type="button"
          >
            {state ? 'fr' : 'en'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
