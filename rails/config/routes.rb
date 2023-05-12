Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
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
      get 'currentblogger', to: 'current_blogger#show'
      resources :categories, except: [:destroy]
      resources :articles
      resources :bloggers
      resources :bloggers do
        post 'follows/create', to: 'follows#create'
        delete 'follows/destroy', to: 'follows#destroy'
      end
    end
  end

  devise_for :bloggers, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'bloggers/sessions',
    registrations: 'bloggers/registrations'
  }
end