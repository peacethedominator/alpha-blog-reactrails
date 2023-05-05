class Api::V1::ArticlesController < ApplicationController
before_action :set_article, only: [:show, :edit, :update, :destroy]
# before_action :authenticate_blogger!
before_action :require_same_user, only: [:edit, :update, :destroy]
protect_from_forgery with: :null_session

  def show
  end
  
  def index
    # followed_users = current_blogger.followings
    # @articles = Article.where(blogger_id: followed_users).paginate(page: params[:page], per_page: 5)
    @articles = Article.all.map do |item|
      item.attributes.merge({
          blogger: item.blogger
      })
    end
    render json: @articles
  end

  def new 
    @article = Article.new
  end
  
  def edit
  end
  

  def create
    @article = Article.new(article_params)
    @article.blogger = Blogger.find(2)
    if @article.save
      render json: { message: "Article created successfully!", article: @article }
    else
      render json: { message: "Error creating" }
    end
  end
  
  def update
    if @article.update(article_params)
      flash[:notice] = "Article was updated successfully."
      redirect_to @article
    else
      render 'edit'
    end
  end
  
  def destroy
    @article.destroy
    redirect_to articles_path
  end
  
  private
  def set_article
    @article = Article.find(params[:id])
  end
  
  def article_params
    params.require(:article).permit(:title, :description, category_ids:[])
  end

  def require_same_user
    if current_blogger != @article.blogger 
      flash[:alert]= "Your can only modify your articles."
      redirect_to @article
    end
  end
end
