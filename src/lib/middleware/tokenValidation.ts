import jwt from "jsonwebtoken";
import User from "$lib/models/User";
import { JWT_SECRET } from "$env/static/private"; // Correct import

interface Request {
  headers: Headers;
}

const validateToken = async (req: Request): Promise<Response | null> => {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    let message = "Unauthorized Please login";

    if (!token) {
      message = "No token, authorization denied";
      return new Response(JSON.stringify({ success: false, message }), {
        status: 401,
      });
    }

    // token verification
    try {
      const decoded = jwt.verify(token, JWT_SECRET || "your_secret_key") as {
        userId: string;
      };
  
      const user = await User.findById(decoded.userId);
      console.log("Decoded user:", decoded.userId);
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401 }
      );
    }

    // Attach user to the request object
    (req as any).user = user;
    return null; // Token is valid
  } catch (error) {
    const message = "An error occurred during token validation";
    return new Response(JSON.stringify({ success: false, message }), {
      status: 401,
    });
  }
};

export default validateToken;