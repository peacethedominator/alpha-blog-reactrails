class Api::V1::CurrentBloggerController < ApplicationController
  before_action :authenticate_blogger!
  
  def show
    @blogger = current_blogger.attributes.merge({
      followers: current_blogger.followers,
      followings: current_blogger.followings
    }).except('encrypted_password', 'reset_password_token', 'reset_password_sent_at', 'remember_created_at')
    render json: @blogger, status: :ok
  end
end

# class Api::V1::CurrentBloggerController < ApplicationController
#   before_action :authenticate_blogger!
  
#   def show
#     @followings = current_blogger.followings
#     @followers = current_blogger.followers
#     render json: {currentBlogger: current_blogger,followings: @followings, followers: @followers}, status: :ok
#   end
# end
