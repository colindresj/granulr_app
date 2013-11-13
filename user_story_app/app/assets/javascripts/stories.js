function Story(story){
  this.dataObject = story;
  this.$domNode = $('<div>')
                .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12 tile');
  this.completed = false;
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
