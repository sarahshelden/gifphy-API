$( document ).ready(function() {
    // array of moods
    var moods = ["happy", "sad", "angry", "anxious", "excited", "love", "tired", "beautiful", "smart", "funny"];
    function reDraw(){
      $("#gifButtons").empty()
        for (i=0; i < moods.length; i++) {
            $("#gifButtons").append(
                $("<button>").attr("data-mood", moods[i]).text(moods[i]).addClass("btn btn-primary gifButton")
            )
        }
    }
    reDraw()


    $(document).on("click", ".gifButton" ,function () {
        var mood = $(this).attr("data-mood");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            mood + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log('button clicked');
        console.log("mood", mood)
        console.log("queryURL", queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                    console.log("response", results);

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var moodImage = $("<img>");
                    moodImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(moodImage);
                    console.log("prepending the dif")
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    });

    $("#addGif").on("click", function () {
      var addMood =  $("#mood-input").val().trim()

        console.log("mood added", addMood)

        moods.push(addMood)
        console.log("moods", moods)
        reDraw()
    })

    $("#removeGif").on("click", function() {
        console.log("moods", moods)
        moods.pop()
        console.log("moods2", moods)
        reDraw()
    })

});