UserStoryApp::Application.routes.draw do

  get "welcome/index"

root to: "welcome#index"

  resources :users do
    resources :stories
  end

end
#== Route Map
# Generated on 11 Nov 2013 10:52
#
#                 POST   /users/:user_id/stories(.:format)          stories#create
#  new_user_story GET    /users/:user_id/stories/new(.:format)      stories#new
# edit_user_story GET    /users/:user_id/stories/:id/edit(.:format) stories#edit
#      user_story GET    /users/:user_id/stories/:id(.:format)      stories#show
#                 PUT    /users/:user_id/stories/:id(.:format)      stories#update
#                 DELETE /users/:user_id/stories/:id(.:format)      stories#destroy
#           users GET    /users(.:format)                           users#index
#                 POST   /users(.:format)                           users#create
#        new_user GET    /users/new(.:format)                       users#new
#       edit_user GET    /users/:id/edit(.:format)                  users#edit
#            user GET    /users/:id(.:format)                       users#show
#                 PUT    /users/:id(.:format)                       users#update
#                 DELETE /users/:id(.:format)                       users#destroy
