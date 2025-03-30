import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    createdAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);

export { Playlist };