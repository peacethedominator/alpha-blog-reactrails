import { useState, useEffect } from 'react';
import BloggerCard from './BloggerCard';

const blogger_url = 'http://localhost:3000/api/v1/bloggers'

const BloggerIndex = () => {
  const [currentBlogger, setCurrentBlogger]= useState(); 
  const [items, setItems] = useState([]);
  useEffect(() => {
    getBloggers();
  }, [currentBlogger]);

  const getBloggers = () => {
    fetch(blogger_url)
    .then(response => response.json())
    .then(response_items => {
      setItems(response_items);
    });
  }
  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/currentblogger", {
      method: 'GET',
      headers:{
        'Authorization': localStorage.getItem("token")
      }})
      .then(response => response.json())
      .then(result => setCurrentBlogger(result))
      .catch(error => console.log('error', error))
    }, [])

  return (
    <div>
      <div className="card" style={{margin: "20px 180px", backgroundColor: "black"}}>
        <h1 className="text-center mt-4" id="logo1">ALpha Bloggers</h1>

        <div className="flickr_pagination">
            {/* <%= will_paginate @users, :container => false %> */}
        </div>
        <hr className="hr hr-blurry" style={{backgroundColor: "yellowgreen", marginLeft:"20px", marginRight:"20px"}} />
        <div>
          {items.map((item) => (
            <BloggerCard key={item.id} blogger={item} currentBlogger={currentBlogger} setCurrentBlogger={setCurrentBlogger} />
          ))}
        </div>
        <hr className="hr hr-blurry" style={{ backgroundColor: "yellowgreen", margin: "-10px 20px 20px 20px"}} />
        <div className="flickr_pagination mb-4">
            {/* <%= will_paginate @articles, :container => false %> */}
        </div>
      </div>
    </div>
  );
}

export default BloggerIndex;
