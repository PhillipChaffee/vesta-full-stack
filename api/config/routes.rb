Rails.application.routes.draw do
  get '/loans/stats', to: 'loans#stats'

  resources :loans
  resources :borrowers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
