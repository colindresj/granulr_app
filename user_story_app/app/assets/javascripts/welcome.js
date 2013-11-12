$(function(){


  $.ajax({
    url: '/users/1/stories',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {

    var tileClass = "col-lg-3 col-md-4 col-sm-6 col-xs-12 tile";

    $.each(response, function(index, story) {

        var storyNode = $('<div>');
        storyNode.html(story.as_a);
        storyNode.addClass(tileClass);
        $('#tiles-container').append(storyNode);
    }); // each

  }); // done


}); //ready


