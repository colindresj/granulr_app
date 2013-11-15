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

User.prototype.goBackToDashboard = function(){
  this.$tilesContainer.html('');
  $('#current-title').html('Dashboard');
  $('#subtitle').html('');
  $('.breadcrumbs-slash').remove();
  $('.story-link').remove();
};

User.prototype.goBackToStoryPage = function(linkClicked, story){
  var self = this;
  this.$tilesContainer.html('');
  $('#current-title').html(story.dataObject.i_want_to);
  $('#subtitle').html('');
  $('#subtitle').append('<span>As a: ' + story.dataObject.as_a + ' &rarr; </span>');
  $('#subtitle').append('<span>I want to: ' + story.dataObject.i_want_to + ' &rarr; </span>');
  $('#subtitle').append('<span>So I can: ' + story.dataObject.so_i_can + '</span>');
  $('#add-story').remove();
  linkClicked.siblings('.breadcrumbs-slash').last().remove()
  // $('.breadcrumbs-slash').remove();
  linkClicked.nextAll().remove();
  linkClicked.css('font-weight', 'bold');
  $('.story-link').on('click', function(){

    var linkClicked = $(this);
    var storyClicked = parseInt($(this).attr('id'));

    function findMatchingStory(array) {
      var match;
      _.each(array, function(story){
        if (story.dataObject.i_want_to === storyClicked) {
          match = story;
        }
      });
      return match;
    }
    var storyMatched = findMatchingStory(self.allStories);
    self.goBackToStoryPage(linkClicked, storyMatched);
    self.displayStories(storyMatched.dataObject.children);


        // currentUser.displayStories(currentUser.storyTree);
      });
  // $('#breadcrumbs').append('<span class="story-link" id="' + story.dataObject.i_want_to + '" style="font-weight:bold;">' + story.dataObject.i_want_to + '</span> <i class="breadcrumbs-slash"> / </i> ');
  $('#breadcrumbs').append('<i class="breadcrumbs-slash"> / </i><span id="add-story">Add</span>');
};

User.prototype.showCreateStoryForm = function(){
  $('#user_story_form').slideToggle();
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
      debugger
      createdStory.$domNode.css('color', 'green');
    } else {
      createdStory.$domNode.css('color', 'red');
    }


    // append that Story object's DOM representation to #tiles-container
    createdStory.addContentToDomNode();
    if (createdStory.dataObject.children.length > 0) {
      createdStory.$domNode.append('<button class="btn btn-default btn-xs">View Nested Goals</button>');
    }
    self.$tilesContainer.append(createdStory.$domNode);

    // add an event listener on click
    // to 'step into' it and see those children stories
    createdStory.$domNode.on('click', function(){
      self.goToStory(createdStory.dataObject);
      $('#current-title').html(createdStory.dataObject.i_want_to);
      $('#subtitle').html('');
      $('#subtitle').append('<span>As a: ' + createdStory.dataObject.as_a + ' &rarr; </span>');
      $('#subtitle').append('<span>I want to: ' + createdStory.dataObject.i_want_to + ' &rarr; </span>');
      $('#subtitle').append('<span>So I can: ' + createdStory.dataObject.so_i_can + '</span>');
      $('#add-story').remove();
      $('.story-link').css('font-weight', 'normal');
      $('.story-link').on('click', function(){

        var linkClicked = $(this);


        var storyClicked = parseInt($(this).attr('id'));

        function findMatchingStory(array) {
          var match;
          _.each(array, function(story){
            if (story.dataObject.id === storyClicked) {

              match = story;
            }
          });
          return match;
        }

        var storyMatched = findMatchingStory(self.allStories);
        self.goBackToStoryPage(linkClicked, storyMatched);
        self.displayStories(storyMatched.dataObject.children);


        // currentUser.displayStories(currentUser.storyTree);
      });
      $('#breadcrumbs').append('<span class="story-link" id="' + createdStory.dataObject.id + '" style="font-weight:bold;">' + createdStory.dataObject.i_want_to + '</span> <i class="breadcrumbs-slash"> / </i> ');
      $('#breadcrumbs').append('<span id="add-story">Add</span>');
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
          createdStory.$domNode.find('.complete-checkbox').html('Revert to incomplete');
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
          debugger
          createdStory.$domNode.find('.complete-checkbox').html('Revert to incomplete');
        }
      }); // on click of checkboxWrapperNode
    } else {
      createdStory.$domNode.css('color', 'gray');
      createdStory.$domNode.find('.complete-checkbox').remove();
      createdStory.$checkboxWrapperNode.on('click', function(e){
        e.stopPropagation();
      });
    }
  }); // each
}; // display stories function

User.prototype.goToStory = function(dataObject){

  // first clear #tiles-container
  this.$tilesContainer.html('');

  this.currentStory = dataObject;
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
