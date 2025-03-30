export interface User {
    _id: string;
    name?: string; // Optional, as some users don't have a name
    email: string;
    __v: number;
}

export interface UserResponse {
    success: boolean;
    users: User[];
}