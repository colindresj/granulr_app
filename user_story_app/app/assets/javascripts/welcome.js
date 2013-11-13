$(function(){
  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
    currentUser.displayStories(currentUser.storyTree);
    // BIASED_SUGGESTION: change line 6 to:
      // currentUser.displayStories();
      // because currentUser has reference to the storyTree

  });

  // BIASED_SUGGESTION, MUCH LATER
    // user.model (may look like this):
      // {
      //    name: "Jonathan",
      //    email: "me@jonl.org",
      //    storyTree: {
      //      alphaNodes: [

      //      ]
      //    }
      // }
      // user.view


// seemingly needed this variable declared before the event handler that follows
  var $user_story_form = $("#user_story_form");

  $user_story_form.on("submit", function(e){
    e.preventDefault();
    currentUser.createStoryAjax()
      .done(function(response) {
        debugger
        // to allow us to iterate over the response with the 'displayStories' function (it would otherwise be an object, which wouldn't work)
        var responseArray = [response];
        currentUser.displayStories(responseArray);
        $user_story_form[0].reset();
      }); // done
  }); //on submit
}); //ready
