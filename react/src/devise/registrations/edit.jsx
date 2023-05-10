import Button from 'react-bootstrap/Button';

function RegistrationsEdit() {
  return (

        <>
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
                    {/* &lt;%= @blogger.email%&gt; */} Blogger.email
                </span>
                <span> </span>
                </div>
            </div>
            {/* &lt;%= render 'shared/errors', obj: @blogger %&gt; */}
            <div className="col-md-7 ">
                <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* &lt;% if blogger_signed_in? %&gt; */}
                    <h4 className="text-right">Profile Settings</h4>
                    {/* &lt;% end %&gt; */}
                </div>
                {/* &lt;%= form_for(resource, as: resource_name, url:
                registration_path(resource_name), html: {"{"} method: :put {"}"}) do
                |f| %&gt; */}
                <div className="row mt-3">
                    <div className="col-md-12 field">
                    <label className="labels">Email</label>
                    {/* &lt;%= f.email_field :email, autofocus: true, autocomplete:
                    "email",class: "form-control shadow rounded", placeholder: "Enter
                    a username" %&gt; */}
                    <input className= "form-control shadow rounded" placeholder= "Enter a username"/>
                    </div>
                    {/* &lt;% if devise_mapping.confirmable? &amp;&amp;
                    resource.pending_reconfirmation? %&gt; */}
                    <div>
                    {/* Currently waiting confirmation for: &lt;%=
                    resource.unconfirmed_email %&gt; */}
                    </div>
                    {/* &lt;% end %&gt; */}
                    <div className="col-md-12 mt-2 field">
                    <label className="labels">Password</label>
                    <i>(leave blank if you do not want to change it)</i>
                    {/* &lt;% if @minimum_password_length %&gt; */}
                    <em>
                        {/* (&lt;%= @minimum_password_length %&gt; characters minimum) */} (xyz characters minimum)
                    </em>
                    {/* &lt;% end %&gt; &lt;%= f.password_field :password, autocomplete:
                    "new-password", class: "form-control shadow rounded", placeholder:
                    "Enter new password" %&gt; */}
                    <input className= "form-control shadow rounded" placeholder= "Enter new password" type='password' />
                    </div>
                    <div className="col-md-12 mt-2 field">
                    <label className="labels" >Password Confirmation</label>
                    {/* &lt;%= f.password_field :password_confirmation, class:
                    "form-control shadow rounded", placeholder: "Re-enter your
                    password", autocomplete: "new-password" %&gt; */}
                    <input className= "form-control shadow rounded" placeholder= "Re-enter new password" type='password'/>

                    </div>
                    <div className="col-md-12 mt-2 field">
                    <label className="labels">Current Password</label>
                    {/* &lt;%= f.password_field :current_password, class: "form-control
                    shadow rounded", placeholder: "Re-enter your password",
                    autocomplete: "current-password" %&gt; */}
                    <input className= "form-control shadow rounded" placeholder= "Enter current password" type='password'/>

                    </div>
                </div>
                <div className="mt-5 text-center actions">
                    {/* &lt;%= f.submit "Update account", class:"btn btn-success" %&gt; */}
                    <Button variant="success" className='button-size mt-2'>Update account</Button>{' '}

                </div>
                {/* &lt;% end %&gt; */}
                <div>
                    {/* Unhappy? &lt;%= link_to "Cancel my account",
                    registration_path(resource_name), data: {"{"} confirm: "Are you
                    sure?", turbo_confirm: "Are you sure?" {"}"}, method: :delete %&gt; */}
                </div>
                {/* &lt;%= link_to "Back", :back %&gt; */}
                </div>
            </div>
            </div>
        </div>
        </>

  )
}

export default RegistrationsEdit;