import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../articles/Article';

function CategoriesShow() {
  const [items, setItems] = useState();
  const params = useParams()
  const categoryArticle_url = `http://localhost:3000/api/v1/categories/${params.id}`;
  useEffect(() => {
    fetch(categoryArticle_url, {
      method: 'get',
      headers:{
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(response_items => {
        setItems(response_items);
      });
  }, []);

  return (
    <>
    {/* {console.log(items)} */}
      {items && (
        <div>

          <h1 className="text-center mt-4"id="logo1">
            Category: {items.categories.name}
          </h1>
          <h3 className="text-center mt-4" id="logo1">Articles</h3>
          <div className="flickr_pagination">
              {/* <%= will_paginate @articles, :container => false %> */}
          </div>
          {/* <%= render 'articles/article' %> */}
          Articles
          <div>
          {items.articles?.map((article) => (
            <Article key={article.id} article={article} />
          ))}
          </div>
          <div className="flickr_pagination mb-4">
              {/* <%= will_paginate @articles, :container => false %> */}
          </div>
      </div>
      )}
      </>
  )
}

export default CategoriesShow;