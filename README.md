# Employee Management System

A full-stack Employee Management System built with React and Node.js that allows organizations to manage their employees efficiently. This application provides comprehensive CRUD operations, search and filter capabilities, soft delete functionality, and user authentication.

## 📋 Project Description

This Employee Management System is a web application that enables organizations to:

- **Manage Organizations**: Create, view, update, and delete organizations with industry and description details
- **Manage Employees**: Add employees with complete information including personal details, position, department, organization assignment, joining date, salary (optional), and status
- **Search & Filter**: Search employees by name, email, position, or department. Filter by organization, department, and status (Active/Inactive)
- **Soft Delete**: Employees can be soft-deleted (marked as deleted) without removing them from the database, with a dedicated view for deleted employees
- **User Authentication**: Secure login and signup functionality with JWT-based authentication
- **Data Validation**: Comprehensive frontend and backend validation for all inputs
- **Responsive Design**: Mobile-friendly interface that works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.0) - UI library for building user interfaces
- **Vite** (v7.2.4) - Build tool and development server
- **React Router DOM** (v7.11.0) - Client-side routing
- **Axios** (v1.13.2) - HTTP client for API requests
- **Bootstrap** - CSS framework for responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** (v5.2.1) - Web application framework
- **MongoDB** with **Mongoose** (v9.1.1) - Database and ODM
- **JWT** (jsonwebtoken v9.0.3) - Authentication tokens
- **bcryptjs** (v3.0.3) - Password hashing
- **dotenv** (v17.2.3) - Environment variable management
- **CORS** (v2.8.5) - Cross-origin resource sharing

### Testing
- **Jest** (v30.2.0) - Testing framework
- **Supertest** (v7.1.4) - HTTP assertion library

