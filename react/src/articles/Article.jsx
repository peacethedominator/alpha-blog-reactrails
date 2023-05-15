import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';



function Article(article){
    const currentBlogger = useAuth();
    const currentUser = JSON.parse(currentBlogger.currentBlogger);
    const deleteArticle=()=> {
        console.log(article)
        if (window.confirm("Are you sure you want to delete this article?") && article) {
          fetch(`http://localhost:3000/api/v1/articles/${article.article.id}`, {
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
            <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-8 mt-4">
                <div
                    className="card text-center shadow mb-5 rounded" style={{ backgroundImage: "linear-gradient(to bottom, #99ccff 0%, #ffffff 74%)" }} >
                    <div className="card-header font-italic">
                        <Link to={`/bloggers/${article.article.blogger.id}`} className='font-weight-bold'>{article.article.blogger.email || article.blogger.email }</Link>
                        <div className="mt-2">
                            {article.article.categories.map(category => (
                             <Link to={`/categories/${category.id}`} key={category.id} className="badge badge-pill badge-success mr-2 text-decoration-none">{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="card-body">
                    <h5 className="card-title text-success">
                         {article.article.title || article.title}
                    </h5>
                    <p className="card-text">
                        {article.article.description ||article.description}
                    </p>
                    <Link to={`/articles/${article.article.id}`}><Button variant="success" className='button-size mt-2'>View</Button>{' '}</Link> 
                    {currentUser.email == article.article.blogger.email ?
                    <>
                       <Link to={`/articles/${article.article.id}/edit`}> <Button variant="info" className='button-size mt-2'>Edit</Button>{' '}</Link> 
                       <Link to="" onClick={deleteArticle}><Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}</Link> 
                    </> 
                    :<></>}
                    </div>
                    <div className="card-footer text-muted">
                    <small>
                        Created {moment(article.created_at).fromNow() }, Edited {moment(article.updated_at).fromNow() }
                    </small>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </>
    
    );
}
export default Article;
