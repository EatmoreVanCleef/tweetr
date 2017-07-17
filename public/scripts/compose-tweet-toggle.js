$(document).ready(function() {
   $('#nav-bar > ul').on('click', () => {
      var target = $('#newTweet');
      if (target.is(':visible')) {
         target.slideUp('fast');
      } else {
         target.slideDown('fast');
         target.find('#submitTweet > textarea').focus();
      }
   });
});
