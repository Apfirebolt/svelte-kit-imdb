// src/routes/api/user/+server.ts

import { json } from '@sveltejs/kit';
import ConnectDB from '$lib/server/db';
import validateToken from '$lib/middleware/tokenValidation';
import User from '$lib/models/User';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
    await ConnectDB();

    const validationResult = await validateToken(request);

    if (validationResult) {
        // If validationResult is a Response object, return it
        return validationResult;
    }

    try {
        const users = await User.find().select('-password');
        return json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error('Error in fetching users (server) => ', error);
        return json(
            { success: false, message: 'Something Went Wrong Please Retry Later!' },
            { status: 500 }
        );
    }
};