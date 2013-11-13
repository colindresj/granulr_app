function Story(story){
  this.dataObject = story;
  this.$domNode = $('<div>')
                .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12 tile');
  this.completed = this.dataObject.completed;
  // this.checkboxNode = '<input type="checkbox" class="complete-checkbox">'
  this.$checkboxWrapperNode = $('<div>')
                      .addClass('complete-checkbox');

}

Story.prototype.addContentToDomNode = function(){
  // takes the domNode we've assigned the story to and inserts
  // the 'as_a' value of the dataObject into the dom node as content
  this.$domNode.html('<ul><li>As a: ' + this.dataObject.as_a + '</li><li>I want to: ' + this.dataObject.i_want_to + '</li><li>So I can: ' + this.dataObject.so_i_can + '</li></ul>');
  this.$domNode.append(this.$checkboxWrapperNode);
  this.$checkboxWrapperNode.html('Done');
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
      },
      success: function(response){
        console.log('worked going true');
      },
      error: function(response){
        console.log('did not work going true');
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
      },
      success: function(response){
        console.log('worked going false');
      },
      error: function(response){
        console.log('did not work going false');
      }
    });
  }
};