### Development Tools
- **Nodemon** (v3.1.11) - Automatic server restarts during development
- **ESLint** (v9.39.1) - Code linting

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes bundled with Node.js
- **MongoDB** (v4.4 or higher) - [Download MongoDB](https://www.mongodb.com/try/download/community)
  - OR use MongoDB Atlas (cloud database) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

To check your installed versions:
```bash
node --version
npm --version
mongod --version  # (if installed locally)
```

## 🚀 Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pragya2203/internship-assignment.git
cd "Minimac Assignment"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# See Environment Variables section below for required variables
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

If using **local MongoDB**:
- Ensure MongoDB service is running on your machine
- MongoDB typically runs on `mongodb://localhost:27017`

If using **MongoDB Atlas**:
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Add it to your `.env` file (see Environment Variables section)

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection String
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/employee-management

# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-management?retryWrites=true&w=majority

# JWT Secret (use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port (optional, defaults to 5000)
PORT=5000
```

**Important Security Note**: Never commit your `.env` file to version control. Make sure `.env` is in your `.gitignore` file.

## 🏃 How to Run the Project

### Running the Backend

```bash
# Navigate to backend directory
cd backend

# Start the development server
npm run dev

# The server will start on http://localhost:5000 (or your specified PORT)
# You should see: "Server running on port 5000" and "MongoDB connected"
```

### Running the Frontend

Open a **new terminal window** and run:

```bash
# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev

# The frontend will start on http://localhost:5173 (Vite default port)
# You can access the application at this URL
```

### Seeding the Database (Optional)

To populate the database with sample data:

```bash
# Navigate to backend directory
cd backend

# Run the seed script
npm run seed

# This will create sample organizations and employees
```

### Running Tests

```bash
# Navigate to backend directory
cd backend

# Run tests
npm test

# This will run employee and authentication tests
```

## 📡 API Endpoints Documentation

All API endpoints are prefixed with `/api`. Most employee and organization endpoints require authentication (JWT token in Authorization header).

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Sign Up
- **POST** `/auth/signup`
- **Description**: Register a new user
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **Error Responses**:
  - `400`: Email already registered, invalid email format, or password too short
  - `500`: Server error

#### Login
- **POST** `/auth/login`
- **Description**: Authenticate user and get JWT token
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `401`: Invalid credentials
  - `400`: Missing email or password
  - `500`: Server error

### Organization Endpoints

#### Get All Organizations
- **GET** `/organizations`
- **Description**: Retrieve all organizations
- **Authentication**: Not required
- **Response** (200):
  ```json
  [
    {
      "_id": "60f7b3c4e5d4a8b9c0d1e2f3",
      "name": "Maintonia",
      "industry": "AI",
      "description": "AI Solutions Company",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
  ```

#### Create Organization
- **POST** `/organizations`
- **Description**: Create a new organization
- **Authentication**: Required (Bearer token)
- **Request Body**:
  ```json
  {
    "name": "TechNova",
    "industry": "Software",  // Optional
    "description": "Web & Cloud Services"  // Optional
  }
  ```
- **Response** (201): Created organization object
- **Error Responses**:
  - `400`: Organization name is required
  - `401`: Unauthorized (missing or invalid token)
  - `500`: Server error

#### Update Organization
- **PUT** `/organizations/:id`
- **Description**: Update an existing organization
- **Authentication**: Required (Bearer token)
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "industry": "Updated Industry",  // Optional
    "description": "Updated Description"  // Optional
  }
  ```
- **Response** (200): Updated organization object
- **Error Responses**:
  - `400`: Organization name is required
  - `404`: Organization not found
  - `401`: Unauthorized
  - `500`: Server error

#### Delete Organization
- **DELETE** `/organizations/:id`
- **Description**: Delete an organization (only if no active employees)
- **Authentication**: Required (Bearer token)
- **Response** (200):
  ```json
  {
    "message": "Organization deleted successfully"
  }
  ```
- **Error Responses**:
  - `400`: Cannot delete organization with active employees
  - `404`: Organization not found
  - `401`: Unauthorized
  - `500`: Server error

### Employee Endpoints

#### Get All Employees
- **GET** `/employees`
- **Description**: Retrieve all active (non-deleted) employees
- **Authentication**: Not required
- **Response** (200):
  ```json
  [
    {
      "_id": "60f7b3c4e5d4a8b9c0d1e2f3",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "position": "Software Engineer",
      "department": "Engineering",
      "organization": {
        "_id": "60f7b3c4e5d4a8b9c0d1e2f4",
        "name": "Maintonia"
      },
      "joiningDate": "2024-01-01T00:00:00.000Z",
      "salary": 60000,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
  ```

#### Create Employee
- **POST** `/employees`
- **Description**: Create a new employee
- **Authentication**: Required (Bearer token)
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "position": "Software Engineer",
    "department": "Engineering",
    "organization": "60f7b3c4e5d4a8b9c0d1e2f4",
    "joiningDate": "2024-01-01",
    "salary": 60000,  // Optional
    "status": "Active"
  }
  ```
- **Response** (201): Created employee object
- **Error Responses**:
  - `400`: Missing required fields, validation errors, or duplicate email
  - `401`: Unauthorized
  - `500`: Server error

#### Update Employee
- **PUT** `/employees/:id`
- **Description**: Update an existing employee
- **Authentication**: Required (Bearer token)
- **Request Body**: (Same as create, all fields optional except validation rules apply)
  ```json
  {
    "fullName": "John Doe Updated",
    "salary": 70000
  }
  ```
- **Response** (200): Updated employee object
- **Error Responses**:
  - `400`: Validation errors
  - `404`: Employee not found or already deleted
  - `401`: Unauthorized
  - `500`: Server error

#### Delete Employee (Soft Delete)
- **DELETE** `/employees/:id`
- **Description**: Soft delete an employee (marks as deleted, doesn't remove from database)
- **Authentication**: Required (Bearer token)
- **Response** (200):
  ```json
  {
    "message": "Employee deleted successfully"
  }
  ```
- **Error Responses**:
  - `404`: Employee not found or already deleted
  - `401`: Unauthorized
  - `500`: Server error

#### Get Employee by ID
- **GET** `/employees/:id`
- **Description**: Get a specific employee by ID
- **Authentication**: Not required
- **Response** (200): Employee object
- **Error Responses**:
  - `404`: Employee not found or deleted
  - `500`: Server error

#### Search Employees
- **GET** `/employees/search?query=searchterm`
- **Description**: Search employees by name, email, position, or department
- **Authentication**: Not required
- **Query Parameters**:
  - `query` (required): Search term
- **Example**: `/api/employees/search?query=john`
- **Response** (200): Array of matching employee objects
- **Error Responses**:
  - `400`: Search query is required
  - `500`: Server error

#### Filter Employees
- **GET** `/employees/filter?org=orgId&dept=department&status=Active`
- **Description**: Filter employees by organization, department, or status
- **Authentication**: Not required
- **Query Parameters** (all optional):
  - `org`: Organization ID
  - `dept`: Department name (case-insensitive partial match)
  - `status`: "Active" or "Inactive"
- **Example**: `/api/employees/filter?org=60f7b3c4e5d4a8b9c0d1e2f4&status=Active`
- **Response** (200): Array of filtered employee objects
- **Note**: Multiple filters work together (AND logic)

#### Get Deleted Employees
- **GET** `/employees/deleted`
- **Description**: Retrieve all soft-deleted employees
- **Authentication**: Not required
- **Response** (200): Array of deleted employee objects

### Authentication Header Format

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Example using curl:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     -H "Content-Type: application/json" \
     -X GET http://localhost:5000/api/employees
```

## 🗄️ Database Schema

### Organization Model

```javascript
{
  _id: ObjectId,                    // Auto-generated by MongoDB
  name: String (required),          // Organization name
  industry: String (optional),      // Industry/Type
  description: String (optional),   // Description
  createdAt: Date (auto),           // Auto-generated timestamp
  updatedAt: Date (auto)            // Auto-generated timestamp
}
```

**Relationships**: 
- One Organization has many Employees (One-to-Many)

### Employee Model

```javascript
{
  _id: ObjectId,                    // Auto-generated by MongoDB
  fullName: String (required),      // Must contain only letters and spaces
  email: String (required, unique), // Must be valid email format, unique
  phone: String (required),         // 10-digit Indian number (6-9 followed by 9 digits)
  position: String (required),      // Employee position/role
  department: String (required),    // Department name
  organization: ObjectId (required),// Reference to Organization (ref: "Organization")
  joiningDate: Date (required),     // Cannot be in the future
  salary: Number (optional),        // Must be positive if provided
  status: String (required),        // "Active" or "Inactive" (default: "Active")
  isDeleted: Boolean (default: false), // Soft delete flag
  createdAt: Date (auto),           // Auto-generated timestamp
  updatedAt: Date (auto)            // Auto-generated timestamp
}
```

**Relationships**: 
- Each Employee belongs to one Organization (Many-to-One)
- Employee.organization references Organization._id

### User Model (for Authentication)

```javascript
{
  _id: ObjectId,                    // Auto-generated by MongoDB
  email: String (required, unique), // User email (unique)
  password: String (required),      // Hashed password (bcrypt)
  createdAt: Date (auto),           // Auto-generated timestamp
  updatedAt: Date (auto)            // Auto-generated timestamp
}
```

**Relationships**: 
- Users are independent entities used for authentication

### Schema Relationships Diagram

```
Organization (1) ──────< (Many) Employee
     │                         │
     └─ _id                    └─ organization (ObjectId reference)
```

### Indexes

- **Employee.email**: Unique index (enforces uniqueness at database level)
- **User.email**: Unique index (enforces uniqueness at database level)

### Validation Rules

#### Organization
- `name`: Required, non-empty string
- `industry`: Optional string
- `description`: Optional string

#### Employee
- `fullName`: Required, minimum 2 characters, only letters and spaces
- `email`: Required, valid email format, unique across all employees
- `phone`: Required, 10 digits starting with 6-9 (Indian format)
- `position`: Required, non-empty string
- `department`: Required, non-empty string
- `organization`: Required, must be a valid Organization ID
- `joiningDate`: Required, must be a valid date, cannot be in the future
- `salary`: Optional, if provided must be a positive number (>= 1)
- `status`: Required, must be either "Active" or "Inactive"

## 📸 Screenshots

1. **Login/Signup Page** 

![Login Page](screenshots/login.png)

![Signup Page](screenshots/signup.png)


2. **Employee List/Dashboard** 

![Home Page](screenshots/home1.png)

![Home Page](screenshots/home2.png)


3. **Add Employee Form** 

![Employee Form](screenshots/addemployee1.png)

![Employee Form](screenshots/addemployee2.png)


4. **Organization Management Page** 

![Organization Form](screenshots/organization_form.png)

![Organization List](screenshots/organizations_list.png)


5. **Filter Results** 

![Filter Feature](screenshots/filter1.png)

![Filter Feature](screenshots/filter2.png)

![Filter Feature](screenshots/filter3.png)

![Filter Feature](screenshots/filter4.png)


6. **Search Results**

![Search Feature](screenshots/search.png)


7. **Deleted Employees**
   
![Delete Feature](screenshots/delete_employee.png)
![Delete Feature](screenshots/deleted_employee.png)

8. **Edit Employees**

![Delete Feature](screenshots/editemployee1.png)
![Delete Feature](screenshots/editemployee2.png)

9. **Edit and Delete Organization**
   
![Edit Organization Feature](screenshots/edit_delete_organization.png)
![Edit Organization Feature](screenshots/edit_organization.png)



## 🧪 Testing

The project includes unit tests for critical functionality:

### Running Tests

```bash
cd backend
npm test
```

### Test Coverage

- **Employee API Tests**: Tests for creating employees, validation errors, and required fields
- **Authentication Tests**: Tests for signup, login, and authentication flow

Test files are located in `backend/tests/`:
- `employee.test.js` - Employee CRUD operations and validation
- `auth.test.js` - User authentication and authorization

## 📁 Project Structure

```
Minimac Assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── Employee.js        # Employee schema
│   │   │   ├── Organization.js    # Organization schema
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Authentication routes
│   │   │   ├── employeeRoutes.js  # Employee CRUD routes
│   │   │   └── organizationRoutes.js # Organization CRUD routes
│   │   ├── app.js                 # Express app configuration
│   │   ├── server.js              # Server entry point
│   │   └── seed.js                # Database seeding script
│   ├── tests/
│   │   ├── auth.test.js           # Authentication tests
│   │   └── employee.test.js       # Employee tests
│   ├── jest.config.js             # Jest configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # Axios configuration
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx   # Employee add/edit form
│   │   │   ├── EmployeeTable.jsx  # Employee table with pagination
│   │   │   ├── EmployeeFilters.jsx # Search and filter component
│   │   │   ├── OrganizationForm.jsx # Organization form
│   │   │   └── ProtectedRoute.jsx # Route protection component
│   │   ├── pages/
│   │   │   ├── Employees.jsx      # Main employees page
│   │   │   ├── AddEmployee.jsx    # Add employee page
│   │   │   ├── EditEmployee.jsx   # Edit employee page
│   │   │   ├── AddOrganization.jsx # Organization management page
│   │   │   ├── DeletedEmployees.jsx # Deleted employees page
│   │   │   ├── Auth.jsx           # Login/Signup page
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── Signup.jsx         # Signup page
│   │   ├── App.jsx                # Main app component
│   │   ├── App.css                # Application styles
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # React entry point
│   ├── package.json
│   └── vite.config.js             # Vite configuration
└── README.md                       # This file
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Sanitization**: All user inputs are sanitized to prevent injection attacks
- **CORS Configuration**: Cross-origin requests are properly configured
- **Environment Variables**: Sensitive data stored in environment variables

## ✨ Key Features

- ✅ Complete CRUD operations for Employees and Organizations
- ✅ Advanced search functionality (by name, email, position, department)
- ✅ Multi-criteria filtering (organization, department, status)
- ✅ Soft delete functionality with separate view for deleted records
- ✅ Pagination (10 records per page)
- ✅ Comprehensive form validation (frontend and backend)
- ✅ User authentication with JWT
- ✅ Responsive design for mobile and desktop
- ✅ Loading states and error handling
- ✅ Database seeding script for sample data
- ✅ Unit tests for critical functionality

## 🚧 Future Improvements

Potential enhancements for future development:

- [ ] Email notifications for employee events
- [ ] Advanced reporting and analytics
- [ ] Export data to CSV/Excel
- [ ] Bulk employee operations
- [ ] Employee photo upload
- [ ] Role-based access control (RBAC)
- [ ] Audit logs for employee changes
- [ ] Advanced search with date ranges
- [ ] Dashboard with statistics and charts
- [ ] Multi-language support

## 📝 Notes

- Phone number validation is currently configured for Indian mobile numbers (10 digits starting with 6-9)
- Salary field is optional but must be positive if provided
- Joining date cannot be set to a future date
- Organizations cannot be deleted if they have active employees
- Soft-deleted employees are excluded from main employee list but accessible via `/employees/deleted` endpoint

## 👤 Author

Pragya Singh

## 📄 License

This project is created as part of a technical assignment.


