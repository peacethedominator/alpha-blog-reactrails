import Button from 'react-bootstrap/Button';
import moment from 'moment';


function Article(article){
    return(
        <>
            <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-8 mt-4">
                <div
                    className="card text-center shadow mb-5 rounded" style={{ backgroundImage: "linear-gradient(to bottom, #99ccff 0%, #ffffff 74%)" }} >
                    <div className="card-header% font-italic">
                        {article.blogger.email}
                    <div className="mt-2">
                        {article.categories}
                    </div>
                    </div>
                    <div className="card-body">
                    <h5 className="card-title text-success">
                         {article.title}
                    </h5>
                    <p className="card-text">
                        {/* &lt;%= truncate(article.description, length:100) %&gt; */} {article.description}
                    </p>
                        <Button variant="success" className='button-size mt-2'>View</Button>{' '}
                        <Button variant="info" className='button-size mt-2'>Edit</Button>{' '}
                        <Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}

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
