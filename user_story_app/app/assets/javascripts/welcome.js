$(function(){
  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
    currentUser.displayStories(currentUser.storyTree);
  });









}); //ready
