import NAVBAR from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import "./App.css";

export default function App() {
  return (
    <Router>
      <NAVBAR />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projectdetails/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}
