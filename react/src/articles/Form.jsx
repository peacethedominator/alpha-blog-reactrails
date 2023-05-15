import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const category_url = 'http://localhost:3000/api/v1/categories'
const article_url = 'http://localhost:3000/api/v1/articles'

function ArticleForm() {
  const params = useParams();
  const [blogger,setBlogger] = useState();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(response_items => {
        setCategories(response_items);
      });
  }, []);

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
      if (params.id) {
        fetch(`http://localhost:3000/api/v1/articles/${params.id}`, {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(data =>{
            // console.log('dat', data)
            setTitle(data.article.title)
            setDescription(data.article.description)
            setSelectedCategories(data.category.id) 
          })
          .catch(error => console.log('error', error))
      }
    }, [params.id]);
    
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategories(Array.from(e.target.selectedOptions, 
      (option) => option.value));
  };
 const config={
  headers :{
    Authorization: localStorage.token
  }
 }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
      category_ids: selectedCategories,
      id: blogger.id
    };

    // console.log('data', data)
    if(!params.id)
    {
      axios.post(article_url, data,config)
      .then(response => {
        console.log(response.data);
        navigate("/articles");
      })
      .catch(error => {
        console.log(error);
      });
    }
    else{
      axios.put(`http://localhost:3000/api/v1/articles/${params.id}`,data,config)
      .then(response => {
        console.log(response.data);
        navigate("/articles");})
      .catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 shadow p-3 mb-3 bg-dark rounded">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <span className="col-2 col-form-label text-light">Title</span>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control shadow rounded"
                    placeholder="Title of Article"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <span className="col-2 col-form-label text-light">Description</span>
                <div className="col-10">
                  <textarea
                    name="description"
                    rows="10"
                    className="form-control shadow rounded"
                    placeholder="Description of Article"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <span className="col-2 col-form-label text-light">Category</span>
                <div className="col-10">
                  <select
                    multiple={true}
                    size={3}
                    className="custom-select shadow rounded"
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                  >
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
                <button type="submit" className="btn btn-success mt-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <Link to="/articles" className="text-light row justify-content-center">
              [ Cancel &amp; Return to articles listing ]<span className="sr-only">(current)</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleForm;
