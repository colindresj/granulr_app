class ApplicationController < ActionController::Base

  #includes helpers related to signup
  helper :all

  protect_from_forgery
end
