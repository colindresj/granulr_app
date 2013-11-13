
function User() {
  this.dataContentObject = $('#current-user').data('user');
  this.$tilesContainer = $('#tiles-container');
  this.currentStoryId = null;
}

// shortening ajax query for retrieving a user's stories based on id
User.prototype.getStoriesAjax = function(){
  return $.ajax({
    url: '/users/' + this.dataContentObject.id + '/stories',
    type: 'GET',
    dataType: 'json'
  });
};

// set the current user's storyTree to the AJAX response
User.prototype.getStoriesEvent = function(response){
  this.storyTree = response;
};

// grab a particular set of sibling stories as an array
User.prototype.displayStories = function(array){
  var self = this;
  // loop through them and create a new Story object from the data
  _.each(array, function(story, i){
    var createdStory = new Story(story);

    // append that Story object's DOM representation to #tiles-container
    createdStory.addContentToDomNode();
    self.$tilesContainer.append(createdStory.$domNode);

    // add an event listener on click
    // to 'step into' it and see those children stories
    createdStory.$domNode.on('click', function(){
      self.goToStory(createdStory.dataObject);
    });

  });
};

User.prototype.goToStory = function(dataObject){

  // first clear #tiles-container
  this.$tilesContainer.html('');

  this.currentStoryId = dataObject.id;

  // run all the children through the displayStories function in order to
  // create Story objects and apply the proper event listeners
  this.displayStories(dataObject.children);
};


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
