function User() {
  this.dataContentObject = $('#current-user').data('user');
  // # BIASED_SUGGESTION: perhaps change this to this.model
  // Move this to not rely on the data attribute in the DOM
  // Not important now.
  this.$tilesContainer = $('#tiles-container');
  this.currentStoryId = null;
  this.allStories = [];
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

  // BIASED_SUGGESTION
    // replace array with
    // self.storyTree
    // _.each(self.storyTree, function(story, i){

  _.each(array, function(story, i){
    var createdStory = new Story(story);
    self.allStories.push(createdStory);

    if (createdStory.completed) {
      createdStory.$domNode.css('color', 'green');
    } else {
      createdStory.$domNode.css('color', 'red');
    }

    // append that Story object's DOM representation to #tiles-container
    createdStory.addContentToDomNode();
    self.$tilesContainer.append(createdStory.$domNode);


    // add an event listener on click
    // to 'step into' it and see those children stories
    createdStory.$domNode.on('click', function(){
      self.goToStory(createdStory.dataObject);
      $('#add-story').remove();
      $('#breadcrumbs').append('<span class="link">' + createdStory.dataObject.i_want_to + '</span> > ');
      $('#breadcrumbs').append('<span id="add-story">Add</span>');
    });

      // TODO
      // -Exception handling for where there IS no ancestry.
      // -Recursively scan the currentUser.storyTree, checking each
      //  story's ID against the IDs in the ancestorsArray
      //    -where ID's match, append each 'i_want_to' value to
      // the breadcrumbs $('#breadcrumbs') object.
      if (createdStory.dataObject.ancestry != null) {
        var ancestorsArray = createdStory.dataObject.ancestry.split('/');
        $('#depth-title').html(createdStory.dataObject.i_want_to);
        _.each(currentUser.storyTree, function(story, i){
          debugger
          // if (story.id === ) {};
        });




      } else { console.log("The ancestry is set to null, and therefore no breakcrumbs should be appended be") }




        $('#breadcrumbs').html('Dashboard > ' + createdStory.dataObject.i_want_to);
      });

      // grabs all of the story's children
      var storyChildren = createdStory.dataObject.children || [];
      var checkable = true;

      _.each(storyChildren, function(childStory, i){
          if (childStory.completed === false) {
            checkable = false;
          }
        });

    // if the story does not have children, add an event listener on 'Done' click
    // that stops propogation, so you don't go into the story and at the same time
    // allows you to toggle the storie's 'completed' value
    if (storyChildren.length === 0){
      createdStory.$checkboxWrapperNode.on('click', function(e){
        e.stopPropagation();
        if (createdStory.completed) {
          createdStory.toggleComplete();
          createdStory.$domNode.css('color', 'red');
        } else {
          createdStory.toggleComplete();
          createdStory.$domNode.css('color', 'green');
        }
      }); // on click of checkboxWrapperNode
    } else if (storyChildren.length > 0 && checkable === true){
      createdStory.$checkboxWrapperNode.on('click', function(e){

        e.stopPropagation();
        if (createdStory.completed) {
          createdStory.$domNode.css('color', 'red');
          createdStory.toggleComplete();
        } else {
          createdStory.toggleComplete();
          createdStory.$domNode.css('color', 'green');
        }
      }); // on click of checkboxWrapperNode
    } else {
      createdStory.$domNode.css('color', 'gray');
      createdStory.$checkboxWrapperNode.on('click', function(e){
        e.stopPropagation();
      });
    }
  }); // each
}; // display stories function

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
        }); // ajax

}; // createStoryAjax
