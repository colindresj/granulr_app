class ApplicationController < ActionController::Base

  #includes helpers related to signup
  helper :all

  protect_from_forgery

  def after_sign_in_path_for(resource)
    user_path(resource)
  end
end
