# Care-Connect - Online Doctor Appointment Booking Backend 🚑🩺

## Project Overview 📝

DoctorHub is a backend API for an online doctor appointment booking platform. It allows patients to securely register, search for doctors by specialty or location, and book appointments in real-time. Doctors can manage their profiles, set availability, view appointments, and add prescription notes. The backend is built with Node.js, Express, and MongoDB focusing on robust authentication and secure data management. 🔒

---

## Features Implemented So Far ✅

- Node.js project setup with layered architecture and environment configuration ⚙️  
- MongoDB Atlas connection using Mongoose 🗄️  
- User model supporting both patients and doctors with role differentiation 👥  
- Password hashing with bcrypt and secure password comparison methods 🔐  
- Doctor-specific fields included (specialty, location, ratings, experience, timing) 📋 
- Authentication endpoints: Secure register (signup) with duplicate checks, login with JWT token in   cookies, and logout to clear sessions 🔑   
- Basic groundwork laid for authentication workflows 🔧
- Doctor profile endpoints: Doctors can view and update their own profiles securely.
- Doctor search endpoint: Patients can search doctors by specialty/location using query parameters.
- Profile routes protected by JWT authentication, with proper role validation.
- Appointment booking APIs for patients, ensuring double-booking prevention and robust validation.
- Appointment management endpoints: doctors and patients can view, update, reschedule, and cancel   appointments.
- Authentication and error handling on all booking flows for security and reliability.
- Notification system: Async email/SMS alerts using Nodemailer, Twilio, and BullMQ queuing for appointments and other events.
- Prescription management: Create/update/view APIs linked to appointments, with role-based auth and notifications.



---

## Tech Stack 💻

- Node.js ⚡  
- Express.js 🚀  
- MongoDB Atlas with Mongoose 🐘  
- bcrypt for password hashing 🔑  
- dotenv for environment variables 🌿

---

## Getting Started 🚀

### Prerequisites 🎯

- Node.js (v16 or higher recommended)  
- MongoDB instance (local or cloud like MongoDB Atlas)  
- npm or yarn package manager

### Installation 🛠️

1. Clone the repository  

- git clone https://github.com/Kuldeep0101/Care-Connect.git
- cd Care-Connect



2. Install dependencies  

- npm install

3. Create a `.env` file in the root directory with the following variables:  

- MONGODB_URI=
- PORT=8000


4. Start the server  

 - npm run dev


*(Assuming nodemon is configured for development)*

---

## Project Structure 📂

- /src
- /config # Database and environment setup
- /controllers # Route handlers
- /models # Mongoose schemas
- /routes # API routes
- /services # Business logic
- /middlewares # Auth, error handling, validation
- /app.js # Entry point
- .env # Environment variables (gitignored)


---

## Contributing 🤝

Contributions are welcome! Please fork the repository and submit pull requests with clear descriptions.

---

## License 📄

MIT License

---

## Acknowledgments 🙏

Big thanks to Akshay Saini and the Namaste Dev platform for curating this exceptional project idea and guidance. 🎉
