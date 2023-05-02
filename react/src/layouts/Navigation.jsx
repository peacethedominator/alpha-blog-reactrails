import {Link} from "react-router-dom";

const bloggerSignedIn = true;
function Navigation(){

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <Link to="/" className="navbar-brand" id="logo">ALPHA BLOG</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                {bloggerSignedIn &&     <li className="nav-item active">
                    <Link to="/bloggers" className="nav-link" >Bloggers<span className="sr-only">(current)</span></Link>
                </li>}
                {bloggerSignedIn &&  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Articles
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/articles/new" className="dropdown-item" >Create new article</Link>
                    <Link to="/articles" className="dropdown-item" >View articles</Link>
                    </div>
                </li>}
                {bloggerSignedIn && <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/categories" className="dropdown-item" >View categories</Link>
                    </div>
                </li>}
                {bloggerSignedIn && <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Profile
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/bloggers/show" className="dropdown-item" >View your profile</Link>
                    <Link to="/bloggers/edit" className="dropdown-item" >Edit your profile</Link>
                    <Link to="#" className="dropdown-item" >Delete your profile</Link>
                    </div>
                </li>}
                {bloggerSignedIn && <li className="nav-item">
                    <Link to="#" className="nav-link" >Log Out</Link>
                </li>}
                {!bloggerSignedIn &&
                <li className="nav-item">
                    <Link to="/bloggers/signin" className="nav-link" >Log In</Link>
                </li>}
                {!bloggerSignedIn && <li className="nav-item">
                    <Link to="/bloggers/signup" className="nav-link" >Sign Up</Link>
                </li>}
                </ul>
            </div>
            </nav>
        </>
    
    );
}
export default Navigation;