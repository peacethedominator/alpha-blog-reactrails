import Article from "./Article";

const articleCount = 1;

function ArticleIndex(){
    return(
        <>
        <div className="card" style={{margin: "20px 275px", backgroundColor: "black"}}>
        <h1 className="text-center mt-4" id="logo1">Listing all articles</h1>
        <div className="flickr_pagination">
        {!articleCount &&
            <h3 className="text-light">No articles Found.</h3>}
        </div>
        <hr className="hr hr-blurry" style={{backgroundColor: "yellowgreen", marginLeft:"20px", marginRight:"20px"}} />
        <Article />
        <Article />
        <Article />
        <hr className="hr hr-blurry" style={{backgroundColor: "yellowgreen", margin: "-10px 20px 20px 20px"}} />
        <div className="flickr_pagination mb-4">
        </div>
        </div>
        </>
    
    );
}
export default ArticleIndex;