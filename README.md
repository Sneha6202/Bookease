# BookEase

BookEase is a full-stack web application that allows users to search, reserve, and manage books from local book stalls.

## Features
- User & Bookstall Registration/Login
- Book Search & Reservation
- Stock Management
- Email Notifications
- JWT Authentication
  
### 👤 Customer
- Register and login securely
- Search books by title and location
- Reserve books with pickup date
- View personal reservations
- Cancel reservations
- Receive email notifications (confirmation & cancellation)

### 🏪 Book Stall Owner
- Register and login as stall owner
- Add and manage book stock
- View incoming reservations
- Complete reservations
- Receive notifications for new reservations


## 📧 Email System
- Reservation confirmation email to customer
- Cancellation email to customer
- Completion email to customer
- New reservation notification to stall owner

## Tech Stack
- React, Bootstrap
- Spring Boot, JPA
- MySQL
- JavaMailSender
- 
### Email Service
- JavaMailSender (SMTP - Gmail)
  
## 🔐 Authentication
- JWT-based authentication
- Role-based access (Customer & Book Stall)

## 📂 Project Structure
bookease/
│
├── frontend/ # React frontend
├── backend/ # Spring Boot backend
└── README.md

### Backend
1. Configure MySQL database
2. Update `application.properties`
3. Run:
   ```bash
   mvn spring-boot:run

### Frontend
1.Navigate to frontend folder:
 cd frontend
2. install dependencies
npm install
3. run
npm run dev

## Team Project
Developed as a group project.
