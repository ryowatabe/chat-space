Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html  
  devise_for :users
  resources :users, only: [:new, :create, :edit, :update]
  resources :messeages, only: [:index, :update]
  resources :groups, only: [:show, :new, :create, :edit] do
    resources :messeages, only: [:new, :create]
  end

  root 'messeages#index'
end