// array of topics
var searchTerms = ["drinks", "animals", "games", "food"];


function displayGifs(){
    var searchTerm = $(this).attr("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=gqvHLyAWvH6hlE0ZWRLyC37I67jzXvC7&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        for(var g = 0; g < response.data.length; g++){
            // console.log(response.data[g].images.original.url);
            // create a div to store all the images
            var imageDiv = $("<div class='images'>");
            // store the rating
            var rating = response.data[g].rating;
            // create an element to display the rating
            var hThree = $("<h3>").text("Rating: " + rating);
            // display the rating
            imageDiv.append(hThree);
    
            // retrieve URL for still gif
            var gifURL = response.data[g].images.original_still.url;
            var gifURLAnimated = response.data[g].images.original.url;
            console.log(gifURLAnimated);
    
            // create an element to hold the gif
            var gif = $("<img>").attr("data-still", gifURL).attr("data-animate", gifURLAnimated).attr("src", gifURL).attr("data-state", "still")
            
            imageDiv.append(gif);
    
            $("#gif-view").prepend(imageDiv);

            gif.click(function(){
                var state = $(this).attr("data-state");
                if (state === "still"){
                    dataAnimate = $(this).attr("data-animate");
                    $(this).attr("src", dataAnimate).attr("data-state", "animate")
                }
                if (state === "animate"){
                    dataStill = $(this).attr("data-still");
                    $(this).attr("src", dataStill).attr("data-state", "still")
                }

            })
        }
        
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

$("#add-image").click(function(event){
    event.preventDefault();
    // receive the input from the textbox
    var searchTerm = $("#image-input").val().trim();
    // add image from the textbox to the array
    searchTerms.push(searchTerm);
    renderButtons();
})

$(document).on("click", ".term-button", displayGifs);


renderButtons();

