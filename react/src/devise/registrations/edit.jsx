import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationsEdit() {
  const navigate = useNavigate();
  const [blogger,setBlogger] = useState({ 
    email: '', 
    password: '',
    password_confirmation: '', 
    current_password: '' });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/currentblogger", {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(result => setBlogger(result))
    .catch(error => console.log('error', error))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/v1/bloggers/${blogger.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(blogger)
    })
    .then(response => response.json())
    .then(result => {console.log(result);
    navigate(`/bloggers/${blogger?.id}`);})
    .catch(error => console.log('error', error))
  }
  
  return (
        <>
        {blogger && <>
        <h1 className="text-center mt-4" id="logo1">
            Edit your profile
        </h1>
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
            <div className="col-md-5 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="text-black-50">
                    {blogger?.email}
                </span>
                <span> </span>
                </div>
            </div>
            {/* &lt;%= render 'shared/errors', obj: @blogger %&gt; */}
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
                        className="form-control shadow rounded"
                        placeholder="Enter a username"
                        value={blogger.email}
                        onChange={(event) => setBlogger({ ...blogger, email: event.target.value })}
                        />
                    </div>
                    <div className="col-md-12 mt-2 field">
                        <label className="labels">Password</label>
                        <i>(leave blank if you do not want to change it)</i>
                        <em>(6 characters minimum)</em>
                        <input
                        className="form-control shadow rounded"
                        placeholder="Enter new password"
                        type="password"
                        value={blogger.password}
                        onChange={(event) => setBlogger({ ...blogger, password: event.target.value })}
                        />
                    </div>
                    <div className="col-md-12 mt-2 field">
                        <label className="labels" >Password Confirmation</label>
                        <input
                        className="form-control shadow rounded"
                        placeholder="Enter new password"
                        type="password"
                        value={blogger.password_confirmation}
                        onChange={(event) => setBlogger({ ...blogger, password_confirmation: event.target.value })}
                        />
                    </div>

                    <div className="col-md-12 mt-2 field">
                        <label className="labels">Current Password</label>
                        <input 
                        className= "form-control shadow rounded" 
                        placeholder="Enter current password" 
                        type='password' 
                        value={blogger.current_password || ''} 
                        onChange={(event) => setBlogger({ ...blogger, current_password: event.target.value })} 
                        />
                    </div>
                    </div>
                    <div className="mt-5 text-center actions">
                    <Button variant="success" className='button-size mt-2' onClick={handleSubmit}>Update account</Button>{' '}
                    </div>
                </form>
                
                </div>
            </div>
            </div>
        </div>
        </>}
        </>

  )
}

export default RegistrationsEdit;