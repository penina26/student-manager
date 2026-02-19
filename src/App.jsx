import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import AddCourse from "./pages/courses/AddCourse";
import EditCourse from "./pages/courses/EditCourse";
import Students from "./pages/students/Students";
import AddStudent from "./pages/students/AddStudent";
import StudentDetail from "./pages/students/StudentDetail";
import EditStudent from "./pages/students/EditStudent";


function App() {
  return (
    <BrowserRouter>
      {/* Toasts show on all pages */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="courses/:id/edit" element={<EditCourse />} />

          <Route path="students" element={<Students />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="students/:id/edit" element={<EditStudent />} />

          {/* 404 */}
          <Route path="*" element={<div className="text-center py-5">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
