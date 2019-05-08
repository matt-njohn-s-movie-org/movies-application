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
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
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
