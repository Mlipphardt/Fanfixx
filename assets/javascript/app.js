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
$(".popup-content").hide();

function resetStatsPage() {
  $("#playerName").text();
  $("#playerName").empty();
  $("#playerTeam").text("");
  $("#playerStats").text("");
  $("#playerPosition").text("");
  $("#playerBio").text("");
  $("#NextGames").empty();
  $("#LastGames").empty();
};

function resetInstaPage() {
  $("#posts").empty();
};

//Click event for search button
$("#sportsQuery-submit").on("click", function (event) {
  event.preventDefault();

  let sportsItem = $("#sportsQuery-text").val().trim();
  let instaItem = $("#instaQuery-text").val().trim();

  /* //pull instagram info from api
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

    let avatar = response.avatar

    if (sportsItem === '' || instaItem === '') {
    }
    else {
      // pass to firebase
      db.ref().push({
        userQuery: sportsItem,
        instagram: instaItem,
        avatar: avatar,
      });
    }
    //Resets search text
    $("#sportsQuery-text").val("");
    $("#instaQuery-text").val("");
  })*/
})


// to take in user query on hitting enter
$('#sportsQuery-text').on('keydown', function (event) {

  if (event.keyCode === 13) {

    let sportsItem = $("#sportsQuery-text").val().trim();
    let instaItem = $("#instaQuery-text").val().trim();

   /* //pull instagram info from api
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

       let avatar = response.avatar

       if (sportsItem === '' || instaItem === '') {
       }
       else {
         // pass to firebase
         db.ref().push({
           userQuery: sportsItem,
           instagram: instaItem,
           avatar: avatar,
         });
       }

       //Resets search text
       $("#sportsQuery-text").val("");
       $("#instaQuery-text").val("");
     })*/
  }
})

// make buttons from database
db.ref().on('child_added', function (data) {

  var dv = data.val();
  let query = dv.userQuery;
  let insta = dv.instagram;
  let avatar = dv.avatar;

  // pass uppercase name to avatar label
  let labelName = query.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });

  //Creates buttons
  var imgDiv = $('<div class="sports-btn">');
  imgDiv.attr("data-name", query);
  imgDiv.attr('data-insta', insta);

  var sportsBtn = $("<a href=" + queryLink + " class='link'>");

  var image = $('<img src="' + avatar + '" alt="sportsBlock" class="avatar-img">');
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
  let query = dv.userQuery;
  let insta = dv.instagram;
  let avatar = dv.avatar;

  if (data.child('userQuery').exists()) {
    //Creates buttons
    var imgDiv = $('<div class="sports-btn">');
    imgDiv.attr("data-name", query);
    imgDiv.attr('data-insta', insta);

    var sportsBtn = $("<a href=" + queryLink + " class='link'>");

    var image = $('<img src="' + avatar + '" alt="sportsBlock" class="avatar-img">');
    var label = $("<div class='label'>" + query + "</div>");
    var innerBlock = sportsBtn.append(image).append(label);

    var token = imgDiv.append(innerBlock);
    //Append each button to home page
    $("#buttons").append(token);
  }
}, function (errorHandle) {
  console.log("Errors occured: " + errorHandle.code);
})

//Close button for popup, has a slow fade-out animation.
$(".close").on("click", function () {
  $(".popup-content").fadeOut("slow");
});

// pull sports info from api
function sportsInfo() {

  //Saves search term in variable for queries
  let sportItem = $(this).attr("data-name");
  console.log(sportItem)

  resetStatsPage();

  $(".popup-content").fadeIn("slow");

  //AJAX requests for data
  $.ajax({
    "url": "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + sportItem,
    "method": "GET",
  }).done(function (response) {

    //If multiple players are found, will display to user in popup
    if (response.player.length > 1) {
      console.log(response.player)
      let didyoumean = $("<p> Did you mean... </p>")
      $("#playerName").append(didyoumean);
      for (let i = 0; i < response.player.length; i++) {
        let foundplayer = $("<p>");
        $(foundplayer).addClass("player-suggestion");
        //When option clicked, data-name will be pulled to get exact ID for request.
        let playerData = response.player[i];
        $(foundplayer).attr("data-name", playerData.idPlayer);
        $(foundplayer).text(playerData.strPlayer + " of the " + playerData.strTeam + "?");
        $("#playerName").append(foundplayer);
      }
    } else {

      let playerData = response.player[0];
      $("#playerTeam").text("Team: " + playerData.strTeam)
      $("#playerPosition").text("Position: " + playerData.strPosition);
      $("#playerBio").text("Bio: " + playerData.strDescriptionEN)
      $.ajax({
        "url": "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + playerData.idTeam,
        "method": "GET",
      }).done(function (teamresponse) {
        console.log(teamresponse)
        $("#NextGames").append("<p>Next games...</p>");
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
        $("#LastGames").append("<p>Last games...</p>");
        for (let i = 0; i < pasteventresponse.results.length; i++) {
          let lastGame = $("<p>");
          let gameDetails = $("<p>");
          let gameScore = $("<p>");
          let thisEvent = pasteventresponse.results[i];
          console.log(thisEvent);
          $(lastGame).text("Game Date/Time: " + thisEvent.dateEvent + "/" + thisEvent.strTimeLocal);
          $(gameDetails).text("Playing: " + thisEvent.strEvent);
          $(gameScore).text("Final Score: " + thisEvent.intHomeScore + " to " + thisEvent.intAwayScore);
          $("#LastGames").append(lastGame);
          $("#LastGames").append(gameDetails);
          $("#LastGames").append(gameScore);
        }
      });
    };

  });
};


// should we set a height limit and make individual columns scrolable so
// content can be seen side by side instead of scrolling past one columns
// content in order to see all of another columns content????????


function instaInfo() {

  let instaItem = $(this).attr("data-insta");
  console.log(instaItem)

  resetInstaPage();

  /*//pull instagram info from api
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
   })*/
}

function playerConfirmation() {

  //Saves search term in variable for queries
  let sportItem = $(this).attr("data-name");
  console.log(sportItem);
  resetStatsPage();

  //AJAX requests for data
  $.ajax({
    "url": "https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=" + sportItem,
    "method": "GET",
  }).done(function (response) {
    console.log(response)
    let playerData = response.players[0];
    $("#playerTeam").text("Team: " + playerData.strTeam)
    $("#playerPosition").text("Position: " + playerData.strPosition);
    $("#playerBio").text("Bio: " + playerData.strDescriptionEN)
    $.ajax({
      "url": "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + playerData.idTeam,
      "method": "GET",
    }).done(function (teamresponse) {
      console.log(teamresponse)
      $("#NextGames").append("<p>Next games...</p>");
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
      $("#LastGames").append("<p>Last games...</p>");
      for (let i = 0; i < pasteventresponse.results.length; i++) {
        let lastGame = $("<p>");
        let gameDetails = $("<p>");
        let gameScore = $("<p>");
        let thisEvent = pasteventresponse.results[i];
        console.log(thisEvent);
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


$(document).on("click", ".sports-btn", sportsInfo)
$(document).on("click", ".sports-btn", instaInfo)

$(document).on("click", ".player-suggestion", playerConfirmation)


