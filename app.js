$(document).ready(function() {

var topics = ['ocean', 'octopus', 'shark', 'whale', 'fish']

function buttonCreate(){
    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++){
        var button = $('<button>')
        button.attr('class', 'big-blue')
        button.attr('id', i)
        button.attr('value', topics[i])
        // button.attr('data-state', "still")
        button.html(topics[i])
        $('.buttons').append(button);
    };
}

buttonCreate()


$(".buttons").on("click", "button", function() {
    var search = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=uxenVLMtzW9dhKZjDpBXnohmhqnmJOpt&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })

    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            // gifImage.attr("value", results[i].images.fixed_height_still.url);
            // gifImage.addclass("item");
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $(".video").prepend(gifDiv);
            console.log(results);
            }
        }
    })
})

$(".video").on("click","img", function() {
    // results = response.data;
    var state = $(this).attr("src");
    console.log(state);
    
    if (state === $(this).data("still")) {
      $(this).attr("src", $(this).data("animate"));
    //   $(this).data("animate");
    } else {
      $(this).attr("src", $(this).data("still"));
    //   $(this).attr("data-state", "still");
    }
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    topics.push(movie);
    buttonCreate();
    $("#movie-input").val("");
    // call();
  });

});