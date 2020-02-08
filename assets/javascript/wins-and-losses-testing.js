let countedGames = 0;

$.ajax({
    "url": "https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4387&s=1819",
    "method": "GET",
  }).done(function (response) {
    console.log(response)
    seasonGames = response.events
    for (let i = 0; i < seasonGames.length; i++) {
      if (seasonGames[i].strHomeTeam == "Los Angeles Lakers" || seasonGames[i].strAwayTeam =="Los Angeles Lakers"){
        countedGames++
        console.log(seasonGames[i]);
      } else{
        console.log("nah");
      }
    }
    console.log(countedGames);
});

// Lakers League 
//ID:4387