# 🍞 Luca's Loaves - Full-Stack Bakery Web Application

## 📖 About the Project
A full-stack dynamic web application and RESTful API developed for the "Luca's Loaves" bakery. This project features a modern Node.js/Express backend connected to a MongoDB database, and a user-friendly React frontend. It also includes interactive API documentation integrated with Swagger UI.

## ✨ Key Features
* **Dynamic Product Management:** Bakery menu items are fetched dynamically from the database and displayed on the frontend.
* **Secure Order Processing:** Customers can add items to their cart and submit orders. The backend automatically calculates total prices server-side to prevent data manipulation and ensure data integrity.
* **RESTful API Architecture:** Full CRUD (Create, Read, Update, Delete) operations are supported for products and orders.
* **API Documentation:** Interactive and testable API documentation built using `swagger-ui-express`.
* **CORS Security:** Configured to securely handle cross-origin requests between the client and the server.

## 🛠️ Tech Stack

### Frontend
* **Library/Framework:** React.js
* **Build Tool:** Vite

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ODM
* **Documentation:** Swagger UI (`swagger-jsdoc`, `swagger-ui-express`)
* **Security & Configuration:** CORS, Dotenv (`.env`)

## 🚀 Getting Started & Installation

To get a local copy up and running, follow these simple steps:

**1. Clone the repository:**
\`\`\`bash
git clone https://github.com/ugurturker1/lucas-loaves.git
cd lucas-loaves
\`\`\`

**2. Install dependencies:**
Install the required NPM packages for the project.
\`\`\`bash
npm install
\`\`\`

**3. Set up Environment Variables:**
Create a `.env` file in the root directory and add your MongoDB URI and port configuration (e.g., `MONGO_URI=mongodb+srv://...`).

**4. Start the development server:**
Run the following command to start the project (based on your package.json scripts):
\`\`\`bash
npm run dev
\`\`\`
