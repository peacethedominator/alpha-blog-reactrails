import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../AuthContext";

function Navigation() {
  
  const currentBlogger = useAuth();
  const currentUser = currentBlogger.currentBlogger && JSON.parse(currentBlogger.currentBlogger);
  const current = currentUser;
  console.log(currentUser);

  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const blogger = localStorage.getItem('blogger');
    if(token && blogger){
      setIsLoggedIn(true);
    }
  })

  const logOutBlogger = (e) =>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('blogger');
    console.log(localStorage.getItem('blogger'));
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <>
    {current && (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link to="/" className="navbar-brand" id="logo">
          ALPHA BLOG
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item active">
                  <Link to="/bloggers" className="nav-link">
                    Bloggers<span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Articles
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/articles/new" className="dropdown-item">
                      Create new article
                    </Link>
                    <Link to="/articles" className="dropdown-item">
                      View articles
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/categories" className="dropdown-item">
                      View categories
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Profile
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to=  {`/bloggers/${current.id}`} className="dropdown-item">
                      View your profile
                    </Link>
                    <Link to="/bloggers/edit" className="dropdown-item">
                      Edit your profile
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Delete your profile
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={logOutBlogger}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/bloggers/signin" className="nav-link">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bloggers/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    )}
      </>
      );
}
export default Navigation;
