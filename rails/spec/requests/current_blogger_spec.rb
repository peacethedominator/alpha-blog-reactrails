require 'rails_helper'

RSpec.describe "CurrentBloggers", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/current_blogger/index"
      expect(response).to have_http_status(:success)
    end
  end

end
