/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from 'jquery';
sayHello('World');

// on load we want a load screen to appaer
$("body").append("<div id='loading'><h1> PAGE LOADING</h1></div>");
$("#loading").css("height", "100%", "width ", "100%");

/**
 * require style imports
 */
const {getMovies, getMoreMovies} = require('./api.js');

getMovies().then((movies) => {
	console.log('Here are all the movies:');
	movies.forEach(({title, rating, id}) => {
		console.log(`id#${id} - ${title} - rating: ${rating}`);
		$(".sub-container ").append(`<div class="mov-card" id=" ${id} "> <h3> Movie Title: ${title} </h3> <br> Movie Rating: ${rating} </div> `)
	});
}).then(() => {
	$('#loading').addClass('invisible')
}).then(()=>{
	$('.container').removeClass('invisible')
} )
	.catch((error) => {
		alert('Oh no! Something went wrong.\nCheck the console for details.')
		console.log(error);
	});

getMoreMovies().then((data) => {
	console.log(data);
});

// function that when you press a button it will load the data from Title input form and Rating
// number and parse it to db.json, and dynamically create entry at the same time.

