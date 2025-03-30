// src/routes/api/login/+server.ts
import { json } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private"; // Correct import
import User from "$lib/models/User";
import connectDB from "$lib/server/db";
import type { RequestHandler } from "@sveltejs/kit";

const COOKIE_NAME = "user";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    await connectDB(); // Connect to MongoDB

    const body = (await request.json()) as { email: string; password: string }; // Define the expected shape of the request body

    // Find the user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    };

    return json({ success: true, user: userData, message: "Login successful" });
  } catch (error: unknown) {
    console.error("Error during login:", error);
    return json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    ); // Return an error response
  }
};
