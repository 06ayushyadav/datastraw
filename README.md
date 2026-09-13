# Customer Support Ticketing CRM

A full-stack Customer Support Ticketing CRM built as part of the Datastraw Technologies AI + Tech Intern Assessment.

The application allows support teams to create, search, filter, view, and update customer support tickets with notes and priority management.

## Live Application

**Live Demo:** https://datastraw-oyx8.onrender.com/

## GitHub Repository

**Repository:** https://github.com/06ayushyadav/datastraw

---

## Features

### Core Features

* Create customer support tickets
* Auto-generated unique ticket IDs such as `TKT-001`
* Automatic ticket creation timestamp
* Customer name and email validation
* Ticket subject and description
* View all support tickets
* Search tickets by:

  * Customer name
  * Ticket ID
  * Customer email
  * Subject
  * Description
* Filter tickets by status:

  * Open
  * In Progress
  * Closed
* View complete ticket details
* Update ticket status
* Add notes/comments to tickets
* Responsive and clean user interface

### Additional Feature

#### Priority Management

Tickets support four priority levels:

* Low
* Medium
* High
* Urgent

Priority can be selected while creating a ticket and updated later from the ticket details page.

Priority can also be used as a filter from the dashboard.

This was added to make the system more useful for a real support team because urgent customer issues can be identified and handled faster.

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript ES6
* React Router
* Axios
* Tailwind CSS
* Lucide React
* React Hot Toast

### Backend

* Node.js
* Express.js
* JavaScript ES6 Modules
* Mongoose
* MongoDB
* dotenv
* CORS
* Helmet
* Morgan
* express-rate-limit
* Validator

### Database

* MongoDB

### Deployment

* Frontend: [Add platform]
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```text
Drawstraw/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StatusFilter.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   └── TicketTable.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateTicket.jsx
│   │   │   └── TicketDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   └── ticketService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── modules/
│   │   │   ├── tickets/
│   │   │   │   ├── ticket.controller.js
│   │   │   │   ├── ticket.model.js
│   │   │   │   └── ticket.routes.js
│   │   │   │
│   │   │   └── note/
│   │   │       └── note.model.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateTicketId.js
│   │   │
│   │   └── index.js
│   │
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

> Adjust the structure above if your actual folder names differ.

---

## API Endpoints

### 1. Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "I cannot login to my account.",
  "priority": "High"
}
```

Example response:

```json
{
  "success": true,
  "ticket_id": "TKT-001",
  "created_at": "2026-09-13T08:00:00.000Z"
}
```

---

### 2. Get Tickets

```http
GET /api/tickets
```

Optional query parameters:

```text
?page=1
&limit=10
&search=john
&status=Open
&priority=High
```

Example:

```http
GET /api/tickets?search=john&status=Open&priority=High
```

The search functionality checks customer name, ticket ID, email, subject, and description.

---

### 3. Get Ticket Details

```http
GET /api/tickets/:ticket_id
```

Example:

```http
GET /api/tickets/TKT-001
```

Returns the complete ticket information along with its notes.

---

### 4. Update Ticket

```http
PUT /api/tickets/:ticket_id
```

Example request:

```json
{
  "status": "In Progress",
  "priority": "Urgent",
  "notes": "Issue has been assigned to the support team."
}
```

Example response:

```json
{
  "success": true,
  "updated_at": "2026-09-13T08:30:00.000Z"
}
```

---

## Ticket Status

The application supports three ticket statuses:

```text
Open
In Progress
Closed
```

New tickets are created with the default status:

```text
Open
```

---

## Ticket Priority

The application supports four priority levels:

```text
Low
Medium
High
Urgent
```

New tickets use:

```text
Medium
```

as the default priority.

---

## Database Design

The application uses MongoDB with separate collections for tickets and notes.

### Ticket

Main fields include:

```text
ticket_id
customer_name
customer_email
subject
description
status
priority
createdAt
updatedAt
```

### Note

Main fields include:

```text
ticket_id
note_text
createdAt
```

Ticket IDs are unique and generated automatically.

---

## Environment Variables

### Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### Frontend

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, replace the API URL with the deployed backend URL.

---

## Installation

### 1. Clone the repository

```bash
git https://github.com/06ayushyadav/datastraw.git
```

```bash
cd Drawstraw
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Create the `.env` file and add your MongoDB connection string.

### 3. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

Create the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ Axios REST API
 ▼
Express.js Backend
 │
 │ Mongoose
 ▼
MongoDB Atlas
```

### Ticket Creation Flow

```text
Create Ticket Form
        ↓
Frontend Validation
        ↓
POST /api/tickets
        ↓
Backend Validation
        ↓
Generate Unique Ticket ID
        ↓
Save Ticket in MongoDB
        ↓
Return Ticket ID + Timestamp
        ↓
Display Success Message
```

### Ticket Update Flow

```text
Ticket Details
      ↓
Update Status / Priority
      ↓
Add Note
      ↓
PUT /api/tickets/:ticket_id
      ↓
Update Ticket
      ↓
Create Note
      ↓
Return Updated Timestamp
```

---

## Validation & Error Handling

The backend validates:

* Required fields
* Customer name
* Email format
* Subject length
* Description length
* Ticket status
* Ticket priority

The API also handles:

* Invalid ticket IDs
* Duplicate ticket IDs
* MongoDB validation errors
* Missing tickets
* Invalid request data
* Server errors

---

## Security & Reliability

The backend includes:

* Helmet for HTTP security headers
* CORS configuration
* Rate limiting
* Environment variables for sensitive configuration
* Input validation
* MongoDB schema validation
* Centralized error handling
* Unique ticket ID generation

---

## Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The dashboard provides a responsive ticket management interface with search, filters, pagination, and ticket details.

---

## Future Improvements

With additional development time, the system could be extended with:

* User authentication and role-based access
* Support agent assignment
* Ticket categories
* Customer history
* File attachments
* Email notifications
* Real-time ticket updates using WebSockets
* Advanced analytics and reporting
* Audit logs
* SLA and escalation management

These features were intentionally kept outside the current scope to focus on delivering a stable core CRM system.

---

## Challenges Solved

### Unique Ticket ID Generation

Ticket IDs need to remain unique even when multiple tickets are created. An atomic counter-based approach is used to generate sequential IDs such as:

```text
TKT-001
TKT-002
TKT-003
```

### Search

Search was implemented across multiple ticket fields so support users can quickly find tickets using customer information, ticket ID, email, subject, or description.

### Production Deployment

The application was deployed with a separate frontend and backend architecture and configured using environment variables for production API and database connections.

---

## Assignment Requirements Covered

| Requirement              | Status    |
| ------------------------ | --------- |
| Create Tickets           | Completed |
| Auto-generated Ticket ID | Completed |
| Timestamp                | Completed |
| List Tickets             | Completed |
| Search                   | Completed |
| Status Filter            | Completed |
| Ticket Details           | Completed |
| Update Status            | Completed |
| Notes / Comments         | Completed |
| Priority Management      | Bonus     |
| Responsive UI            | Completed |
| REST API                 | Completed |
| MongoDB Database         | Completed |
| Deployment               | Completed |


## Author

**Ayush Yadav**

Built as part of the Datastraw Technologies AI + Tech Intern Assessment.
