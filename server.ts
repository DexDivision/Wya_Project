import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Socket.io config
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ['websocket', 'polling']
});

app.use(express.json());
app.use(express.static(__dirname));

/** * SIMULATION ENGINE: ALPHA FOUNDER
 * Update Frequency: 0.8 Seconds (800ms)
 */
setInterval(() => {
    // Randomized movement within the local area
    const spoofedLat = 41.0245 + (Math.random() - 0.5) * 0.005;
    const spoofedLon = -80.6628 + (Math.random() - 0.5) * 0.005;
    
    io.emit('node_joined', { 
        userId: "Alpha Founder", 
        lat: spoofedLat, 
        lon: spoofedLon,
        timestamp: new Date().toISOString()
    });
}, 800); 

app.get('/status', (req, res) => {
    res.json({ status: "Wya Live Active", updates_per_second: 1.25 });
});

const PORT = Number(process.env.PORT) || 3000;

httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`----------------------------------------`);
    console.log(`🚀 Wya Live active on Port ${PORT}`);
    console.log(`📍 Updates Frequency: Every 0.8s`);
    console.log(`----------------------------------------`);
});