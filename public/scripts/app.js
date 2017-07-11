/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {


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
        console.log('length: ' + tweets.length);
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            console.log(tweet);
            $(selector).append(createTweetElement(tweet));
        }
    }

    (renderTweets('#feed', data));

}); // end document ready