import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AddCourse from "./pages/AddCourse";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="students" element={<Students />} />
          <Route path="add-student" element={<AddStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
