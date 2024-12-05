# Train Seat Booking System

This is a full-stack web application built using Node.js, Express, Sequelize ORM, and MySQL that allows users to manage bookings for train seats. The system provides functionalities for user registration, login, train management, seat availability checks, seat bookings, and booking retrieval, with security and JWT-based authentication.

## How to Get Started

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up the Database:**

   - Create a MySQL database and configure the `.env` file with the correct credentials.

4. **Configuration:**

   - In your `.env` file, set up the following:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=password
     DB_NAME=train_booking_system
     JWT_SECRET=<your-secret-key>
     ```

5. **Run the Application:**
   ```bash
   npm start
   ```
   - The app will be accessible at [http://localhost:3000](http://localhost:3000).

## Key Features

- **User Authentication:**

  - Users can register an account and log in using JWT authentication tokens.
  - Once logged in, users can perform various actions securely using their JWT token.

- **Train Management:**

  - Admins can add new trains with available seats.
  - Each train has a unique train number, available seats, and other train-related details.

- **Seat Availability:**

  - Users can check seat availability for a specific train.
  - Available seats are displayed for users to select and book.

- **Booking Seats:**

  - Users can book seats for a particular train if sufficient seats are available.
  - The system updates the number of available seats when a booking is confirmed.

- **Booking Details:**
  - Users can view their specific bookings, including the train number, seat count, and booking status.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL (using Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)

## API Endpoints

1. **User Registration:**

   - `POST /api/users/register` – Register a new user.

2. **User Login:**

   - `POST /api/users/login` – Log in and get a JWT token.

3. **Train Management (Admin):**

   - `POST /api/trains` – Add a new train (Admin only).
   - `GET /api/trains` – Get a list of all trains.

4. **Booking Management:**
   - `GET /api/bookings` – Get all bookings (Admin only).
   - `POST /api/bookings/book` – Book a seat on a train.
   - `GET /api/bookings/:id` – Get details of a specific booking.

## How to Use the System

1. **User Registration:**

   - Make a POST request to `/api/users/register` with the necessary user data (name, email, password).

2. **User Login:**

   - Make a POST request to `/api/users/login` with the user’s email and password.
   - You will receive a JWT token that you must use in the Authorization header for accessing protected routes.

3. **Add a Train (Admin Only):**

   - Make a POST request to `/api/trains` with train details like train number and available seats.

4. **Book a Seat:**

   - Make a POST request to `/api/bookings/book` with `trainNumber`, `seatCount`, and `userId` to book a seat.

5. **View Bookings:**
   - Make a GET request to `/api/bookings` to view all bookings (Admin only).
   - Make a GET request to `/api/bookings/:id` to view a specific booking.

## Security

- The system uses JWT for authentication. After logging in, the user gets a token that must be passed in the Authorization header for accessing secured routes.

- **JWT Token Example:**
  ```makefile
  Authorization: Bearer <your-jwt-token>
  ```

## Project Structure

- **models/**: Contains Sequelize models for User, Train, and Booking.
- **controllers/**: Contains logic for handling routes like GetBookings, BookSeat, etc.
- **routes/**: Contains API routes for users, trains, and bookings.
- **config/**: Contains configuration files, including the database connection.
- **.env**: Contains environment variables like database credentials and JWT secret.

## Conclusion

The Train Seat Booking System provides a simple yet powerful solution for managing train seat bookings with user authentication, train management, and booking management functionalities. The use of JWT authentication ensures secure access to the system, and the use of Sequelize ORM simplifies database management.
