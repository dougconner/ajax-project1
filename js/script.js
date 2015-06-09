
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var location = street + ", " + city;
    $greeting.text('So, you want to live at ' + location + '?');
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + location;
    var streetReq = '<img class="bgimg" src=' + streetviewUrl + '">';
    console.log(streetReq);
    $body.append(streetReq);

    // NY Times AJAX request

    var nytReq = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' +
      city +
      '&end_date=20120101&api-key=5efb7c1a602e9a6cff740e1f039fc3ce:1:72234776';

    $.getJSON( nytReq, function( data ){
      $nytHeaderElem.text('New York Times Article About ' + city);
      console.log("status = ", data.status);

      var docs = data.response.docs;
      for (var i = 0; i < docs.length; i++) {
        var article = docs[i];
        $nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '">' + article.headline.main +
          '</a>' +
          '</li>');
      }

    }).error(function() {
      $nytHeaderElem.text('New York Times article could not be loaded');
    });



    return false;
}

$('#form-container').submit(loadData);
