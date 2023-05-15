class Api::V1::BloggersController < ApplicationController 
    before_action :set_user, only: [:show, :destroy, :edit, :update]
    before_action :authenticate_blogger!, only: [:edit, :update]
    # before_action :require_same_user, only: [:edit, :destroy, :update]
    
    
    def show
        @articles = @blogger.articles.map do |item|
            item.attributes.merge({
                categories: item.categories,
                blogger: item.blogger
            })
            end
            @follow = {
                follower: @blogger.followers,
                following: @blogger.follows
              }
        render json: {blogger: @blogger, articles: @articles, follows: @follow}
    end

    def index
        # @users = Blogger.paginate(page: params[:page], per_page: 5)
        @bloggers = Blogger.all.map do |blogger| 
            blogger.attributes.merge({
                followingsCount: blogger.followings.count,
                followersCount: blogger.followers.count,
                articlesCount: blogger.articles.count,
                followings: blogger.followings,
                followers: blogger.followers
            }).except('encrypted_password','reset_password_token','reset_password_sent_at','remember_created_at"')
            end
        render json: @bloggers
    end

    def new
        @blogger = Blogger.new
    end
    
    def create
        # @blogger = Blogger.new(user_params)
        # if @blogger.save
        #     session[:user_id] = @blogger.id
        #     flash[:notice]="Welcome to alpha blog #{@blogger.username}, you have successfully signed up! "
        #     redirect_to articles_path
        # else
        #     render 'new'
        # end
            @blogger = Blogger.find_by(email: params[:email])
        
            if @blogger && @blogger.valid_password?(params[:password])
              sign_in(@blogger)
              render json: @blogger
            #   redirect_to root_path
            else
              flash.now[:alert] = "Invalid email or password"
              render :new
            end

    end 
    def edit
    end
    def update
        if @blogger.update(blogger_params)
            flash[:notice] = "Your account information was successfully updated"
            render json: @blogger
        else 
            render json: @blogger.errors
        end
    end

    def destroy
        @blogger.destroy
        render json: { message: "Account and all associated articles have been deleted!" }, status: :ok
        if(!@blogger.destroy)
          render json: { error: "Failed to delete account and associated articles" }, status: :unprocessable_entity
        end
      end
      
    private 
    def blogger_params
        params.require(:blogger).permit( :email, :password)
    end
    def set_user
        @blogger = Blogger.find(params[:id])
    end
    def require_same_user
        if current_blogger != @blogger && !current_blogger.admin?
          flash[:alert]= "Your can only modify your own account."
          redirect_to @blogger
        end
      end
end