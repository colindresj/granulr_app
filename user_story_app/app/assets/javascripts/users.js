function User() {
  this.dataContentObject = $('#current-user').data('user');
  this.$tilesContainer = $('#tiles-container');
  this.currentStoryId = null;
  this.allStories = [];
}

// ========================================================
// AJAX requests
// ========================================================

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

User.prototype.getStoryAjax = function(story_id) {
  return $.ajax({
    type: "get",
    url: '/users/' + this.dataContentObject.id + '/stories/' + story_id,
    dataType: "json"
  });
};

User.prototype.getStoryEvent = function(response){
  console.log(response);
  user.$tilesContainer.html('');
  // sets currentStory to response from database, whereas
  // it used to pull the values from client-side JSON storyTree
  user.currentStory = response;
  user.currentStoryId = response.id;
  $('#as_a').val(response.as_a);
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

// ========================================================
// Navigation
// ========================================================

// clears the tilesContainer of all stories,
// sets the current story + id for easy retrieval,
// as well as the 'as_a' field of the new story form to the value of its parent story,
// then populates the tilesContainer with the appropriate stories via the displayStories function
User.prototype.goToStory = function(dataObject){
  // set variable 'user' in global namespace so I can run .getStoryEvent and .displayStories
  user = this;
  user.getStoryAjax(dataObject.id).done(function(response){
    user.getStoryEvent(response);
    user.displayStories(dataObject.children);
  });

  // $.ajax({
  // type: "get",
  // url: "/users/" + this.dataContentObject.id + "/stories/" + dataObject.id,
  // dataType: "json"
  // }).done(function(msg) {
  //   console.log(msg)
  // });
};

// clears the page of content, and
// prepares the view for the dashboard
User.prototype.goBackToDashboard = function(){
  this.$tilesContainer.html('');
  $('#subtitle').html('');
  $('.breadcrumbs-slash').remove();
  $('.story-link').remove();
  // resets the 'as_a' form field to empty
  $('#as_a').val('');
  $('#current-title').html('Dashboard');
};

// clears the page of irrelevant stories and titles,
// makes the appropriate changes to the breadcrumbs trail,
// then populates the title and subtitle appropriately
User.prototype.goBackToStoryPage = function(linkClicked, story){
  var self = this;
  this.$tilesContainer.html('');
  $('#subtitle').html('');
  $('#add-story').remove();
  linkClicked.siblings('.breadcrumbs-slash').last().remove();
  linkClicked.nextAll().remove();
  linkClicked.css('font-weight', 'bold');
  $('#current-title').html(story.dataObject.i_want_to);
  $('#subtitle').append('<span>As a: ' + story.dataObject.as_a + ' &rarr; </span>');
  $('#subtitle').append('<span>I want to: ' + story.dataObject.i_want_to + ' &rarr; </span>');
  $('#subtitle').append('<span>So I can: ' + story.dataObject.so_i_can + '</span>');

  // Hmmm... I don't get why we're running this function here. Why would users click this link when they're already on this story?
  $('.story-link').on('click', function(){
    var linkClicked = $(this),
        storyClicked = parseInt(linkClicked.attr('id'));

    function findMatchingStory(array) {
      var match;
      _.each(array, function(story){
        if (story.dataObject.i_want_to === storyClicked) {
          match = story;
        } // if
      }); // each
      return match;
    } // findMatchingStory

    var storyMatched = findMatchingStory(self.allStories);
    self.goBackToStoryPage(linkClicked, storyMatched);
    self.displayStories(storyMatched.dataObject.children);

  }); // on 'click'

  $('#breadcrumbs').append('<i class="breadcrumbs-slash"> / </i><span id="add-story">Add</span>');

}; // goBackToStoryPage

User.prototype.showCreateStoryForm = function(){
  $('#user_story_form').slideToggle();
};

// grab a particular set of sibling stories as an array
User.prototype.displayStories = function(array){
  var self = this;

  // BIASED_SUGGESTION
    // replace array with
    // self.storyTree
    // _.each(self.storyTree, function(story, i){

  // pushes every story into an array for... what reason, exactly? Easy iteration?
  _.each(array, function(story, i){
    var createdStory = new Story(story);
    self.allStories.push(createdStory);

    // conditionally colors the completed/uncompleted stories
    if (createdStory.completed) {
      createdStory.$domNode.css('color', 'green');
    } else {
      createdStory.$domNode.css('color', 'red');
    }

    // append that Story object's DOM representation to #tiles-container
    createdStory.addContentToDomNode();

    // as we iterate through all the stories, append the View Nested Goals button where appropriate and neglect to otherwise
    if (createdStory.dataObject.children && createdStory.dataObject.children.length > 0) {
        createdStory.$domNode.append('<button class="btn btn-default btn-xs">View Nested Goals</button>');
    }

    self.$tilesContainer.append(createdStory.$domNode);

    // add an event listener on click that allows users
    // to 'step into' a story and see its children stories
    createdStory.$domNode.on('click', function(){
      self.goToStory(createdStory.dataObject);
      $('#add-story').remove();
      $('#subtitle').html('');
      $('#subtitle').append('<span>As a: ' + createdStory.dataObject.as_a + ' &rarr; </span>');
      $('#subtitle').append('<span>I want to: ' + createdStory.dataObject.i_want_to + ' &rarr; </span>');
      $('#subtitle').append('<span>So I can: ' + createdStory.dataObject.so_i_can + '</span>');
      $('#current-title').html(createdStory.dataObject.i_want_to);
      $('.story-link').css('font-weight', 'normal');
      $('.story-link').on('click', function(){

        var linkClicked = $(this),
            storyClicked = parseInt($(this).attr('id'));

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
        checkable = true;

    _.each(storyChildren, function(childStory, i){
        if (childStory.completed === false) {
          checkable = false;
        }
      });

    // if the story does not have children, add an event listener on 'Done' click
    // that stops propogation so you don't go into the story. Additionally,
    // this allows you to toggle the story's 'completed' value
    if (storyChildren.length === 0){
      createdStory.$checkboxWrapperNode.on('click', function(e){
        e.stopPropagation();
        debugger
        if (createdStory.completed) {
          createdStory.toggleComplete();
          createdStory.$domNode.css('color', 'red');
          var depth = createdStory.dataObject.depth_attribute;
          // if the story is an alpha story, go into the story tree, seek out the story via id, and toggle its completed value
          if (depth === 0){
            var matcher = _.findWhere(self.storyTree, {id: createdStory.dataObject.id});
            matcher.completed = false;
          } else {
            _.each(self.storyTree, function(story){
              if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                _.each(story.children, function(story){
                  if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                  } else {
                    var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                    matcher.completed = false;
                  }
                });
              } else {
                var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                matcher.completed = false;
              }
            });
          }
        } else {
          createdStory.toggleComplete();
          createdStory.$domNode.find('.complete-checkbox').html('Revert to incomplete');
          createdStory.$domNode.css('color', 'green');
          var depth = createdStory.dataObject.depth_attribute;
          if (depth === 0){
            var matcher = _.findWhere(self.storyTree, {id: createdStory.dataObject.id});
            matcher.completed = true;
          } else {
            _.each(self.storyTree, function(story){
              if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                _.each(story.children, function(story){
                  if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                    debugger;
                  } else {
                    var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                    matcher.completed = true;
                  }
                });
              } else {
                var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                matcher.completed = true;
              }
            });
          }
        }
      }); // on click of checkboxWrapperNode
    } else if (storyChildren.length > 0 && checkable === true){
      createdStory.$checkboxWrapperNode.on('click', function(e){
        e.stopPropagation();
        if (createdStory.completed) {
          createdStory.$domNode.css('color', 'red');
          createdStory.toggleComplete();
          var depth = createdStory.dataObject.depth_attribute;
          if (depth === 0){
            var matcher = _.findWhere(self.storyTree, {id: createdStory.dataObject.id});
            matcher.completed = false;
          } else {
            _.each(self.storyTree, function(story){
              if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                _.each(story.children, function(story){
                  if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                    debugger
                  } else {
                    var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                    matcher.completed = false;
                  }
                });
              } else {
                var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                matcher.completed = false;
              }
            });
          }
        } else {
          createdStory.toggleComplete();
          createdStory.$domNode.css('color', 'green');
          createdStory.$domNode.find('.complete-checkbox').html('Revert to incomplete');
          var depth = createdStory.dataObject.depth_attribute;
          if (depth === 0){
            var matcher = _.findWhere(self.storyTree, {id: createdStory.dataObject.id});
            matcher.completed = true;
          } else {
            _.each(self.storyTree, function(story){
              if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                _.each(story.children, function(story){
                  if (story.depth_attribute !== createdStory.dataObject.depth_attribute - 1) {
                    debugger
                  } else {
                    var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                    matcher.completed = true;
                  }
                });
              } else {
                var matcher = _.findWhere(story.children, {id: createdStory.dataObject.id});
                matcher.completed = true;
              }
            });
          }
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
