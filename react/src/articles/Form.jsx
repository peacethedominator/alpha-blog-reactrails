import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const category_url = 'http://localhost:3000/api/v1/categories'

function ArticleForm() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(response_items => {
        setCategories(response_items);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 shadow p-3 mb-3 bg-dark rounded">
            <div className="form-group row">
              <span className="col-2 col-form-label text-light">Title</span>
              <div className="col-10">
                <input className="form-control shadow rounded" placeholder="Title of Article" />
              </div>
            </div>
            <div className="form-group row">
              <span className="col-2 col-form-label text-light">Description</span>
              <div className="col-10">
                <textarea name="description" rows="10" className="form-control shadow rounded" placeholder="Description of Article" />
              </div>
            </div>
            <div className="form-group row">
              <span className="col-2 col-form-label text-light">Category</span>
              <div className="col-10">
                <select multiple={true} size={3} className="custom-select shadow rounded" >
                  <option value="">Make your selection from list below (can be empty)</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <Button variant="success" className='button-size mt-2'>Submit</Button>{' '}
            </div>
          </div>
          <div className="mb-3">
            <Link to="/articles" className="text-light row justify-content-center" >[ Cancel &amp; Return to articles listing ]<span className="sr-only">(current)</span></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleForm;
