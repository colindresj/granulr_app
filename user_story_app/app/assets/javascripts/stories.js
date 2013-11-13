
function Story(story){
  this.dataObject = story;
  this.$domNode = $('<div>')
                 .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12 tile');
}

Story.prototype.addContentToDomNode = function(){
  // takes the domNode we've assigned the story to and inserts
  // the 'as_a' value of the dataObject into the dom node as content
  this.$domNode.html(this.dataObject.as_a);
};
