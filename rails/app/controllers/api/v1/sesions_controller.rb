class SessionsController < Devise::SessionsController
    skip_before_action :verify_authenticity_token
    respond_to :json
  
    def create
      user = Blogger.find_by(email: params[:email])
  
      if user && user.valid_password?(params[:password])
        sign_in(user)
        render json: { auth_token: user.authentication_token }
      else
        render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
      end
    end
  end
  