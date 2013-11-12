$(function(){
  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
    currentUser.displayStories(currentUser.storyTree);
  });

  $('#tiles-container').on('click', '.tile', function(){
    var dataObject = $(this).data('story');
    currentUser.goToStory(dataObject);
  });







}); //ready
