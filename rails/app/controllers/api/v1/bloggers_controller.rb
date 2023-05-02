class Api::V1::BloggersController < ApplicationController 
    before_action :set_user, only: [:show, :destroy, :edit, :update]
    before_action :authenticate_blogger!, only: [:edit, :update, :show]
    before_action :require_same_user, only: [:edit, :destroy, :update]
    
    
    def show
        @articles = @user.articles.paginate(page: params[:page], per_page: 5)
    end

    def index
        # @users = Blogger.paginate(page: params[:page], per_page: 5)
        @users = Blogger.all.map do |user| 
            user.attributes.merge({
                followingsCount: user.followings.count,
                followersCount: user.followers.count,
                articlesCount: user.articles.count
            }).except('encrypted_password','reset_password_token','reset_password_sent_at','remember_created_at"')
            end
        render json: @users
    end

    def new
        @user = Blogger.new
    end
    
    def create
        # @user = Blogger.new(user_params)
        # if @user.save
        #     session[:user_id] = @user.id
        #     flash[:notice]="Welcome to alpha blog #{@user.username}, you have successfully signed up! "
        #     redirect_to articles_path
        # else
        #     render 'new'
        # end
            @user = Blogger.find_by(email: params[:email])
        
            if @user && @user.valid_password?(params[:password])
              sign_in(@user)
              redirect_to root_path
            else
              flash.now[:alert] = "Invalid email or password"
              render :new
            end

    end 
    def edit
    end
    def update
        if @user.update(user_params)
            flash[:notice] = "Your account information was successfully updated"
            redirect_to @user
        else 
            render 'edit'
        end
    end

    def destroy
        @user.destroy
        session[:user_id] = nil if @user == current_blogger
        flash[:notice]="Account and all associated articles have been deleted!"
        redirect_to articles_path
    end
    private 
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
    def set_user
        @user = Blogger.find(params[:id])
    end
    def require_same_user
        if current_blogger != @user && !current_user.admin?
          flash[:alert]= "Your can only modify your own account."
          redirect_to @user
        end
      end
end