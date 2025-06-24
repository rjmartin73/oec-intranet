import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🏠 Home</h1>
      <p>Welcome to the OEC Intranet.</p>
    </div>
  );
}

function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">ℹ️ About</h1>
      <p>This is a secure intranet platform for Owen Electric employees.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
