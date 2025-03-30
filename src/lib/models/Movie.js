import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: String,
    type: String,
    releaseYear: Number,
    imdbID: String,
    poster: String,
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

export default Movie;