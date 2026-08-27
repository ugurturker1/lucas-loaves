# Luca's Loaves - Full-Stack Bakery Web Application

A dynamic full-stack e-commerce application built for "Luca's Loaves" bakery. This project features a responsive React (Vite) frontend and a Node.js/Express backend connected to a MongoDB database, complete with interactive Swagger API documentation.

## 🚀 Features
* **Dynamic Product Management:** Fetch bakery menu items dynamically from the MongoDB database.
* **Guest Checkout System:** Seamless order processing without requiring user registration. Captures customer details and cart items efficiently.
* **Secure Order Processing:** The backend automatically recalculates total prices for incoming orders to prevent frontend manipulation and ensure data integrity.
* **Performance Optimized:** The frontend utilizes `React.memo` and optimized state management to prevent unnecessary re-renders (audited via Google Lighthouse).
* **RESTful API:** Complete CRUD operations for products and orders.
* **API Documentation:** Interactive Swagger UI for testing and exploring API endpoints.
* **CORS Security:** Configured to securely communicate between the React client and the Express server.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), React Router, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **Documentation:** Swagger UI (`swagger-jsdoc`, `swagger-ui-express`)
* **Security & Configuration:** CORS, Dotenv

## ⚙️ Getting Started & Installation

**⚠️ IMPORTANT RUNTIME INSTRUCTIONS:**
Because this is a full-stack application, you must run the backend and frontend simultaneously using **TWO SEPARATE TERMINALS**:
* **Terminal 1:** Runs the Node.js backend (`npm start server`)
* **Terminal 2:** Runs the Vite frontend (`npm run dev`)

---

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ugurturker1/lucas-loaves.git
   cd lucas-loaves
   ```

2. **Install dependencies:**
   Make sure you install the required packages for the project.
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Environment & Database Setup (⚠️ CRITICAL STEP):
Create a .env file in the root directory of your project folder. You will need to create a new database in your MongoDB environment (Compass or Atlas) for this project.

IMPORTANT: Your new database MUST be named exactly lucasloaves. If you use a different name, the application will not be able to fetch the products.

Add your MongoDB connection string to the .env file. Ensure that the database name lucasloaves is explicitly written in the URI just before the ? mark, like this:
   PORT=5000
   MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster_url>/lucasloaves?retryWrites=true&w=majority
   ```
   *(Note: The `.env` file is included in `.gitignore` for security purposes and will not be pushed to version control.)*

4. **Start the Backend Server (Terminal 1):**
   Open your first terminal in the project directory and start the Express backend:
   ```bash
   npm start server
   ```
   *The backend API and Swagger UI will be running on `http://localhost:5000/api-docs`*

5. **Start the Frontend Client (Terminal 2):**
   Open a **completely new terminal window**, ensure you are in the project directory, and start the Vite frontend:
   ```bash
   npm run dev
   ```
   *The React application will now be accessible at `http://localhost:5173`*
