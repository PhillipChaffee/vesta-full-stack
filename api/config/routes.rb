Rails.application.routes.draw do
  get '/loans/created', to: 'loans#created'
  get '/loans/deleted', to: 'loans#deleted'

  resources :loans
  resources :borrowers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
