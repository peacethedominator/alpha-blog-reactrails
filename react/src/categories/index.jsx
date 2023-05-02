import '../main.css';
import Category from './Category';
import { useState, useEffect } from 'react';

const category_url = 'http://localhost:3000/api/v1/categories';

function CategoriesIndex() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(category_url)
      .then(response => response.json())
      .then(response_items => {
        setItems(response_items);
      });
  }, []);

  return (
    <div>
      <div className="card" style={{ margin: "20px 400px", backgroundColor: "black" }}>
        <h1 className="text-center mt-4" id="logo1"> Categories </h1>
        <div className="flickr_pagination">
          {/* &lt;%= will_paginate @categories, :container =&gt; false %&gt; */}
        </div>
        <hr className="hr hr-blurry" style={{ backgroundColor: "yellowgreen", marginLeft: "20", marginRight: "20" }} />
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-6 mt-4">
              {items.map((item) => (
                <Category key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
        <hr
          className="hr hr-blurry"
          style={{ backgroundColor: "yellowgreen", margin: "-10px 20px 20px 20px" }}
        />
        <div className="flickr_pagination mb-4">
          {/* &lt;%= will_paginate @categories, :container =&gt; false %&gt; */}
        </div>
      </div>
    </div>
  );
}

export default CategoriesIndex;
