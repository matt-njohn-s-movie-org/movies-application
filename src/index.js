/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from 'jquery';

sayHello('World');

// on load we want a load screen to appear
$("body").append(`<div <h1 data-text=\"It's loading…\"></h1>`);// <div class="sk-folding-cube">/<div id='loading'><h1> PAGE LOADING</h1></div>
$("#loading").css("height", "100%", "width ", "100%",)
	;

/**
 * require style imports
 */
const {getMovies, getMoreMovies} = require('./api.js');

getMovies().then((movies) => {
	console.log('Here are all the movies:');
	movies.forEach(({title, rating, id}) => {
		console.log(`id#${id} - ${title} - rating: ${rating}`);
		$(".sub-container ").append(`<div class="mov-card col-4 p-3 card m-auto" id=" ${id} "> <h3> Movie Title: ${title} </h3> <br> Movie Rating: ${rating} <br> 
   	    <button type="button" class="deleteButton" id="${id}" name="${title}">Delete Movie</button>	
   	    <button type="button" class="editButton" id="${id}" name="${title}">Edit Movie</button>
   	    </div> `)
	});
}).then(() => {
	$('#loading').addClass('invisible')
}).then(() => {
	$('.container').removeClass('invisible')
})
	.catch((error) => {
		alert('Oh no! Something went wrong.\nCheck the console for details.');
		console.log(error);
	});

getMoreMovies().then((data) => {
	console.log(data);
});

// function that when you press a button it will load the data from Title input form and Rating
// number and parse it to db.json, and dynamically create entry at the same time.

//JQuery

//On submit logs the rating and movie title
//takes the value of the star and movie title and puts it into an object
$(document).ready(function () {
	$('#mov-submit').click(function (five) {
		$('input').ready(function () {
			// get input values and place them in variables.
			const movTitle = $("#mov-title").val();
			//console.log(movTitle);
			const rating = $(".radInput:checked").val();
			//console.log(rating);

			const movieLength = getMovies().then(movie => {
				//console.log(`this is the data being passed ${movie}`);

				//console.log(`id : ${movie.length}`);
				return `id : ${movie.length}`
			}).then(movID => {

				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"title": movTitle,
						"rating": rating
					})
				};
				fetch(`/api/movies`, options).then((data) => {
					//console.log(`new data id#${movID} - ${movTitle} - rating: ${rating}`);

					$(".sub-container").append(`<div class="mov-card col-4 p-3 card m-auto" id="${movID}"> <h3> Movie 
					Title: ${movTitle}</h3> <br> Movie Rating: ${rating} <br>  
					<button type="button" id="${movID}" class="deleteButton" >Delete Movie</button> </div>`)
					//$(".sub-container ").append(`<div class="mov-card" id=" ${movID} "> <h3>
					// Movie Title: ${movTitle} </h3> <br> Movie Rating: ${rating} </div> `)
				})
			})


			//const movPost = { "title" : movTitle , "rating"}

		});

	});


});


$(document).on("click", ".deleteButton", data => {
	console.log(data.target.name);
	const movName = data.target.name;
	const movID = data.target.id;
	console.log(movID);
	const options = {
		method: 'DELETE',
		success: function (result) {
			// Do something with the result
			console.log(`${movName} has been deleted`);
			location.reload();
		}
	};
	fetch(`/api/movies/${movID}`, options).then(data=>{console.log(data.json())})
});


$(document).on("click", ".editButton", data => {
	console.log(data.target.name);
	const movName = data.target.name; // finding the movie in json that we are editing
	const movID = data.target.id; // obtaining id of said movie
	let title = prompt( "Edit title:"); // allowing user to input data to edit
	let rating = prompt("Edit Rating"); // allowing user to input data to edit
	let genre = prompt ("Edit Genre"); // allowing user to input data to edit
	//if (edTitle == null || edTitle == "") { return;} else {edTitle = ` "title" :
	// ${edTitle}`}// formatting strings to add to object
	//if (edRating == null || edRating == "") { return;} else { edRating = ` "rating" :
	// ${edRating} `}// formatting strings to add to object
	//if (edGenre == null || edGenre == "") { return;} else { edGenre = `"genre" :
	// ${edGenre}`}// formatting strings to add to object
		//console.log(movID);
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title,
			rating,
			genre

		})
	};
	fetch(`/api/movies/${movID}`, options).then(data=>{console.log(data.json())})
});