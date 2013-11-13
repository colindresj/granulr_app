$(function(){
  var currentUser = new User();

  currentUser.getStoriesAjax().done(function(response){
    currentUser.getStoriesEvent(response);
    currentUser.displayStories(currentUser.storyTree);
  });


// seemingly needed this variable declared before the event handler that follows
  var $user_story_form = $("#user_story_form");

  $user_story_form.on("submit", function(e){
    e.preventDefault();
    $.ajax({
      url: '/users/' + currentUser.dataContentObject.id + '/stories',
      type: 'POST',
      dataType: 'json',
      data: {
        story: {
          as_a: $("#as_a").val(),
          i_want_to: $("#i_want_to").val(),
          so_i_can: $("#so_i_can").val(),
          user_id: currentUser.dataContentObject.id,
          parent_id: currentUser.currentStoryId

        } // story
      } // data
    }) // ajax
    .done(function(response) {
      // to allow us to iterate over the response with the 'displayStories' function (it would otherwise be an object, which wouldn't work)
      var responseArray = [response];
      currentUser.displayStories(responseArray);
      // console.log(response);
      $user_story_form[0].reset();
    }); // done
  }); //on submit






}); //ready
