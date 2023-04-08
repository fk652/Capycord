Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]

    resources :users, only: [:create, :show, :update]

    resources :servers, only: [:index, :show, :create, :destroy, :update] do 
      resources :channels, only: [:create, :index] do 
        resources :messages, only: [:create, :index]
      end

      resources :memberships, only: [:index]
    end

    resources :channels, only: [:show, :destroy, :update]
    resources :messages, only: [:show, :destroy, :update]
    resources :friends, only: [:index, :destroy]
    resources :friend_requests, only: [:index, :create, :destroy, :update]
    resources :memberships, only: [:create, :destroy, :update]
  end
  
  # Defines the root path route ("/")
  # root "articles#index"

  get '*path', to: "static_pages#frontend_index"
end
