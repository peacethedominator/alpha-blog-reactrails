class Api::V1::CategoriesController < ApplicationController

    # before_action :require_admin, except: [:index, :show]
    def new 
        @category = Category.new
    end

    def create
        @category = Category.new(category_params)
        if @category.save
          flash[:notice] = "Category was successfully created"
          redirect_to @category
        else
          render 'new'
        end
    end

    def edit
        @category = Category.find(params[:id])
    end

    def update
        @category = Category.find(params[:id])
        if @category.update(category_params)
            flash[:notice]="Category name updated successfully"
            redirect_to @category
        else
            render 'edit'
        end
    end

    def index
        @categories = Category.all.map do |item|
            item.attributes.merge({
                articlesCount: item.articles.count
            })
        end
        render json: @categories
    end

    def show
        @categories = Category.find(params[:id])
        @articles =@categories.articles.map do |article|
            article.attributes.merge({
                blogger: article.blogger,
                categories: article.categories
            })
        end
        render json:  {categories: @categories, articles: @articles}
    end

    private
    
    def category_params
        params.require(:category).permit(:name)
    end
    def require_admin
        if !(blogger_signed_in? && current_user.admin?)
            flash[:alert] = "Only admins can perform this action"
            redirect_to categories_path
        end
    end
end