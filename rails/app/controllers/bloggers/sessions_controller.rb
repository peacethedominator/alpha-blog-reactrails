class Bloggers::SessionsController < Devise::SessionsController
  respond_to :json

  # def create
  #   user = Blogger.find_for_database_authentication(email: params[:email])
  #   if user && user.valid_password?(params[:password])
  #     sign_in(user)
  #     render json: { message: 'Logged in successfully', jwt: auth_token }, status: :created
  #   else
  #     render json: { error: 'Invalid email or password' }, status: :unauthorized
  #   end
  # end

  # def destroy
  #   sign_out(current_user)
  #   render json: { message: 'Logged out successfully' }, status: :ok
  # end
  private

  def respond_with(resource, _opts = {})
    token = JWT.encode({ blogger_id: resource.id }, Rails.application.credentials.devise_jwt_secret_key, 'HS256')
    render json: {
      jwt: token,
      status: { code: 200, message: 'Logged in successfully.' },
      data: BloggerSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_blogger
      JwtDenylist.jti_create(jti: current_blogger.jti, exp: Time.now.to_i + 60 * 60)
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
