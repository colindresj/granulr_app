
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

    // allows the user to click the done button on a story without going into it
    // as well as toggle the completed state of that story
    createdStory.$checkboxWrapperNode.on('click', function(e){
      e.stopPropagation();
      if (createdStory.completed) {
        createdStory.completed = false;
        createdStory.$domNode.css('color', 'red');
      } else {
        createdStory.completed = true;
        createdStory.$domNode.css('color', 'black');
      }
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

User.prototype.createStoryAjax = function(){
  var user = this;
  return $.ajax({
          url: '/users/' + user.dataContentObject.id + '/stories',
          type: 'POST',
          dataType: 'json',
          data: {
            story: {
              as_a: $("#as_a").val(),
              i_want_to: $("#i_want_to").val(),
              so_i_can: $("#so_i_can").val(),
              user_id: user.dataContentObject.id,
              parent_id: user.currentStoryId
            } // story
          } // data
        }) // ajax

} // createStoryAjax
