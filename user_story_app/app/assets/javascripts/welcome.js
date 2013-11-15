$(function(){
  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
    currentUser.displayStories(currentUser.storyTree);
  });

  $('#dashboard-link').on('click', function(){
    currentUser.goBackToDashboard();
    currentUser.displayStories(currentUser.storyTree);
  });

  $('#breadcrumbs').on('click', '#add-story', currentUser.showCreateStoryForm);


// seemingly needed this variable declared before the event handler that follows
  var $user_story_form = $("#user_story_form");

  $user_story_form.on("submit", function(e){
    debugger
    e.preventDefault();
    currentUser.createStoryAjax()
      .done(function(response) {
        if (currentUser.currentStory) {
          if (currentUser.currentStory.children) {
          currentUser.currentStory.children.push(response);
          }
        }
        // to allow us to iterate over the response with the 'displayStories' function (it would otherwise be an object, which wouldn't work)
        var responseArray = [response];
        currentUser.displayStories(responseArray);
        $user_story_form[0].reset();
      }); // done
  }); //on submit
}); //ready
