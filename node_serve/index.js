// cd folder node_serve run => npm init -y and npm install express socket.io => run node index.js 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');


// Initialize an Express app
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://solueye-globarius-laravel.test', // Allow your Laravel origin
    methods: ['GET', 'POST'], // Allow these methods
    credentials: true, // Allow cookies and credentials
}));

// Create a server for Socket.IO to work with
const server = http.createServer(app);
// const io = socketIo(server);
const io = socketIo(server, {
    cors: {
        origin: 'https://solueye-globarius-laravel.test', // Allow your Laravel origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Handle client connection
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Listen for messages from Laravel (or any HTTP request)
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
});

// **Handle POST request from Laravel**
app.post('/message', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: 'Message is required' });
    }

    // Broadcast the message to all connected Socket.IO clients
    io.emit('message', { message });
    console.log('Broadcasting message:', message);

    // Send response back to Laravel
    res.status(200).send({ success: 'Message sent successfully' });
});


// Start the server on port 3000 (or another port)
server.listen(3000, () => {
    console.log('Socket.IO server is running on port 3000');
});

// api BE laravel [
    // Route::post('likelihood', [RiskAssessmentController::class, 'likelihood'])->name('likelihood');
    // public function likelihood(Request $request)
    // {
    //     $client = new Client();
    //     $message = $request->input('message');

    //     try {
    //         // Send a POST request to the Node.js server
    //         $response = $client->post('http://localhost:3000/message', [
    //             'json' => [
    //                 'message' => $message,
    //             ]
    //         ]);

    //         // Return success response
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Notification sent successfully'
    //         ]);
    //     } catch (\Exception $e) {
    //         // Return error response
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }
// ]

// blade laravel and js
{/* <h1>Real-Time Notification Page</h1>

<p id="notificationMessage">Waiting for a message...</p> */}

{/* <script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script>
    const socket = io('http://localhost:3000');

    // Listen for 'message' event from the WebSocket server
    socket.on('message', function(data) {
        console.log(data);
        // Update the content of the notificationMessage paragraph
        document.getElementById('notificationMessage').innerText = data.message;
    });
</script> */}