import Button from 'react-bootstrap/Button';
function ArticleShow(){
    return(
        <>
        <h2 className="text-center mt-4" id="logo1">
            {/* &lt;%= @article.title %&gt; */}Article Title
        </h2>
        <div className="container" id="home-container">
            <div className="row justify-content-md-center">
            <div className="col-8 mt-4">
                <div className="card text-center shadow mb-5  rounded" style={{ backgroundImage:
                    "linear-gradient(to right, #ffff99 0%, #99ff99 74%)" }} >
                <div className="card-header font-italic">
                    {/* by &lt;%= @article.blogger.email if @article.blogger %&gt; &lt;%=
                    link_to gravatar_for(@article.blogger),
                    user_path(@article.blogger_id) %&gt; &lt;% if
                    @article.categories.any? %&gt; */} Blogger Email
                    <div className="mt-2">
                        {/* &lt;%= render @article.categories %&gt; */} Article Category
                    </div>
                    {/* &lt;% end %&gt; */}
                </div>
                <div className="card-body">
                    <div className="card-text text-left">
                    {/* &lt;%= simple_format(@article.description) %&gt; */} Article Description
                    </div>
                    {/* &lt;% if blogger_signed_in? &amp;&amp; ( @article.blogger ==
                    current_blogger ) %&gt; &lt;%= link_to "Edit",
                    edit_article_path(@article), class: "btn btn-outline-info" %&gt;
                    &lt;%= link_to "Delete", article_path(@article), class: "btn
                    btn-outline-danger", method: :delete, data: {"{"}confirm: "Are you
                    sure?"{"}"} %&gt; &lt;% end %&gt; */}
                    <Button variant="info" className='button-size mt-2'>Edit</Button>{' '}
                    <Button variant="danger" className='button-size mt-2'>Delete</Button>{' '}

                </div>
                <div className="card-footer text-muted">
                    <small>
                    {/* Created &lt;%= time_ago_in_words(@article.created_at) %&gt; ago,
                    edited &lt;%=time_ago_in_words(@article.updated_at) %&gt; ago */} Created Ago, Editied Ago
                    </small>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>

    
    );
}
export default ArticleShow;