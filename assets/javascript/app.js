//Will hold search items to create buttons
//TODO: fill on page load with localStorage JSON saved items.

var sportsItem = ""
var queryLink = '#';
var userQuery = '';

// Firebase
var caroFirebaseConfig = {
  apiKey: "AIzaSyAAuD528OgJy5QRxX2z7kdTIgok_Gwcobs",
  authDomain: "project-one-dff4c.firebaseapp.com",
  databaseURL: "https://project-one-dff4c.firebaseio.com",
  projectId: "project-one-dff4c",
  storageBucket: "project-one-dff4c.appspot.com",
  messagingSenderId: "1062091675299",
  appId: "1:1062091675299:web:1651175bb75de723da5116"
};

// Initialize Firebase
firebase.initializeApp(caroFirebaseConfig);
var db = firebase.database();

// initially hide popup content
$(".popup, .popup-content").hide();

function resetStatsPage() {
  $("#playerTeam").text("");
  $("#playerStats").text("");
  $("#playerPosition").text("");
  $("#playerBio").text("");
  $("#NextGames").empty();
};

function resetInstaPage() {
  $("#posts").empty();
};

//Click event for search button
$("#sportsQuery-submit").on("click", function (event) {
  event.preventDefault();

  let sportsItem = $("#sportsQuery-text").val().trim();
  let instaItem = $("#instaQuery-text").val().trim();

  if (sportsItem === '' || instaItem === '') {
  }
  else {
    // pass to firebase
    db.ref().push({
      userQuery: sportsItem,
      instagram: instaItem,
    });
  }

  //Resets search text
  $("#sportsQuery-text").val("");
  $("#instaQuery-text").val("");
})

// to take in user query on hitting enter
$('#sportsQuery-text').on('keydown', function (event) {

  if (event.keyCode === 13) {

    let sportsItem = $("#sportsQuery-text").val().trim();
    let instaItem = $("#instaQuery-text").val().trim();

    if (sportsItem === '' || instaItem === '') {
    }
    else {
      sportsItem = $("#sportsQuery-text").val().trim();
      // pass to firebase
      db.ref().push({
        userQuery: sportsItem,
        instagram: instaItem,
      });
    }

    //Resets search text
    $("#sportsQuery-text").val("");
    $("#instaQuery-text").val("");
  }
})

// make buttons from database
db.ref().on('child_added', function (data) {

  var dv = data.val();
  let query = dv.userQuery;
  let insta = dv.instagram;
  // pass uppercase name to avatar label
  let labelName = query.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });

  //Creates buttons
  var imgDiv = $('<div class="sports-btn">');
  imgDiv.attr("data-name", query);
  imgDiv.attr('data-insta', insta);

  var sportsBtn = $("<a href=" + queryLink + " class='link'>");

  var image = $('<img src="assets/images/sports-block.jpg" alt="sportsBlock" class="sports-img">');
  var label = $("<div class='label'>" + labelName + "</div>");
  var innerBlock = sportsBtn.append(image).append(label);

  var token = imgDiv.append(innerBlock);
  //Append each button to home page
  $("#buttons").append(token);

}), function (errorHandle) {
  console.log("Errors occured: " + errorHandle.code)
}

// initial button population from firebase
db.ref().on('value', function (data) {

  dv = data.val();

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
  console.log("Errors occured: " + errorHandle.code);
})

$(".close, .popup").on("click", function () {
  $(".popup, .popup-content").fadeOut("slow");
});

// pull sports info from api
function sportsInfo() {

  //Saves search term in variable for queries
  let sportItem = $(this).attr("data-name");
  console.log(sportItem)

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
        $(nextGame).text("Game Date/Time: " + thisEvent.dateEvent + "/" + thisEvent.strTimeLocal);
        $(gameDetails).text("Playing: " + thisEvent.strEvent);
        $("#NextGames").append(nextGame);
        $("#NextGames").append(gameDetails);
      }
    });
    $.ajax({
      "url": "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + playerData.idTeam,
      "method": "GET",
    }).done(function (pasteventresponse) {
      console.log(pasteventresponse)
      for (let i = 0; i < pasteventresponse.results.length; i++) {
        let lastGame = $("<p>");
        let gameDetails = $("<p>");
        let gameScore = $("<p>");
        let thisEvent = pasteventresponse.results[i];
        console.log('thisEvent: ' + thisEvent);
        $(lastGame).text("Game Date/Time: " + thisEvent.dateEvent + "/" + thisEvent.strTimeLocal);
        $(gameDetails).text("Playing: " + thisEvent.strEvent);
        $(gameScore).text("Final Score: " + thisEvent.intHomeScore + " to " + thisEvent.intAwayScore);
        $("#LastGames").append(lastGame);
        $("#LastGames").append(gameDetails);
        $("#LastGames").append(gameScore);
      }
    });
  });
};


// should we set a height limit and make individual columns scrolable so
// content can be seen side by side instead of scrolling past one columns
// content in order to see all of another columns content????????


function instaInfo() {

  let instaItem = $(this).attr("data-insta");
  console.log(instaItem)

  resetInstaPage();

  //pull instagram info from api
  var instaSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=" + instaItem + "&lang=en",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "instagram9.p.rapidapi.com",
      "x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784"
    }
  }

  $.ajax(instaSettings).done(function (response) {
    console.log(response);
    console.log(response.posts);

    let responseName = response.fullName;
    console.log(responseName);

    for (let i = 0; i < response.posts.length; i++) {

      let post = $("<img alt='post " + [i] + "' src=" + response.posts[i].attachments.link + " class='photo'></img>");
      if (response.posts[i].text === null) {
        let caption = $('<p class="photoLabel"></p>');
        $('#posts').append(post).append(caption);
      }
      else {
        let caption = $('<p class="photoLabel">"' + response.posts[i].text + '"</p>');
        $('#posts').append(post).append(caption);
      }      
    }
  })
}

$(document).on("click", ".sports-btn", sportsInfo)
$(document).on("click", ".sports-btn", instaInfo)

