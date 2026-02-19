# Student Course Management System (SCMS)

A simple **Student Course Management System** built with **React** and a **JSON Server** backend.  
SCMS helps manage **students**, **courses**, and basic enrollment linking using **courseCode**.

---

## Authors
- Penina Wanyama  
- Samuel Wanjau  
- Sharon Ouko  
- Sylvana Wanjiru  
- Robert Mmasi  

---

## Introduction
A Student Course Management System (SCMS) is a software application designed to manage student information, course details, enrollments, and academic records efficiently.  
It helps administrators manage students and courses, while students can view enrolled courses and results.

---

## Problem Statement
Many academic institutions struggle with managing student and course data due to manual processing. This leads to:
- Lost information
- Data duplication
- Inconsistencies in records

---

## Solution
SCMS provides a platform for managing student and course registrations and enables easy access to consistent and complete information.

---

## Objectives
- Maintain student records  
- Manage course details  
- Handle course enrollment (via course codes)  
- Reduce manual paperwork  

---

## Features
### Students
- Add student
- View all students
- View student detail
- Edit student
- Delete student
- Prevent duplicate **registration numbers (regNo)**

### Courses
- Add course
- View all courses
- View course detail
- Edit course
- Delete course
- Prevent duplicate **course codes (code)**

---

## Technologies Used
- **React** (Frontend UI)
- **React Router DOM** (Routing)
- **Bootstrap 5** (Styling/layout)
- **Font Awesome** (Icons)
- **react-hot-toast** (Alerts/toasts)
- **JSON Server** (Mock REST API)

---

## Data Model
### Student
```
{
  "id": "1",
  "name": "Amina Ali",
  "email": "amina@email.com",
  "regNo": "DS/001/2026",
  "year": 1,
  "courseCode": "CS6"
}
```
### Course
```
{
  "id": "1",
  "name": "React JS",
  "description": "Learn React from basics",
  "code": "CS6",
  "duration": "3 Months",
  "fee": 500
}
```

## Project Scope
- Create registration forms for students and courses

- Read student and course information

- Update existing records

- Delete student or course information

- Deploy to a web hosting service

## Folder Structure (high level)

``` 
src/
  components/
  pages/
    students/
    courses/
  App.jsx
  main.jsx
db.json
```
## Getting Started

### 1) Clone the repo
git clone <your-repo-url>
cd <your-project-folder>

### 2) Install dependencies
```
npm install
```

### 3) Start JSON Server (backend)
```
npx json-server --watch data/db.json --port 3001
```
### 4) Start React app (frontend)
```
npm run dev
```
* Your app will run on something like:
`http://localhost:5173`

### Routes
*Students*

* `/students -> list`

* `/add-student -> create`

* `/students/:id -> detail`

* `/students/:id/edit -> edit`

Courses

* `/courses -> list`

* `/add-course -> create`

* `/courses/:id -> detail`

* `/courses/:id/edit `

### Notes

Student enrollment uses courseCode, so course codes should be unique.

Student regNo is saved in uppercase and duplicates are blocked.

Course code is saved in uppercase and duplicates are blocked.

### Future Plans

Use a commercial database (e.g., PostgreSQL/MySQL)

Add a real backend API (Node/Express or Django REST Framework)

Track student performance and results

Improve authentication/roles (Admin/Student)

