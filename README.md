# Chat Application

A simple real-time chat application for the OLX Banasthali platform, enabling buyers and sellers to communicate securely.

## Features
- 🔹 **Real-time Messaging** using Socket.io
- 🔹 **User Authentication** via Email
- 🔹 **Message Storage** with MySQL Database
- 🔹 **Email Notifications** using PHPMailer
- 🔹 **Responsive UI** for easy chat experience

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MySQL
- **Email Notifications**: PHP Mailer

## Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/chat-application.git
cd chat-application
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Database
- Create a MySQL database named `banasthali_olx`.
- Run the following SQL query to create the messages table:
```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_email VARCHAR(255),
    receiver_email VARCHAR(255),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ Start the Server
```bash
node server.js
```
Server will run on **http://localhost:3000**.

### 5️⃣ Run the Frontend
Open `index.html` in a browser.

## How It Works
1. Users enter their email and recipient email to start a chat.
2. Messages are sent and received in real time.
3. Messages are stored in the MySQL database.
4. Email notifications are sent for new messages.

## Contributing
Feel free to contribute by submitting a pull request or reporting issues.

## License
This project is licensed under the MIT License.

---
📧 For any queries, contact **tishaporwal02@gmail.com**
