class ArticlesController < ApplicationController
before_action :set_article, only: [:show, :edit, :update, :destroy]
before_action :authenticate_blogger!
before_action :require_same_user, only: [:edit, :update, :destroy]

  def show
  end
  
  def index
    followed_users = current_blogger.followings
    @articles = Article.where(blogger_id: followed_users).paginate(page: params[:page], per_page: 5)
    # @articles = Article.paginate(page: params[:page], per_page: 5)
    # @articles = Article.where(user_id: current_blogger.followings.pluck(:id))
  end

  def new 
    @article = Article.new
  end
  
  def edit
  end
  

  def create
    # render plain: params[:article]
    @article = Article.new(article_params)
    @article.blogger = current_blogger
    # render plain:@article.inspect
    if @article.save
    # redirect_to article_path(@article)
    flash[:notice] = "Article was created successfully."
      redirect_to @article      
    else
      render 'new'
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
