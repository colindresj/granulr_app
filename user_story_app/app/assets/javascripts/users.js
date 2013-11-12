// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function User() {
  this.dataContentObject = $('#current-user').data('user');
  this.$tilesContainer = $('#tiles-container');
  this.tileClasses = "col-lg-3 col-md-4 col-sm-6 col-xs-12 tile";

}

// shortening ajax query for retrieving a user's stories based on id

User.prototype.getStoriesAjax = function(){
  return $.ajax({
    url: '/users/' + this.dataContentObject.id + '/stories',
    type: 'GET',
    dataType: 'json'
  })
}


  // .done(function(response) {



  //   $.each(response, function(index, story) {

  //       var storyNode = $('<div>');
  //       storyNode.html(story.as_a);
  //       storyNode.addClass(tileClass);
  //       $('#tiles-container').append(storyNode);
  //   }); // each

  // }); // done

  // var $user_story_form = $("#user_story_form")

  // $user_story_form.on("submit", function(e){
  //   e.preventDefault();
  //   $.ajax({
  //   url: '/users/5/stories.json',
  //   type: 'POST',
  //   dataType: 'json',
  //   data: {story: {
  //     as_a: $("#as_a").val(),
  //     i_want_to: $("#i_want_to").val(),
  //     so_i_can: $("#so_i_can").val() }}
  //   })
  //   .done(function(response) {
  //     console.log(response)
  //     $user_story_form[0].reset();
  //   }); // done
  // })
