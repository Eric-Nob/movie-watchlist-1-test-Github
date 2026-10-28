import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$app/env/private';

const client = new MongoClient(DB_URI);
await client.connect();

const db = client.db('ScreenStackDB');

// Alle Filme laden
async function getMovies() {
    const collection = db.collection('movies');
    const query = {};

    const movies = await collection.find(query).toArray();

    movies.forEach(movie => {
        movie._id = movie._id.toString();
    });

    return movies;
}

// Einen einzelnen Film laden
async function getMovie(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const collection = db.collection('movies');
    const query = {
        _id: new ObjectId(id)
    };

    const movie = await collection.findOne(query);

    if (movie) {
        movie._id = movie._id.toString();
    }

    return movie;
}

// Einen neuen Film speichern
async function createMovie(movie) {
    const collection = db.collection('movies');

    let poster = movie.poster;

    if (!poster) {
        poster = '/images/placeholder.jpg';
    }

    const newMovie = {
        title: movie.title,
        year: movie.year,
        length: movie.length,
        poster: poster,
        actors: [],
        watchlist: false
    };

    const result = await collection.insertOne(newMovie);

    return result.insertedId.toString();
}

// Einen Film löschen
async function deleteMovie(id) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const collection = db.collection('movies');
    const query = {
        _id: new ObjectId(id)
    };

    const result = await collection.deleteOne(query);

    return result.deletedCount === 1;
}

export default {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie
};