Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :polls, param: :slug
  resources :users, only: %i[create]
  resource :sessions, only: [:create, :destroy]
  resources :votes, only: %i[create]
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
