$(function(){

  var currentUser = new User()

  currentUser.getStoriesAjax().done(function(response){
    console.log(response)
  })









}); //ready


