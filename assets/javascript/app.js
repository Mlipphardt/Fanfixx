
//Will hold search items to create buttons
//TODO: fill on page load with localStorage JSON saved items.

var sports = [];
var sportsItem = $("#sportsQuery-text").val().trim();
var queryLink = '#';
var userQuery = '';

//Click event for search button
$("#sportsQuery-submit").on("click", function (event) {
  event.preventDefault();

  sports.push(sportsItem);

  if (sportsItem === '') {
    //use modular but using alert for now
    alert("Please Enter a Player or Team Name");
  }
  else {
    // pass to firebase
    db.ref().push({ userQuery: sportsItem, });
  }

  //Resets search text
  $("#sportsQuery-text").val("");
})

// to take in user query on hitting enter
$('#sportsQuery-text').on('keydown', function (event) {

  if (event.keyCode === 13) {

    if (sportsItem === '') {
      //use modular but using alert for now
      alert("Please Enter a Player or Team Name");
    }
    else {
      // pass to firebase
      db.ref().push({ userQuery: sportsItem, });

      sports.push(sportsItem);
    }

    //Resets search text
    $("#sportsQuery-text").val("");
  }
})

// passing user queries to firebase to be recalled later
// make buttons from database
db.ref().on('child_added', function (data) {

  dv = data.val()

  //Creates buttons
  createButtons();

}), function (errorHandle) {
  console.log("Errors occured: " + errorHandle.code)
}

//Function for creating buttons for home page
function createButtons() {

  //Empties present buttons so they don't double up
  $("#buttons").empty();
  // Loops through the array of sports search terms, make button for each
  for (var i = 0; i < sports.length; i++) {

    var imgDiv = $('<div class="sports-btn">');
    imgDiv.attr("data-name", sports[i]);

    var sportsBtn = $("<a href=" + queryLink + " class='link'>");

    var image = $('<img src="assets/images/sports-block.jpg" alt="sportsBlock" class="sports-img">');
    var label = $("<div class='label'>" + sports[i] + "</div>");
    var innerBlock = sportsBtn.append(image).append(label);

    var token = imgDiv.append(innerBlock);
    //Append each button to home page
    $("#buttons").append(token);
  }
}

function sportsInfo() {

  //Saves search term in variable for queries
  let sportItem = $(this).attr("data-name");

  //TODO: ajax requests will go here
  $.ajax({
    "url": "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + sportItem,
    "method": "GET",
  }).done(function (response) {
    console.log(response);
  });

  //Redirects user to info.html page
  window.location.replace("./info.html");

};

$(document).on("click", ".sports-btn", sportsInfo)

