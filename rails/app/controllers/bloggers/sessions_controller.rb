class Bloggers::SessionsController < Devise::SessionsController
  respond_to :json

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
