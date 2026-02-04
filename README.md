# Task Management System - Intern Assignment

A production-grade full-stack task management application with JWT authentication, role-based access control, and complete CRUD operations.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Swagger** - API documentation

### Frontend
- **React.js** (Vite) - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vanilla CSS** - Styling

## 📁 Project Structure

```
TImepass14/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── swagger.js         # Swagger configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js            # JWT & role verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── taskRoutes.js      # Task endpoints
│   ├── utils/
│   │   ├── errorHandler.js    # Error handling
│   │   └── generateToken.js   # JWT generation
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx   # Create/Edit task form
    │   │   └── TaskList.jsx   # Display tasks
    │   ├── pages/
    │   │   ├── Register.jsx   # Registration page
    │   │   ├── Login.jsx      # Login page
    │   │   └── Dashboard.jsx  # Main dashboard
    │   ├── services/
    │   │   └── api.js         # API integration
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    └── package.json
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already created with default values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=intern_assignment_secret_key_2024_secure
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

   **Important:** Change `JWT_SECRET` in production!

4. **Start MongoDB**
   
   Make sure MongoDB is running locally or update `MONGODB_URI` with your MongoDB Atlas connection string.

5. **Run the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs

### API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)

#### Tasks (`/api/v1/tasks`)
- `POST /` - Create task (Protected)
- `GET /` - Get my tasks (Protected)
- `GET /:id` - Get single task (Protected)
- `PUT /:id` - Update task (Protected, Owner only)
- `DELETE /:id` - Delete task (Protected, Owner only)
- `GET /admin/all` - Get all tasks (Protected, Admin only)

### Request Examples

**Register User**
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login**
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Task**
```json
POST /api/v1/tasks
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Complete assignment",
  "description": "Finish the intern assignment",
  "status": "pending"
}
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based authentication
- ✅ Protected routes with middleware
- ✅ Role-based authorization (user/admin)
- ✅ Input validation
- ✅ Centralized error handling
- ✅ CORS enabled

## 🎯 Features Implemented

### Authentication & Authorization
- [x] User registration with email validation
- [x] User login with JWT token generation
- [x] Password hashing using bcrypt
- [x] Role-based access (user/admin)
- [x] Protected route middleware
- [x] Admin-only endpoints

### Task Management (CRUD)
- [x] Create task (authenticated users)
- [x] View my tasks
- [x] Update task (owner only)
- [x] Delete task (owner only)
- [x] Admin can view all tasks
- [x] Task status management (pending/completed)

### API Quality
- [x] RESTful API structure
- [x] Proper HTTP status codes
- [x] Centralized error handling
- [x] Input validation
- [x] API versioning (/api/v1)
- [x] Swagger documentation

### Frontend
- [x] Registration page
- [x] Login page
- [x] Dashboard with task management
- [x] Create/Edit/Delete tasks
- [x] Status toggle
- [x] Success/Error notifications
- [x] Responsive design

## 🧪 Testing the Application

1. **Start both servers** (backend on :5000, frontend on :5173)

2. **Register a new user**
   - Go to http://localhost:5173/register
   - Create an account (try both 'user' and 'admin' roles)

3. **Login**
   - Use your credentials to login
   - You'll be redirected to the dashboard

4. **Test CRUD operations**
   - Create new tasks
   - Update task status
   - Edit task details
   - Delete tasks

5. **Test API directly** (optional)
   - Use Swagger UI at http://localhost:5000/api-docs
   - Or use Postman/Thunder Client

## 📈 Scalability Notes

### Current Architecture
The application follows a modular MVC pattern with clear separation of concerns, making it easy to scale and maintain.

### Scaling Strategies

#### 1. **Horizontal Scaling**
- Deploy multiple instances behind a load balancer (NGINX, AWS ALB)
- Use PM2 for process management in production
- Implement session management with Redis for distributed systems

#### 2. **Database Optimization**
- **Indexes**: Already implemented on frequently queried fields
  - User: email (unique index)
  - Task: createdBy, status, createdAt
- **Sharding**: Partition data by user ID for large datasets
- **Read Replicas**: Separate read/write operations
- **Caching**: Implement Redis for frequently accessed data

#### 3. **Redis Integration**
```javascript
// Example: Cache user tasks
const redis = require('redis');
const client = redis.createClient();

// Cache tasks for 5 minutes
const cacheKey = `tasks:user:${userId}`;
const cachedTasks = await client.get(cacheKey);

if (cachedTasks) {
  return JSON.parse(cachedTasks);
}

const tasks = await Task.find({ createdBy: userId });
await client.setex(cacheKey, 300, JSON.stringify(tasks));
```

#### 4. **Microservices Architecture**
For large-scale applications, split into services:
- **Auth Service**: User authentication & authorization
- **Task Service**: Task CRUD operations
- **Notification Service**: Email/push notifications
- **API Gateway**: Route requests, rate limiting

#### 5. **Docker & Kubernetes**
The application is Docker-ready:

**Dockerfile (Backend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**docker-compose.yml**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

#### 6. **Performance Optimizations**
- Implement pagination for task lists
- Add request rate limiting
- Use compression middleware (gzip)
- Implement CDN for frontend assets
- Database connection pooling
- Lazy loading for frontend components

#### 7. **Monitoring & Logging**
- **Winston** or **Morgan** for logging
- **Prometheus** + **Grafana** for metrics
- **Sentry** for error tracking
- **New Relic** or **DataDog** for APM

#### 8. **CI/CD Pipeline**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
      - name: Build Docker images
      - name: Deploy to AWS/Azure/GCP
```

## 🔧 Production Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use environment-specific .env files
- [ ] Enable HTTPS/SSL
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Set up proper logging
- [ ] Configure CORS for specific origins
- [ ] Add database backups
- [ ] Implement health check endpoints
- [ ] Set up monitoring and alerts

## 👨‍💻 Author

Himesh Kanthariya

---

**Note**: This is a demo application. For production use, implement additional security measures, comprehensive testing, and proper deployment practices.
