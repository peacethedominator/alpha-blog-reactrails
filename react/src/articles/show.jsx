import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

function ArticleShow(){
    const [blogger,setBlogger] = useState();
    const params = useParams();
    const [items, setItems] = useState();
    const article_url = `http://localhost:3000/api/v1/articles/${params.id}`;

    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/currentblogger", {
          method: 'GET',
          headers:{
            'Authorization': localStorage.getItem("token")
          }})
          .then(response => response.json())
          .then(result => setBlogger(result))
          .catch(error => console.log('error', error))
        },[blogger])

    useEffect(() => {
        fetch(article_url, {
          method: 'get',
          headers:{
          'Authorization': localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(response_items => {
            setItems(response_items);
          });
      }, []);
      
      const deleteArticle=()=> {
        if (window.confirm("Are you sure you want to delete this article?")) {
          fetch(`http://localhost:3000/api/v1/articles/${params.id}`, {
            method: 'DELETE',
            headers:{
              'Authorization': localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
    return(
        <>
        {items && 
         <>
            <h2 className="text-center mt-4" id="logo1">
                Title: {items.article.title}
            </h2>
            <div className="container" id="home-container">
                <div className="row justify-content-md-center">
                <div className="col-8 mt-4">
                    <div className="card text-center shadow mb-5  rounded" style={{ backgroundImage:
                        "linear-gradient(to right, #ffff99 0%, #99ff99 74%)" }} >
                    <div className="card-header font-italic">
                        <Link to="/bloggers" className='font-weight-bold'>{items.blogger.email}</Link>
                        <div className="mt-2">
                            {items.category.map(category => (
                                <Link to={`/categories/${category.id}`} key={category.id} className="badge badge-pill badge-success mr-2 text-decoration-none">{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text text-left">
                        {items.article.description}
                        </div>
                        { blogger && blogger?.email == items.blogger.email ? <>
                        <Link to={`/articles/${params.id}/edit`}><Button variant="info" className='button-size mt-2'>Edit</Button>{' '}</Link>
                        <Link to="" onClick={deleteArticle}><Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}</Link>
                        </> :
                        <></>}
                        
                    </div>
                    <div className="card-footer text-muted">
                        <small>
                        Created {moment(items.article.created_at).fromNow() }, Edited {moment(items.article.updated_at).fromNow() }
                        </small>
                    </div>
                    </div>
                </div>
                </div>
            </div>
         </>
        }
        </>

    
    );
}
export default ArticleShow;