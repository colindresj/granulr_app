
function Story(story){
  this.dataObject = story;
  this.$domNode = $('<div>')
                 .addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12 tile');

}

Story.prototype.addContentToDomNode = function(){
  this.$domNode.html(this.dataObject.as_a);
  this.$domNode.data('story', this.dataObject);
};
