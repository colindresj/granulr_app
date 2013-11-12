$(function(){

  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
  });









}); //ready


