// src/routes/api/users/+server.js
import { json } from '@sveltejs/kit';
import User from '$lib/models/User';
import connectDB from '$lib/server/db'; // Import your database connection utility

export async function POST({ request }) {
    try {
        await connectDB(); // Connect to MongoDB

        const body = await request.json();
        const newUser = new User(body);
        await newUser.save();

        return json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return json({ success: false, error: error.message }, { status: 500 }); // Return an error response
    }
}