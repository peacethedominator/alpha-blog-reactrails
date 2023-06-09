import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { AuthContext, useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';


function BloggerCard({blogger,currentBlogger,setCurrentBlogger}) {
  // const currentBlogger = useAuth();
  // const currentUser = JSON.parse(currentBlogger.currentBlogger);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('curr', currentBlogger)
    if(currentBlogger)
      setIsFollowing(
        currentBlogger.followings.some(b => b.id === blogger.id)
      )
  }, [currentBlogger])


  const unfollowBlogger = () => {
    fetch(`http://localhost:3000/api/v1/bloggers/${blogger.id}/follows/destroy`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log('re', response)
      setCurrentBlogger({
        ...currentBlogger,
        followings: response.followed_array
      })
    })
    .catch(error => console.log(error));
  };
  const followBlogger = () => {
    fetch(`http://localhost:3000/api/v1/bloggers/${blogger.id}/follows/create`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(response => {
      // console.log('re', response)
      setCurrentBlogger({
        ...currentBlogger,
        followings: response.followed_array
      })
    })
    .catch(error => console.log(error));
  };

  const deleteItem=()=> {
    if (window.confirm("Are you sure you want to delete your profile? (This action can not be undone)")) {
      fetch(`http://localhost:3000/api/v1/bloggers/${blogger.id}`, {
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
          navigate(`/bloggers/${blogger?.id}`);
          console.log(response);
        }
      })
      .catch(error => { console.log(error); });
    }
  }
  return (
    <section className="vh-8">
      {blogger && currentBlogger && (
            <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center h-100" style={{marginLeft:"-100px"}}>
                <div className="col col-md-9 col-lg-7 col-xl-5">
                <div className="card" style={{borderRadius: "15px", width: "max-content"}}>
                    <div className="card-body p-4" style={{width: "max-content"}}>
                    <div className="d-flex text-black">
                        <div className="flex-shrink-0 ">
                        <div className= "mt-2">
                        <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt="User avatar" className="img-fluid"
                            style={{width: "150px", borderRadius: "10px"}} />
                        </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                        <h5 className="mb-1 ml-3">
                            {blogger.email}
                        </h5>
                        <small className="mb-2 pb-1 ml-2" style={{color: "#2b2a2a"}}>
                            Joined {moment(blogger.created_at).fromNow() }
                        </small>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2 ml-2"
                            style={{backgroundColor: "#efefef"}}>
                            <div>
                            <p className="small text-muted mb-1">Articles</p>
                            <p className="mb-0 ml-2">
                                {blogger.articlesCount} 
                            </p>
                            </div>
                            <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0 ml-3">
                                {blogger.followersCount} 
                            </p>
                            </div>
                            <div>
                            <p className="small text-muted mb-1">Following</p>
                            <p className="mb-0 ml-3">
                                {blogger.followingsCount}  
                            </p>
                            </div>
                        </div>
                        <div className="d-flex pt-1">
                            <Link to=  {`/bloggers/${blogger.id}`}><Button variant="success" className='button-size mt-2 ml-2 '>View</Button>{' '}</Link>
                            {currentBlogger.email == blogger.email ?
                            <>
                                <Link to="/bloggers/edit"><Button variant="info" className='button-size mt-2 ml-2'>Edit</Button>{' '}</Link>
                                <Link to="" onClick={deleteItem}><Button variant="danger" className='button-size mt-2 ml-2'>Delete</Button>{' '}</Link>
                            </>
                            : <>
                                {isFollowing ? (
                                <Link to="" onClick={unfollowBlogger}><Button variant="danger" className='button-size mt-2 ml-2'>Unfollow</Button>{' '}</Link>
                                ) : (
                                <Link to="" onClick={followBlogger}><Button variant="info" className='button-size mt-2 ml-2'>Follow +</Button>{' '}</Link>
                                )}
                            </>
                            }

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            )}
        </section>
  )
}

export default BloggerCard;