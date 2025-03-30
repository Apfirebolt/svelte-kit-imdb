// src/routes/api/playlist/+server.ts
import { json } from "@sveltejs/kit";
import { Playlist } from "$lib/models/Playlist";
import validateToken from "$lib/middleware/tokenValidation";
import User from "$lib/models/User";
import connectDB from "$lib/server/db";

export async function POST({ request }: { request: Request }) {
  try {
    await connectDB();

    const validationResult = await validateToken(request);

    if (validationResult) {
      // If validationResult is a Response object, return it
      return validationResult;
    }

    const body = await request.json();
    const { userId, ...playlistData } = body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const newPlaylist = new Playlist({ ...playlistData, user: userId });
    await newPlaylist.save();

    return json({ success: true, message: "Playlist created successfully" });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET({ url }: { url: URL }) {
  try {
    await connectDB();

    const id = url.searchParams.get("id");

    if (id) {
      const playlist = await Playlist.findById(id).populate("user");

      if (!playlist) {
        return json(
          { success: false, message: "Playlist not found" },
          { status: 404 }
        );
      }
      return json({ success: true, data: playlist });
    } else {
      const playlists = await Playlist.find().populate("user");
      return json({ success: true, data: playlists });
    }
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT({ request }: { request: Request }) {
  try {
    await connectDB(); // Connect to MongoDB

    const validationResult = await validateToken(request);

    if (validationResult) {
      // If validationResult is a Response object, return it
      return validationResult;
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("user");

    if (!updatedPlaylist) {
      return json(
        { success: false, message: "Playlist not found" },
        { status: 404 }
      );
    }

    return json({
      success: true,
      message: "Playlist updated successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    console.error("Error updating playlist:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE({ url }: { url: URL }) {
  try {
    await connectDB(); // Connect to MongoDB

    const validationResult = await validateToken(request);

    if (validationResult) {
      // If validationResult is a Response object, return it
      return validationResult;
    }

    const id = url.searchParams.get("id");
    if (!id) {
      return json(
        { success: false, message: "Playlist ID is required" },
        { status: 400 }
      );
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(id);
    if (!deletedPlaylist) {
      return json(
        { success: false, message: "Playlist not found" },
        { status: 404 }
      );
    }

    return json({ success: true, message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
