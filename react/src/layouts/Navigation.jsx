import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
function Navigation() {
  
  // const [blogger,setBlogger] = useState();
  const { isLoggedIn, setIsLoggedIn, currentBlogger, setCurrentBlogger } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   if(token && blogger){
  //     setIsLoggedIn(true);

  //   }
  // })

  useEffect(()=>{
    if(localStorage.getItem('token')) {
      fetch("http://localhost:3000/api/v1/currentblogger", {
        method: 'GET',
        headers:{
          'Authorization': localStorage.getItem("token")
        }})
        .then(response => response.json())
        .then(result => {
          console.log('res', result)
          setCurrentBlogger(result);
          setIsLoggedIn(true);
        })
        .catch(error => console.log('error', error))
    }
    },[setCurrentBlogger, setIsLoggedIn, isLoggedIn])
    console.log('curr', currentBlogger)
    
  
  const logOutBlogger = (e) =>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('blogger');
    console.log(localStorage.getItem('blogger'));
    setIsLoggedIn(false);
    navigate("/");
  }
  const deleteItem=()=> {
    if (window.confirm("Are you sure you want to delete your profile? (This action can not be undone)")) {
      fetch(`http://localhost:3000/api/v1/bloggers/${currentBlogger.id}`, {
        method: 'DELETE',
        headers:{
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(response => {
        localStorage.removeItem('blogger')
        localStorage.removeItem('token')
        
        console.log(response)
        if (response.ok) {

          setIsLoggedIn(false);
          navigate("/");
        } else {
          navigate(`/bloggers/${currentBlogger?.id}`);
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <>
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
                    <Link to=  {`/bloggers/${currentBlogger?.id}`} className="dropdown-item">
                      View your profile
                    </Link>
                    <Link to="/bloggers/edit" className="dropdown-item">
                      Edit your profile
                    </Link>
                    <Link to="#" className="dropdown-item text-danger" onClick={deleteItem}>
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
      </>
      );
}
export default Navigation;
