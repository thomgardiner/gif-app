let currentSearchTerm = null;
let amount = 12;
let still = true;
let calledObjs = [];
let offset = 0;

//main function
const call = function(t, n){
    let term = t;
    let number = n;
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rK8nzZHZ9ZmLWxuO8plu2NWfBAqELvZP&q=" + term +  "&limit=" + number + "&offset=" + offset + "&rating=G&lang=en";
       //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((function(response){
        for(i=0; i < response.data.length; i++){
        let url = response.data[i].images.downsized_still.url;
        let container = $("<div>");
        container.addClass("gif-container");
        //create gif element
        let element = $("<img>");
        element.attr("src", url);
        element.attr("rating", response.data[i].rating);
        element.attr("alt", response.data[i].rating);
        element.addClass("gif");
        calledObjs.push(response.data[i]);
        //create rating element
        let rating = $("<div>");
        rating.text(response.data[i].rating);
        rating.addClass("rating");
        //append newly created elements
        container.append(element);
        container.append(rating);
        $("#gif-content").append(container);
    }
        //increase offset value to ensure a new gifs are called if function is called again
        offset += 10;
    }))
}

const search = function(){
    currentSearchTerm = $("#search-box").val();
}

const clearSearch = function(){
    $("#search-box").val("");
}

//takes searched term and create / append a new button for it
const addButton = function(){
    let newButton = $("<div>");
    newButton.addClass("button pointer");
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

const addMoreBtn = function(){
    let button = $("<div>");
    button.addClass("col-md-2 offset-md-5");
    button.attr("id", "more-wrapper");
    button.html('<img class="pointer more" id="created-more" src="assets/images/icons/plus.png">');
    $('#content-wrapper').append(button);
}

const clearMoreBtn = function(){
    $("#more-wrapper").remove();
}

$(document).ready(function() {
        //search on icon click
    $("#search").on("click", function(){
        clearOffset();
        clearMoreBtn();
        let temp = currentSearchTerm;
        search();
        if(currentSearchTerm.length > 0){
        $("#gif-content").html("");
        call(currentSearchTerm, amount);
        addButton();
        addMoreBtn();
        clearSearch();
        }
        else{
            currentSearchTerm = temp;
        }
    })
        //add more gifs without clearing current
    $("body").on("click", '.more', function(){
        call(currentSearchTerm, amount);
    })
        
    //start/stop gif loop logic
    
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

    //logic for pinned/newly created search buttons
    $("body").on("click", ".button", function(){
        clearOffset();
        clearMoreBtn();
        addMoreBtn();
        current = this.innerHTML;
        currentSearchTerm = current;
        $("#gif-content").html("");
        call(currentSearchTerm, amount);
        clearSearch();

    })

    $('body').keypress(function(event){
        let pressed = event.key;
        if(pressed == "Enter"){
            clearOffset();
            clearMoreBtn();
            let temp = currentSearchTerm;
            search();
            if(currentSearchTerm.length > 0){
            $("#gif-content").html("");
            call(currentSearchTerm, amount);
            addButton();
            addMoreBtn();
            clearSearch();
            }
            else{
                currentSearchTerm = temp;
            }
        }
    })
});
