var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

/*Connect to Mongo DB*/
mongoose.connect("mongodb://localhost/bookstore");
var db = mongoose.connection;

app.get("/", function(request, response) {
	response.send("Please use /api/books");
});

app.get("/api/genres", function(request, response) {
	Genre.getGenres(function(err, genres){
		if(err) {
			throw err;
		}
		response.json(genres);
	});
});

app.post("/api/genres", function(request, response) {
	var genre = request.body;
	Genre.addGenre(genre, function(err, genre){
		if(err) {
			throw err;
		}
		response.json(genre);
	});
});

app.put("/api/genres/:_id", function(request, response) {
	var id = request.params._id;
	var genre = request.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err) {
			throw err;
		}
		response.json(genre);
	});
});

app.delete("/api/genres/:_id", function(request, response) {
	var id = request.params._id;
	Genre.deleteGenre(id, function(err, genre){
		if(err) {
			throw err;
		}
		response.json(genre);
	});
});

app.get("/api/books", function(request, response) {
	Book.getBooks(function(err, books){
		if(err) {
			throw err;
		}
		response.json(books);
	});
});

app.post("/api/books", function(request, response) {
	var book = request.body;
	Book.addBook(book, function(err, book){
		if(err) {
			throw err;
		}
		response.json(book);
	});
});

app.get("/api/books/:_id", function(request, response) {
	Book.getBookById(request.params._id, function(err, book){
		if(err) {
			throw err;
		}
		response.json(book);
	});
});
app.put("/api/books/:_id", function(request, response) {
	var id = request.params._id;
	var book = request.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err) {
			throw err;
		}
		response.json(book);
	});
});

app.delete("/api/books/:_id", function(request, response) {
	var id = request.params._id;
	Book.deleteBook(id, function(err, book){
		if(err) {
			throw err;
		}
		response.json(book);
	});
});

app.get("/api/genres/:_id", function(request, response) {
	Genre.getGenreById(request.params._id, function(err, genre){
		if(err) {
			throw err;
		}
		response.json(genre);
	});
});


app.listen(3000);
console.log("Server is running....");