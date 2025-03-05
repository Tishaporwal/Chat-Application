const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios"); // PHP mailer ke liye request bhejne ko
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" },
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "banasthali olx",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
});

// Socket.io - Handle chat communication
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Fetch old messages
    socket.on("loadMessages", ({ sender, receiver }) => {
        const sql = "SELECT * FROM messages WHERE (sender_email = ? AND receiver_email = ?) OR (sender_email = ? AND receiver_email = ?) ORDER BY timestamp";
        db.query(sql, [sender, receiver, receiver, sender], (err, results) => {
            if (err) throw err;
            socket.emit("messagesLoaded", results);
        });
    });

    // Send & Store Message
    socket.on("sendMessage", ({ sender, receiver, message }) => {
        const sql = "INSERT INTO messages (sender_email, receiver_email, message) VALUES (?, ?, ?)";
        db.query(sql, [sender, receiver, message], (err) => {
            if (err) throw err;

            // Notify users
            io.emit("receiveMessage", { sender, receiver, message });

            // Send Email Notification using PHP Mailer
            axios.post("http://localhost/tisha/sendmail_tisha_chat.php", { sender, receiver, message })
                .then(response => console.log(response.data))
                .catch(error => console.error("Email Error:", error));
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
