// sports db api
/*
var sportsDBSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://thesportsdb.p.rapidapi.com/1/eventstv.php?c=TSN_1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "thesportsdb.p.rapidapi.com",
		"x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784"
	}
}

$.ajax(sportsDBSettings).done(function (response) {
	console.log(response);
});*/

// instagram api
/*
var instaSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=nasa&lang=en",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "instagram9.p.rapidapi.com",
		"x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784"
	}
}

$.ajax(instaSettings).done(function (response) {
	console.log(response);
});*/

// var sportsDBSettings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://thesportsdb.p.rapidapi.com/1/eventstv.php?c=TSN_1",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "thesportsdb.p.rapidapi.com",
// 		"x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784"
// 	}
// }

// $.ajax(sportsDBSettings).done(function (response) {
// 	console.log(response);
// });

// instagram api
// var instaSettings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=nasa&lang=en",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "instagram9.p.rapidapi.com",
// 		"x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784"
// 	}
// }

// $.ajax(instaSettings).done(function (response) {
// 	console.log(response);
// });

// Carolyn Firebase
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