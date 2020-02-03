
//Will hold search items to create buttons
//TODO: fill on page load with localStorage JSON saved items.

sports = [];

//Click event for search button
$("#sportsQuery-submit").on("click", function(){
    event.preventDefault();
    let sportsItem = $("#sportsQuery-text").val().trim()
    sports.push(sportsItem);
    //Resets search text
    $("#sportsQuery-text").val("");
    //Creates buttons
    createButtons();
})

//Function for creating buttons for home page
function createButtons() {

    //Empties present buttons so they don't double up
    $("#buttons").empty();
    // Loops through the array of sports search terms, make button for each
    for (var i = 0; i < sports.length; i++) {

      var sportsBtn = $("<button>");
      sportsBtn.addClass("sports-btn");
      sportsBtn.attr("data-name", sports[i]);
      sportsBtn.text(sports[i]);
      
      //Append each button to home page
      $("#buttons").append(sportsBtn);
    }
  }

  function sportsInfo(){

      //Saves search term in variable for queries
      let sportItem = $(this).attr("data-name");
      
      //Redirects user to info.html page
      window.location.replace("./info.html");

      //TODO: ajax requests will go here


      
  }

  $(document).on("click", ".sports-btn", sportsInfo)


