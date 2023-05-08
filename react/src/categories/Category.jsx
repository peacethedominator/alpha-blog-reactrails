import moment from 'moment';
import {Link} from "react-router-dom";
import pluralize from 'pluralize';

function Category(category) {
  return (
    <div>
        <div className="card text-center shadow mb-5 rounded">
            <div className="card-body">
                <h5 className="card-title ">
                  <Link to={`/categories/${category.id}`} className="text-success">{category.name}</Link>
                </h5>
                <p className="card-text">
                {category.articlesCount} {pluralize('article', category.articlesCount)}
                </p>
            </div>
            <div className="card-footer text-muted">
                <small>
                Created {moment(category.created_at).fromNow() }, Edited {moment(category.updated_at).fromNow() }
                </small>
            </div>
        </div>

    </div>
  )
}

export default Category;