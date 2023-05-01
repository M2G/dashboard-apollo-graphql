function Sidebar(): JSX.Element {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
