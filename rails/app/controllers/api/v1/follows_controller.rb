class Api::V1::FollowsController < ApplicationController
    def create
        followed_user = Blogger.find(params[:blogger_id])
        current_blogger.followings << followed_user
        render json: {followed: followed_user, followed_array: current_blogger.followings }
    end
    def destroy
        followed_user = Blogger.find(params[:blogger_id])
        current_blogger.followings.delete(followed_user)
        render json: {followed_array: current_blogger.followings}
        # redirect_to users_path
      end
end