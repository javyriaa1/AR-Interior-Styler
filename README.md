# AR Interior Styler

AR Interior Styler is a web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to visualize and design their spaces using augmented reality. By leveraging the Model Viewer library, users can upload images of their rooms or use their device's camera to capture images and place 3D models within the captured spaces.

## Features

- **Upload Room Images**: Users can upload an image of their room to visualize how different 3D models would look in their space.
- **Camera Functionality**: Users can use their device's camera to capture live images of their rooms and place 3D models in real time.
- **3D Model Display**: The application utilizes the Model Viewer library to display and interact with 3D models seamlessly.
- **User-Friendly Interface**: An intuitive and easy-to-navigate interface to enhance user experience.

## Technologies Used

- **MERN Stack**:
  - **MongoDB**: Database for storing user data.
  - **Express**: Backend framework to handle API requests and manage server operations.
  - **React**: Frontend library for building user interfaces.
  - **Node.js**: Server-side runtime environment for executing JavaScript code.

- **Model Viewer**: A web component to display 3D models with various features like rotation, zoom, and interaction.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and running.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/javyriaa1/AR-Interior-Styler.git
   cd AR-Interior-Styler
   ```

2. Navigate to the backend directory and install the dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install the dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and configure your environment variables (e.g., database connection string).

5. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

### Usage

1. Open your browser and navigate to `http://localhost:3000` to access the application.
2. Use the provided options to either upload a room image or use your device's camera.
3. Select and place the desired 3D models in your space.

