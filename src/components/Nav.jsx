import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const { methodSignout } = useData();
  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <p
          onClick={() => navigate("/")}
          className="navbar-item has-text-white has-text-weight-semibold is-size-5"
          style={{ cursor: "pointer" }}
        >
          <span className="is-large">Attendance Portal</span>
        </p>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        {/* <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item is-selected">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div> */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a onClick={methodSignout} className="button is-light">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
