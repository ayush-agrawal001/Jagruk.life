import axios from 'axios';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const uploadImageRoute = new Hono<{Bindings : {
    COOKIE : string,
  },}>();

uploadImageRoute.use(cors({
    origin: '*',
    allowMethods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// Efficient base64 conversion for large files
function arrayBufferToBase64(buffer: ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192; // Process in 8KB chunks
    let binary = '';
    
    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.slice(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
}

uploadImageRoute.post('/', async (c) => {
    try {
        const cookie = c.env.COOKIE;
        // Get the JSON data from the request
        const data = await c.req.json();
        
        if (!data.image) {
            return c.json({ message: "No image data provided" }, 400);
        }

        // The image should already be base64 encoded from the frontend
        const base64Image = data.image;

        const response = await axios.post('https://api.imgur.com/3/upload?client_id=546c25a59c58ad7', {
            image: base64Image,
            type: 'base64'
        }, {
            headers: {
    'accept': '*/*',
'accept-language': 'en-US,en;q=0.9',
'cookie': cookie,
'origin': 'https://imgur.com',
'referer': 'https://imgur.com/',
'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
'sec-ch-ua-mobile': '?1',
'sec-ch-ua-platform': '"Android"',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-site',
'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
}
        });

        return c.json({ imageUrl: response.data.data.link }, 201);
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message);
        return c.json({
            message: "Error uploading image",
            error: error.message
        }, 500);
    }
});

export default uploadImageRoute;

