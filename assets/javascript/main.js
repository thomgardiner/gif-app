let currentSearchTerm = null;
let amount = 5;

const call = function(t, n){
    let term = t;
    let number = n;
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rK8nzZHZ9ZmLWxuO8plu2NWfBAqELvZP&q=" + term +  "&limit=" + number + "&offset=0&rating=G&lang=en";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((function(response){
        console.log(response.data)
        $("#test").html("");
        for(i=0; i < response.data.length; i++){
        let url = response.data[i].images.downsized_large.url;
        let element = $("<img>");
        element.attr("src", url);
        element.addClass("gif");
        $("#test").append(element);
    }
    }))
}

const search = function(){
    currentSearchTerm = $("#search-box").val();
    console.log(currentSearchTerm);
}

const clearSearch = function(){
    $("#search-box").val("");
}

$(document).ready(function() {

    $("#search").on("click", function(){
        search();
        call(currentSearchTerm, amount);
        clearSearch();
    })


});