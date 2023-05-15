class Api::V1::ArticlesController < ApplicationController
before_action :set_article, only: [:show, :edit, :update, :destroy]
# before_action :authenticate_blogger!
before_action :require_same_user, only: [:edit, :update, :destroy]
protect_from_forgery with: :null_session

  def show
    @blogger = @article.blogger
    @categories = @article.categories
    render json: {article: @article, blogger: @blogger, category: @categories}
  end
  
  def index
    # followed_users = current_blogger.followings
    # @articles = Article.where(blogger_id: followed_users).paginate(page: params[:page], per_page: 5)
    @articles = Article.all.map do |item|
      item.attributes.merge({
          blogger: item.blogger,
          categories: item.categories
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
    @article.blogger = Blogger.find(params[:id])
    @article.categories << Category.find(params[:category_ids]) if params[:category_ids]
    if @article.save
      render json: { message: "Article created successfully!", article: @article }
    else
      render json: { message: "Error creating" }
    end
  end
  
  def update
    if @article.update(article_params)
      selected_categories = Category.find(params[:category_ids])
      @article.categories.clear
      @article.categories << selected_categories
      render json: {message: "Article updated successfully!"}
    else
      # render 'edit'
      render json: {message: "Error editing"}
    end
  end
  
  def destroy
    @article.destroy
    render json: {message: "Deleted Successfully!"}
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
