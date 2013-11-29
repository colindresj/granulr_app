function Story(story){
  this.dataObject = story;
  this.$domNode = $('<div>')
                .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12 tile');
  this.completed = this.dataObject.completed;
  // this.checkboxNode = '<input type="checkbox" class="complete-checkbox">'
  this.$checkboxWrapperNode = $('<button>')
                      .addClass('complete-checkbox');
  this.editStory();
}

Story.prototype.editStory = function() {
  var story = this;
  // targets the input fields for editing a story
  var $asA = $('#as_a_edit'),
      $iWantTo = $('#i_want_to_edit'),
      $soICan = $('#so_i_can_edit'),
      $updateStoryButton = $('#update_story_button');
  // assigns values to the targeted fields
  $asA.val(story.dataObject.as_a);
  $iWantTo.val(story.dataObject.i_want_to);
  $soICan.val(story.dataObject.so_i_can);
  // I want to assign a 'click' event listener to the update story button.
  // the event handler should
  //  A) update the dataObject
  //  B) update the database via AJAX
  $updateStoryButton.on("click", function(e){
    debugger
    e.stopPropagation();
    story.updateStory(story);
  });
};

// This needs to update:
//  A) the story's dataObject in the browser
//  B) the story's entry in the database via AJAX
//  C) will this story then be updated visually?
Story.prototype.updateStory = function(story) {
  debugger
  $.ajax({
    url: '/users/' + story.dataObject.user_id + '/stories/' + story.dataObject.id,
    type: 'PUT',
    dataType: 'json',
    data: {
      story: {
        as_a: story.dataObject.as_a,
        i_want_to: story.dataObject.i_want_to,
        so_i_can: story.dataObject.so_i_can,
        completed: story.dataObject.completed,
        user_id: story.dataObject.user_id,
        parent_id: story.dataObject.parent_id
      }
    },
    success: function(response){
      console.log('updating story via ajax WORKED BEAUTIFULLY');
    },
    error: function(response){
      console.log('updating story via ajax failed');
    }
  });

};

Story.prototype.addContentToDomNode = function(){
  // takes the domNode we've assigned the story to and inserts
  // the 'as_a' value of the dataObject into the dom node as content
  this.$domNode.html('<ul><li>As a: <span id="as-a-content">' + this.dataObject.as_a + '</span></li><li>I want to: <span id="i-want-to-content">' + this.dataObject.i_want_to + '</span></li><li>So I can: <span id="so-i-can-content">' + this.dataObject.so_i_can + '</span></li></ul>');
  this.$domNode.append(this.$checkboxWrapperNode);
  this.$checkboxWrapperNode.html('Toggle Complete');
  this.$checkboxWrapperNode.addClass('btn btn-default btn-xs');
}; // addContentToDomNode


Story.prototype.toggleComplete = function(){
  if (this.completed === false){
    this.completed = true;
    var story = this;
    $.ajax({
      url: '/users/' + this.dataObject.user_id + '/stories/' + this.dataObject.id,
      type: 'PUT',
      dataType: 'json',
      data: {
        story: {
          as_a: story.dataObject.as_a,
          i_want_to: story.dataObject.i_want_to,
          so_i_can: story.dataObject.so_i_can,
          completed: true,
          user_id: story.dataObject.user_id,
          parent_id: story.dataObject.parent_id
        }
      }
    });
  } else {
    this.completed = false;
    var story = this;
    $.ajax({
      url: '/users/' + this.dataObject.user_id + '/stories/' + this.dataObject.id,
      type: 'PUT',
      dataType: 'json',
      data: {
        story: {
          as_a: story.dataObject.as_a,
          i_want_to: story.dataObject.i_want_to,
          so_i_can: story.dataObject.so_i_can,
          completed: false,
          user_id: story.dataObject.user_id,
          parent_id: story.dataObject.parent_id
        }
      }
    });
  }
};
