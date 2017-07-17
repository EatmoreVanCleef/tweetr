/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#submitTweet').on('submit', function(event) {
    event.preventDefault();
    // console.log("default " + event.type + " prevented");
    // console.log( $(this) );    
    var submission = $(this);
    console.log(submission.context[0].value);
    var serializedTweet = $(this).serialize();
    submissionIsValid(submission.context[0].value) ? postTweet(serializedTweet, fetchTweets) : false;
  });

  function createTweetElement(tweet) {
      var $tweet = $('<article>', {class: 'tweet'}); 
      var $header = $('<header>');
      var $content = $('<div>', {class: 'content'});
      var $footer = $('<footer>');
      
      $header.append('<img class="avatar" src="' + tweet.user.avatars.regular + '" />');

      $header.append('<span class="name">'+ tweet.user.name +'</span>');
      
      $header.append('<span class="handle">'+ tweet.user.handle +'</span>');

      $content.append('<p></p>').text(tweet.content.text);

      $footer.append('<span></span>').addClass('timestamp').text($.timeago(tweet.created_at));

      $footer.append('<span class="actions">' 
          + ' <a href="#"><i class="fa fa-flag"></i></a>'
          + '<a href="#"><i class="fa fa-retweet"></i></a>'
          + '<a href="#"><i class="fa fa-heart"></i></a>'
      );

      return $tweet.append($header).append($content).append($footer);
  }

  function renderTweets(selector, tweets) {
      // console.log('length: ' + tweets.length);
      for (var i = tweets.length-1; i >= 0; i--) {
          var tweet = tweets[i];
          // console.log(tweet);
          $(selector).append(createTweetElement(tweet));
      }
  }

  function submissionIsValid(submission) {
    if (submission == '') {
      console.warn('CANNOT SUBMIT EMPTY TWEET');
      $('.new-tweet .warn.empty').removeClass('hidden');
      return false;
    } else if (submission.length > 140) {
      console.warn('TWEET BODY IS TOO LONG. MAX 140 CHARS');
      $('.new-tweet .warn.long').removeClass('hidden');
      return false;
    } else {
      return true;
    }
  }

  function postTweet(tweetData, callback) {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData,
      success: function(data, status) {
        console.log("Successfully Posted!", status);
        $('.new-tweet .warn').addClass('hidden');
        callback();
      },
      error: function(error) {      
        console.warn(error.responseText);
      }
    });
  }

  function fetchTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data, status) {
        console.log("Tweets successfully fetched!", status);
        renderTweets('#feed', data);
      },
      error: function(error) {
        console.warn(error.responseText);
      }
    });
  }

  fetchTweets();

}); // end document ready