import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function RegistrationsForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        blogger: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setIsLoggedIn(true);       
      console.log("response: ",response); 
      localStorage.setItem('token', response.headers.getAuthorization());
      localStorage.setItem('blogger', JSON.stringify(response.data.data));
      console.log(localStorage.getItem('token'));
      console.log('Hello',localStorage.getItem('blogger'));
      navigate("/articles");
    } 
    catch (error) {
      toast.warn('Invalid User credentials',{
        position: "top-center",        autoClose: 5000,
        hideProgressBar: false,        closeOnClick: true,
        pauseOnHover: true,        draggable: true,
        progress: undefined,        theme: "colored",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="text-black-50">Blogger.email</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-7 ">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-md-12 field">
                    <label className="labels">Email</label>
                    <input
                      placeholder="Enter a username"
                      className="form-control shadow rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mt-2 field">
                    <label className="labels">Password </label>
                    <input
                      className="form-control shadow rounded"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mt-2 field">
                    <label className="labels">Password Confirmation</label>
                    <input
                      className="form-control shadow rounded"
                      placeholder="Re-enter your password"
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-5 text-center actions">
                  <Button variant="success" className="button-size mt-2" type="submit">
                    Sign Up
                  </Button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationsForm;
