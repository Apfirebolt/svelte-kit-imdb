# SvelteKit IMDB 

[![SvelteKit](https://img.shields.io/badge/-SvelteKit-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38b2ac?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/-Docker-2496ed?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/-Nginx-269539?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)
[![Vite](https://img.shields.io/badge/-Vite-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

![Cover Image](screenshots/3.png)

Another Svelte app I worked on recently. This app uses OMDB API to get movie data. You can search for movies and view details like plot, year of release, actors, critic score, box office collection and more. Back-end APIs are also written in Svelte using MongoDB as database and Mongoose.

## Screenshots

Let's jump straight into screenshot to see how it looks like first :) 

![Screenshot 1](screenshots/1.png)
![Screenshot 2](screenshots/2.png)

## Features

- Search for movies by title using the OMDB API.
- View detailed information about a movie, including plot, release year, actors, critic scores, and box office collection.
- Create and manage personalized playlists of your favorite movies.
- Responsive design for seamless usage across devices.
- Backend APIs built with Svelte and MongoDB for efficient data handling.
- Dockerized setup for easy deployment and scalability.
- Optimized performance with Vite and Tailwind CSS integration.
- Nginx support for serving the application in production.

## Development

You can run this by installing npm packages on your system. Make sure you have MongoDB running on your system. Create an env file with the following contents

```
DB_URI=mongodb://localhost:27017/svelte_imdb
JWT_SECRET=somesupersecret
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_KEY=your_api_key_here
```

You can get the API key from this website https://www.omdbapi.com

## Issues

- Not able to read env variables on front-end
- Authentication not working properly



