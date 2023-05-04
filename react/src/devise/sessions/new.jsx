import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function SessionsNew() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = { blogger: { email: email, password: password } };

    axios.post('http://localhost:3000/login', data)
      .then((response) => {
        setIsLoggedIn(true);
        console.log(response);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('blogger', JSON.stringify(response.data.data));
        console.log('Hello', localStorage.getItem('blogger') );
        navigate("/articles");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1 className="text-center mt-4" id="logo1">
        Login into Alpha Blog
      </h1>
      <div className="container rounded bg-white mt-5 mb-5" >
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
            </div>
          </div>
          <div className="col-md-7 ">
            <div className="p-3 py-5">
              <form onSubmit={handleFormSubmit}>
                <div className="row mt-3">
                  <div className="col-md-12 mt-2 field">
                    <label className="labels">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="form-control shadow rounded"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="col-md-12 mt-2 field">
                    <label className="labels">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="form-control shadow rounded"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="mt-5 text-center actions">
                  <Button type="submit" variant="success" className="button-size mt-2">
                    Log In
                  </Button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionsNew;
