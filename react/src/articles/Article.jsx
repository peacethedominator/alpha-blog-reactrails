import Button from 'react-bootstrap/Button';

function Article(){
    return(
        <>
            <div className="container">
            {/* &lt;% @articles.each do |article| %&gt; */}
            <div className="row justify-content-md-center">
                <div className="col-8 mt-4">
                <div
                    className="card text-center shadow mb-5 rounded" style={{ backgroundImage: "linear-gradient(to bottom, #99ccff 0%, #ffffff 74%)" }} >
                    <div className="card-header% font-italic">
                    {/* &lt;% if article.blogger %&gt; by &lt;%= link_to
                    article.blogger.email, user_path(article.blogger) %&gt; &lt;% end
                    %&gt; &lt;% if article.categories.any? %&gt; */}Blogger Email
                    <div className="mt-2">
                        {/* &lt;%= render article.categories %&gt; */} Article Category
                    </div>
                    {/* &lt;% end %&gt; */}
                    </div>
                    <div className="card-body">
                    <h5 className="card-title text-success">
                        {/* &lt;%= link_to article.title, article_path(article),
                        class:"text-success"%&gt; */} Article title
                    </h5>
                    <p className="card-text">
                        {/* &lt;%= truncate(article.description, length:100) %&gt; */} Article description
                    </p>
                    {/* &lt;%= link_to "View", article_path(article), class: "btn
                    btn-outline-success" %&gt; &lt;% if blogger_signed_in? &amp;&amp;
                    (article.blogger == current_blogger) %&gt; &lt;%= link_to "Edit",
                    edit_article_path(article), class: "btn btn-outline-info" %&gt; &lt;%=
                    link_to "Delete", article_path(article), class: "btn
                    btn-outline-danger", method: :delete, data: {"{"}confirm: "Are you
                    sure?"{"}"} %&gt; &lt;% end %&gt; */}
                        <Button variant="success" className='button-size mt-2'>View</Button>{' '}
                        <Button variant="info" className='button-size mt-2'>Edit</Button>{' '}
                        <Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}

                    </div>
                    <div className="card-footer text-muted">
                    <small>
                        {/* Created &lt;%= time_ago_in_words(article.created_at) %&gt; ago,
                        edited &lt;%=time_ago_in_words(article.updated_at) %&gt; ago */} Created ago, Edited ago
                    </small>
                    </div>
                </div>
                </div>
            </div>
            {/* &lt;% end %&gt; */}
            </div>

        </>
    
    );
}
export default Article;
