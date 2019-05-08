const ombdUrl= "http://www.omdbapi.com/?i=tt3896198&apikey=76639187";
const ombdApiKey = 76639187;
// format for search http://www.omdbapi.com/?t=Gardians+of+the+Galaxy&y=2012


module.exports = {
	getMovies: () => {
		return fetch('/api/movies')
			.then(response => response.json());
	},
	getMoreMovies: () => {
		return fetch(ombdUrl)
			.then(response => response.json())
	},
	searchMovies: () => {

	}
};
