// array of topics
var searchTerms = ["trending", "animals", "games"];


function displayGifs(){
    var searchTerm = $(this).attr("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=gqvHLyAWvH6hlE0ZWRLyC37I67jzXvC7";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.data[0].images.original.url);
        // create a div to store all the images
        var imageDiv = $("<div class='images'>");
        // store the rating
        var rating = response.data[0].rating;
        // create an element to display the rating
        var pOne = $("<h3>").text("Rating: " + rating);
        // display the rating
        imageDiv.append(pOne)

        // retrieve URL for still gif
        var gifURL = response.data[0].images.original_still.url;

        // create an element to hold the gif
        var gif = $("<img>").attr("src", gifURL);
        imageDiv.append(gif);

        $("#gif-view").prepend(imageDiv);
        
    })
}

function renderButtons(){
    // delete all previous search terms
    $("#search-buttons").empty();
    // Loop through array of search terms
    for (var i = 0; i < searchTerms.length; i++) {
        // create a button for each term in the array
        a = $("<button>");
        // add class term-button
        a.addClass("term-button");
        // add attribute name
        a.attr("name", searchTerms[i]);
        // provide button text
        a.text(searchTerms[i]);
        $("#search-buttons").append(a);
    }
}

$("add-image").click(function(event){
    event.preventDefault();
    // receive the input from the textbox
    var searchTerm = $("#image-input").val().trim();
    // add image from the textbox to the array
    searchTerms.push(searchTerm);
    renderButtons();
})

$(document).on("click", ".term-button", displayGifs);

renderButtons();

