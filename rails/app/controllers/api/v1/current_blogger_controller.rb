class Api::V1::CurrentBloggerController < ApplicationController
  before_action :authenticate_blogger!
  def index
    render json: current_blogger, status: :ok
  end
end
