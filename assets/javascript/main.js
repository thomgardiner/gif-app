let currentSearchTerm = null;
let amount = 12;
let still = true;
let calledObjs = [];
let offset = 0;

const call = function(t, n){
    let term = t;
    let number = n;
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rK8nzZHZ9ZmLWxuO8plu2NWfBAqELvZP&q=" + term +  "&limit=" + number + "&offset=" + offset + "&rating=G&lang=en";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((function(response){
        console.log(response.data)
        for(i=0; i < response.data.length; i++){
        let url = response.data[i].images.downsized_still.url;
        let element = $("<img>");
        element.attr("src", url);
        element.addClass("gif");
        $("#gif-content").append(element);
        calledObjs.push(response.data[i]);
    }
        offset += 10;
    }))
}

const search = function(){
    currentSearchTerm = $("#search-box").val();
}

const clearSearch = function(){
    $("#search-box").val("");
}

const addButton = function(){
    let newButton = $("<div>");
    newButton.addClass("button");
    newButton.attr("id", currentSearchTerm);
    newButton.text(currentSearchTerm);
    $("#button-wrapper").append(newButton);
}

const clearArray = function(){
    calledObjs = [];
}

const clearOffset = function(){
    offset = 0;
}

$(document).ready(function() {

    $("#search").on("click", function(){
        $("#gif-content").html("");
        clearOffset();
        search();
        call(currentSearchTerm, amount);
        addButton();
        clearSearch();
    })

    $("#more").on("click", function(){
        call(currentSearchTerm, amount);
    })

    $("body").on("click", ".gif", function(){
        let currentURL = this.src;

        let backslashPos = currentURL.lastIndexOf("/");
        let splitURL = currentURL.slice(0, backslashPos);
        let splitURL2 = currentURL.slice(backslashPos + 1);

        if(splitURL2 == "giphy.gif"){
            $(this).attr("src", splitURL + "/giphy-downsized_s.gif" ); 
        }
        else{
            $(this).attr("src", splitURL + "/giphy.gif" );
        }
    }
)

    $("body").on("click", ".button", function(){
        clearOffset();
        $("#gif-content").html("");
        current = this.innerHTML;
        currentSearchTerm = current;
        call(currentSearchTerm, amount);
        clearSearch();

    })

});