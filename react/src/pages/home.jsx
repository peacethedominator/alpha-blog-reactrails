import Button from 'react-bootstrap/Button';
import '../main.css';

function Home(){
    return(
        <>
          <div className="container" id="home-container">
            <div className="jumbotron text-center text-white">
                <h1 className="display-4 font-weight-bold" id="logo1">ALPHA BLOG</h1>
                <p className="lead" >This is a simple application, that allows the users to create some blog related to different categories and experiences.</p>
                <hr className="my-4"/>
                <p className="font-weight-normal " >“Where the Internet is about availability of information, blogging is about making information creation available to anyone.”</p>
                <Button variant="success" className='button-size mt-2'>Sign Up!</Button>{' '}
                {/* <%= link_to "Sign Up!", new_blogger_registration_path, class:"btn btn-success btn-lg" %> */}
            </div>
          </div>
        </>
    
    );
}
export default Home;

