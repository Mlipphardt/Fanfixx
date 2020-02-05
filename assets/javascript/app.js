//Will hold search items to create buttons
//TODO: fill on page load with localStorage JSON saved items.

var sportsItem = ""
var queryLink = '#';
var userQuery = '';

$(".popup, .popup-content").hide();

function resetStatsPage() {
  $("#playerTeam").text("");
  $("#playerStats").text("");
  $("#playerPosition").text("");
  $("#playerBio").text("");
  $("#NextGames").empty();
};

//Click event for search button
$("#sportsQuery-submit").on("click", function (event) {
  event.preventDefault();

  sportsItem = $("#sportsQuery-text").val().trim();

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
      sportsItem = $("#sportsQuery-text").val().trim();
      // pass to firebase
      db.ref().push({ userQuery: sportsItem, });
    }

    //Resets search text
    $("#sportsQuery-text").val("");
  }
})

// passing user queries to firebase to be recalled later
// make buttons from database
db.ref().on('child_added', function (data) {

  var dv = data.val()
  console.log(dv.userQuery)

  //Creates buttons
  var imgDiv = $('<div class="sports-btn">');
  imgDiv.attr("data-name", dv.userQuery);

  var sportsBtn = $("<a href=" + queryLink + " class='link'>");

  var image = $('<img src="assets/images/sports-block.jpg" alt="sportsBlock" class="sports-img">');
  var label = $("<div class='label'>" + dv.userQuery + "</div>");
  var innerBlock = sportsBtn.append(image).append(label);

  var token = imgDiv.append(innerBlock);
  //Append each button to home page
  $("#buttons").append(token);

}), function (errorHandle) {
  console.log("Errors occured: " + errorHandle.code)
}

// initial button population from firebase
db.ref().on('value', function (data) {

  dv = data.val()

  if (data.child('userQuery').exists()) {
    //Creates buttons
    var imgDiv = $('<div class="sports-btn">');
    imgDiv.attr("data-name", dv.userQuery);

    var sportsBtn = $("<a href=" + queryLink + " class='link'>");

    var image = $('<img src="assets/images/sports-block.jpg" alt="sportsBlock" class="sports-img">');
    var label = $("<div class='label'>" + dv.userQuery + "</div>");
    var innerBlock = sportsBtn.append(image).append(label);

    var token = imgDiv.append(innerBlock);
    //Append each button to home page
    $("#buttons").append(token);
  }
}, function (errorHandle) {
  console.log("Errors occured: " + errorHandle.code)
})

$(".close, .popup").on("click", function () {
  $(".popup, .popup-content").fadeOut("slow");
});


function sportsInfo() {

  //Saves search term in variable for queries
  let sportItem = $(this).attr("data-name");
  resetStatsPage();

  $(".popup, .popup-content").fadeIn("slow");


  //TODO: ajax requests will go here
  $.ajax({
    "url": "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + sportItem,
    "method": "GET",
  }).done(function (response) {
    let playerData = response.player[0];
    console.log(playerData);
    $("#playerTeam").text("Team: " + playerData.strTeam)
    $("#playerPosition").text("Position: " + playerData.strPosition);
    $("#playerBio").text("Bio: " + playerData.strDescriptionEN)
    $.ajax({
      "url": "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + playerData.idTeam,
      "method": "GET",
    }).done(function (teamresponse) {
      console.log(teamresponse)
      for (let i = 0; i < teamresponse.events.length; i++) {
        let nextGame = $("<p>");
        let gameDetails = $("<p>");
        let thisEvent = teamresponse.events[i];
        console.log(thisEvent);
        $(nextGame).text("Game Date/Time: " + thisEvent.dateEvent + "/" + thisEvent.strTimeLocal);
        $(gameDetails).text("Playing: " + thisEvent.strEvent);
        $("#NextGames").append(nextGame);
        $("#NextGames").append(gameDetails);
      }
    });

  });

};



$(document).on("click", ".sports-btn", sportsInfo)

