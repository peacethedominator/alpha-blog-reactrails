import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';
import Article from '../articles/Article';

const article_url = 'http://localhost:3000/api/v1/articles';


function BloggerShow() {
    // const blogger = JSON.parse(window.localStorage.getItem('blogger'));
    // console.log(JSON.parse(window.localStorage.getItem('blogger')));
    
    const currentBlogger = useAuth();
    const currentUser = JSON.parse(currentBlogger.currentBlogger);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(article_url)
        .then(response => response.json())
        .then(response_items => {
            setItems(response_items);
        });
    }, []);

    return (
      <div>        
        <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center h-100" style={{marginLeft: "-250px"}}>
            <div className="col col-lg-9 col-xl-7">
                <div className="card" style={{ width: "1000px", backgroundColor: "black"}}>
                <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:"200px"}}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg/"
                        alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2 ml-2"
                        style={{width: "150px", height:"150px", zIndex: "1"}}/>
                        {/* <% if blogger_signed_in? && @user== current_blogger%> */}
                            <div className="ml-4" data-mdb-ripple-color="dark" style={{zIndex: "1"}}>
                                <Link to="/bloggers/edit"> <Button variant="dark" className='button-size mt-2'>Edit Profile</Button>{' '} </Link>
                            </div>
                        {/* <% end %> */}
                        <div className="container">
                            <div className="text-center mt-3">
                            <div className="ml-4" data-mdb-ripple-color="dark" style={{zIndex: "1", position: "absolute"}}>
                                {/* <% unless current_blogger == @user %> 
                                    <% if current_blogger.followings.include?(@user) %>
                                        <%= button_to "Unfollow", user_follows_destroy_path(@user, followed_id: @user.id), className: "btn btn-outline-danger", method: :delete, data:{confirm: "Are you sure you want to unfollow? "} %>
                                    <% else %>
                                        <%= button_to "+ Follow", user_follows_create_path(@user, followed_id: @user.id),className: "btn btn-outline-dark", method: :post %>
                                    <% end %>
                                <% end %> */}
                                {/* ================================================================================= */}
                                {/* { !currentUser ? 
                                  <Link to=""><Button variant="dark" className='button-size mt-2'>Follow</Button>{' '}</Link> 
                                :
                                  <Link to=""><Button variant="danger" className='button-size mt-2'>Unfollow</Button>{' '}</Link> 
                                } */}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="ms-3 ml-3" style={{marginTop: "130px"}}>
                    <h5>
                        {currentUser.email}
                    </h5>
                    <p><em>India</em></p>
                    </div>
                </div>
                <div className="p-4 text-black" style={{backgroundColor: "#d0e2b9"}}>
                    <div className="d-flex justify-content-end text-center py-1">
                    <div>
                        <p className="mb-1 h5">
                            {/* <%= @user.articles.count%> */} Articles Count
                            </p>
                        <p className="small text-muted mb-0">Articles</p>
                    </div>
                    <div className="px-3">
                        <p className="mb-1 h5">
                            {/* <%= @user.followers.count%> */}Followers count
                        </p>
                        <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                        <p className="mb-1 h5">
                            {/* <%= @user.followings.count%> */} Following count
                        </p>
                        <p className="small text-muted mb-0">Following</p>
                    </div>
                    </div>
                </div>
                <div className="card-body p-4 text-black">
                    <div className="mb-5">
                    <p className="lead fw-normal mb-1 text-white">About</p>
                    <div className="p-4" style={{backgroundColor: "yellowgreen"}}>
                        <p className="font-italic mb-1">Blogger</p>
                    </div>
                    </div>
                    <hr className="hr" style={{backgroundColor: "yellowgreen"}} />

                    <h3 className="text-center mt-4 text-white">Articles</h3>
                    <div>
                    <div className="flickr_pagination">
                        {/* <%= will_paginate @articles, :container => false %> */}
                    </div>
                    <div className="row g-2">
                    {/* <%= render 'articles/article' %> */} {items.map((item) => (<>
                    {currentUser.email ==item.blogger.email && <Article key={item.id} article={item} />}</>
                    ))}
                    </div>
                    <div className="flickr_pagination mb-4">
                        {/* <%= will_paginate @articles, :container => false %> */}
                    </div>
                    <hr className="hr hr-blurry" style={{backgroundColor: "yellowgreen", margin: "-10px 20px 20px 20px"}} />
                    </div>
                    <div className="row g-2">
                    <div className="col mb-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1" className="w-100 rounded-3"/>
                    </div>
                    <div className="col mb-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1" className="w-100 rounded-3"/>
                    </div>
                </div>
                </div>
                </div>
            



        </div>
            </div>
        </div>
        </section>
      </div>
    )
  }
  
  export default BloggerShow;