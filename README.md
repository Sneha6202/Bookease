# BookEase
BookEase is a full-stack web application that helps customers search, reserve, and manage books from local book stalls.  
It also allows book stall owners to manage inventory and handle customer reservations efficiently.

## Live Demo

- **Frontend:** https://bookease-kohl.vercel.app
- **Backend:** https://bookease-86mf.onrender.com
- **GitHub Repository:** https://github.com/Sneha6202/Bookease

## Deployment Details

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on Railway MySQL

## Important Note

The backend is hosted on Render free tier. If the service is inactive for some time, it may take around 30–60 seconds to respond on the first request.

## How to Test

1. Open the backend link first:  
  https://bookease-86mf.onrender.com

2. Wait a few seconds for the backend to wake up if needed.

3. Then open the frontend link:  
   https://bookease-kohl.vercel.app

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
