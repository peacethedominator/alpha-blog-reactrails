Rails.application.routes.draw do
  get 'private/test'
  get '/current_blogger', to: 'current_blogger#index'
  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :bloggers, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'bloggers/sessions',
    registrations: 'bloggers/registrations'
  }
  ActiveAdmin.routes(self)
  root 'pages#home'
  get 'about', to: 'pages#about'
  resources :articles 
  resources :users, except: [:new]
  resources :categories, except: [:destroy]
  resources :users do
    post 'follows/create', to: 'follows#create'
    delete 'follows/destroy', to: 'follows#destroy'
  end

  namespace :api do
    namespace :v1 do
      get 'blogger', to: 'bloggers#index'
      post 'blogger', to: 'bloggers#create'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'categories', to: 'categories#index'
      get 'categories/articles', to: 'categories#show'

    end
  end
end