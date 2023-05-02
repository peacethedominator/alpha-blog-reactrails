import { useState, useEffect } from 'react';
const categoryArticle_url = 'http://localhost:3000/api/v1/category/articles';
import Article from '../articles/Article';

function CategoriesShow() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(categoryArticle_url)
      .then(response => response.json())
      .then(response_items => {
        setItems(response_items);
      });
  }, []);

  return (
    <div>
      {items.map((item) => (
                <Article key={item.id} {...item} />
      ))}
        <h1 className="text-center mt-4"id="logo1">
            {/* Category: <%= @category.name %> */} Category Name
        </h1>
        <h3 className="text-center mt-4" id="logo1">Articles</h3>
        <div className="flickr_pagination">
            {/* <%= will_paginate @articles, :container => false %> */}
        </div>
        {/* <%= render 'articles/article' %> */}
        Articles

        <div className="flickr_pagination mb-4">
            {/* <%= will_paginate @articles, :container => false %> */}
        </div>
    </div>
  )
}

export default CategoriesShow;