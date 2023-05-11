class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    # helper_method :current_blogger   #, :logged_in?

    # def current_blogger
    #      @current_blogger ||= Blogger.find(session[:blogger_id]) if session[:blogger_id]
        
    # end
    # def logged_in?
    #     !!current_blogger
    # end
    def require_user
        if !blogger_signed_in?
            flash[:alert]= "You must be logged in to perform that action."
            # redirect_to login_path
            redirect_to new_blogger_session_path
        end
    end

end
