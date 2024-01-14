import ROUTER_PATH from 'constants/RouterPath';

function Sidebar(): JSX.Element {
  return (
    <nav className="d-md-block sidebar collapse">
      <div className="position-sticky sidebar-sticky">
        <h3 className="mb-5">Ici Logo</h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <a className="nav-link active" aria-current="page" href={ROUTER_PATH.HOME}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <svg id="icon-user" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
              <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z" />
            </svg>
            <a className="nav-link active" aria-current="page" href={ROUTER_PATH.PROFIL}>
              Profil
            </a>
          </li>
          <li className="nav-item">
            <svg id="icon-users" viewBox="0 0 36 32" stroke="currentColor" strokeWidth="2">
              <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z" />
              <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z" />
            </svg>
            <a className="nav-link active" aria-current="page" href={ROUTER_PATH.USERS}>
              Users
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
