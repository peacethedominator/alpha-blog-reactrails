import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../articles/Article';

function CategoriesShow() {
  const [items, setItems] = useState();
  const params = useParams();
  useEffect(() => {
    const categoryArticle_url = `http://localhost:3000/api/v1/categories/${params.id}`;
    fetch(categoryArticle_url, {
      method: 'get'
    })
      .then(response => response.json())
      .then(response_items => {
        setItems(response_items);
      });
  }, [params.id]);

  return (
    <>
      {items && (
        <div>

          <h1 className="text-center mt-4"id="logo1">
            Category: {items.categories.name}
          </h1>
          <h3 className="text-center mt-4" id="logo1">Articles</h3>
          <div className="flickr_pagination">
              {/* <%= will_paginate @articles, :container => false %> */}
          </div>
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