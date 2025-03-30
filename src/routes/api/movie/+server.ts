// src/routes/api/movie/+server.ts
import { json } from "@sveltejs/kit";
import Movie from "$lib/models/Movie";
import type { MovieDetails } from "$lib/types/Movie";
import connectDB from "$lib/server/db";


export async function POST({ request }: { request: Request }) {
  try {
    await connectDB(); // Connect to MongoDB

    const body: MovieDetails = await request.json();
    const newMovie = new Movie(body);
    await newMovie.save();

    return json({ success: true, message: "Movie created successfully" });
  } catch (error) {
    console.error("Error creating movie:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET({ url }: { url: URL }) {
  try {
    await connectDB();

    const id = url.searchParams.get("id");

    if (id) {
      const movie = await Movie.findById(id);

      if (!movie) {
        return json(
          { success: false, message: "Movie not found" },
          { status: 404 }
        );
      }
      return json({ success: true, data: movie });
    } else {
      const movies = await Movie.find();
      return json({ success: true, data: movies });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT({ request }: { request: Request }) {
  try {
    await connectDB(); // Connect to MongoDB

    const body: Partial<MovieDetails> & { id: string } = await request.json();
    const { id, ...updateData } = body;

    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedMovie) {
      return json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE({ url }: { url: URL }) {
  try {
    await connectDB(); // Connect to MongoDB

    const id = url.searchParams.get("id");
    if (!id) {
      return json(
        { success: false, message: "Movie ID is required" },
        { status: 400 }
      );
    }

    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
