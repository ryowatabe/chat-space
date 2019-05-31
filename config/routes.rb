Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html  
  devise_for :users
  resources :users, only: [:index,:edit, :update] 
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messeages, only: [:index, :create]
  end

  root 'groups#index'
end