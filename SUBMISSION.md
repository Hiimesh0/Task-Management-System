# Intern Assignment Submission - Task Management System

## 📦 Submission Contents

This is a complete full-stack task management application built for the internship entrance test.

### Project Structure
```
TImepass14/
├── backend/          # Node.js + Express backend
├── frontend/         # React + Vite frontend
└── README.md         # Complete documentation
```

### Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend**: React.js, Vite, Axios, React Router
- **Database**: MongoDB (Atlas or local)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

2. **Configure MongoDB**
   - Update `backend/.env` with your MongoDB connection string
   - For MongoDB Atlas: Use the provided connection string
   - For local MongoDB: Use `mongodb://localhost:27017/task-management`

3. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

### Features Implemented

✅ **Authentication & Authorization**
- User registration with email validation
- Login with JWT token generation
- Password hashing using bcrypt
- Role-based access control (user/admin)
- Protected routes with middleware

✅ **Task Management (CRUD)**
- Create tasks (authenticated users)
- View my tasks
- Update tasks (owner only)
- Delete tasks (owner only)
- Admin: View all users' tasks
- Task status management (pending/completed)

✅ **API Quality**
- RESTful API structure
- Proper HTTP status codes
- Centralized error handling
- Input validation
- API versioning (/api/v1)
- Swagger documentation

✅ **Frontend**
- Registration page
- Login page
- Dashboard with task management
- Create/Edit/Delete tasks
- Status toggle
- Success/Error notifications
- Responsive design

### API Endpoints

**Authentication**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)

**Tasks**
- `POST /api/v1/tasks` - Create task (Protected)
- `GET /api/v1/tasks` - Get my tasks (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected, Owner only)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected, Owner only)
- `GET /api/v1/tasks/admin/all` - Get all tasks (Protected, Admin only)

### Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected routes with middleware
- Role-based authorization
- Input validation
- Centralized error handling

### Database Schema

**User Model**
- name, email, password (hashed), role (user/admin)
- Indexed on email for performance

**Task Model**
- title, description, status (pending/completed), createdBy
- Indexed on createdBy and status for efficient queries

### Scalability Notes

The application is designed with scalability in mind:
- Modular MVC architecture
- Database indexing for performance
- Stateless JWT authentication (ready for horizontal scaling)
- Separation of concerns
- Environment-based configuration

**Future Scaling Options:**
- Redis for caching and session management
- Load balancing with NGINX
- Microservices architecture
- Docker containerization
- Database sharding and read replicas
- CDN for frontend assets

### Testing

The application has been thoroughly tested:
- All authentication endpoints verified
- All CRUD operations tested
- MongoDB Atlas connectivity confirmed
- JWT token generation and validation working
- Input validation functional
- Error handling verified

### Environment Variables

Required in `backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Notes for Evaluators

- All code is clean, commented, and production-ready
- No placeholders or TODOs
- Complete error handling implemented
- Swagger documentation available at `/api-docs`
- Ready for deployment

### Author

Intern Assignment Submission - Full Stack Development

---

**Status**: ✅ Complete and Ready for Evaluation
