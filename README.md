# Node.js Admin Application

## Overview
This is a Node.js web admin application designed for managing user accounts and performing administrative tasks. The application features a mobile-first responsive design using Tailwind CSS, with a primary color scheme of gray.

## Features
- User authentication with login/logout functionality.
- Admin dashboard for viewing logs and managing accounts.
- Role-based access control, ensuring only users with admin permissions can access certain features.
- Responsive design suitable for both desktop and mobile devices.

## Project Structure
```
nodejs-admin-app
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   └── authRoutes.js
│   ├── views
│   │   ├── dashboard.html
│   │   └── login.html
│   ├── public
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── scripts.js
│   ├── app.js
│   └── config
│       └── dbConfig.js
├── tailwind.config.js
├── package.json
├── .env
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd nodejs-admin-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```
5. Start the application:
   ```
   npm start
   ```

## Usage
- Access the login page at `/login`.
- Enter your credentials to log in.
- Once logged in, you will be redirected to the admin dashboard where you can manage accounts and view logs.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- Tailwind CSS

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.