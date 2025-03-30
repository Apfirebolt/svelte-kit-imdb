import jwt from "jsonwebtoken";
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
      jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401 }
      );
    }

    return null; // Token is valid
  } catch (error) {
    const message = "An error occurred during token validation";
    return new Response(JSON.stringify({ success: false, message }), {
      status: 401,
    });
  }
};

export default validateToken;
