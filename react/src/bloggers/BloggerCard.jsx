import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';


function BloggerCard(blogger) {
  const currentBlogger = useAuth();
  const currentUser = JSON.parse(currentBlogger.currentBlogger);
  return (
    <section className="vh-8">
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
                            {/* <%= link_to "View profile", users_path, className: "btn btn-outline-success ml-2" %>
                            <% unless current_blogger == user %>
                                <% if current_blogger.followings.include?(user) %>
                                    <%= button_to "Unfollow", user_follows_destroy_path(user, followed_id: user.id), className: "btn btn-outline-danger ml-2", method: :delete, data:{confirm: "Are you sure you want to unfollow? "} %>
                                <% else %>
                                    <%= button_to "+ Follow", user_follows_create_path(user, followed_id: user.id),className: "btn btn-outline-info ml-2", method: :post %>
                                <% end %>
                            <% end %>
                            <% if blogger_signed_in? %>
                                <% if user == current_blogger %>
                                    <%= link_to "Edit profile", edit_user_path(user), className: "btn btn-outline-info ml-2" %>
                                        <%= link_to "Delete user", user_path(user), className: "btn btn-outline-danger ml-2", method: :delete, data:{confirm: "Are you sure you want to delete the user account and related data?" } %>
                                <% end %>
                            <% end %>                   */}
                            <Link to=  {`/bloggers/${currentUser.id}`}><Button variant="success" className='button-size mt-2 ml-2 '>View</Button>{' '}</Link>
                            {currentUser.email == blogger.email ?
                            <>
                                <Link to=""><Button variant="info" className='button-size mt-2 ml-2'>Edit</Button>{' '}</Link>
                                <Link to=""><Button variant="danger" className='button-size mt-2 ml-2'>Delete</Button>{' '}</Link>
                            </>
                            : <>
                                <Link to=""><Button variant="info" className='button-size mt-2 ml-2'>Follow +</Button>{' '}</Link>
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
        </section>
  )
}

export default BloggerCard;