// src/routes/api/users/+server.ts
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import User from '$lib/models/User';
import connectDB from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        await connectDB();

        const body = await request.json() as { name: string; password: string; email?: string }; // Define the expected shape of the request body

        // Check if a user with the same name or email already exists
        const existingUser = await User.findOne({ 
            $or: [{ name: body.name }, { email: body.email }] 
        });

        if (existingUser) {
            return json({ success: false, error: 'Name or email already exists' }, { status: 400 });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds
        body.password = hashedPassword;

        const newUser = new User(body);
        await newUser.save();

        return json({ success: true, message: 'User created successfully' });
    } catch (error: unknown) {
        console.error('Error creating user:', error);
        return json({ success: false, error: (error as Error).message }, { status: 500 }); // Return an error response
    }
};