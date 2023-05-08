import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';



function Article(article){
    // console.log(article.categories.name);
    // console.log(article.article.blogger.email);
    return(
        <>
            <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-8 mt-4">
                <div
                    className="card text-center shadow mb-5 rounded" style={{ backgroundImage: "linear-gradient(to bottom, #99ccff 0%, #ffffff 74%)" }} >
                    <div className="card-header font-italic">
                        <Link to='/bloggers' className='font-weight-bold'>{article.article.blogger.email || article.blogger.email }</Link>
                        <div className="mt-2">
                            {article.article.categories.map(category => (
                                <span key={category.id} className="badge badge-pill badge-success mr-2">{category.name}</span>
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
                       <Link to=""><Button variant="success" className='button-size mt-2'>View</Button>{' '}</Link> 
                       <Link to=""><Button variant="info" className='button-size mt-2'>Edit</Button>{' '}</Link> 
                       <Link to=""><Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}</Link> 

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
