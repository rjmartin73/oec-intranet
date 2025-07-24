import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RocketlaneTasks from "./components/RocketlaneTasks"
import QuoteWidget from "./components/QuoteWidget";
import QuoteBrowser from "./components/QuoteBrowser";
import "./index.css";
import PasswordStrengthTester from "./components/PasswordStrengthTester";
import Sidebar from "./components/Sidebar"

// import 'bootstrap/dist/css/bootstrap.min.css';


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

// function Test() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">? Test</h1>
//       <p>This is a Test Page.</p>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <nav className="bg-owen-green text-white p-4 flex-auto">
        <Link to="/" className="hover:underline p-4">Home</Link>
        <Link to="/about" className="hover:underline p-4">About</Link>
        <Link to="/RocketlaneTasks" className="hover:underline p-4">Rocketlane</Link>
        <Link to="/passwordstrength" className="hover:underline p-4">Password Strength</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/RocketlaneTasks" element={<RocketlaneTasks /> } />
        <Route path="/quotes" element={<QuoteWidget />}></Route>
        <Route path="/quotes-static" element={<QuoteWidget refreshable={false} />} />
        <Route path="/einstein" element={<QuoteWidget initialAuthor="Albert Einstein" />} />
        <Route path="/maya" element={<QuoteWidget initialAuthor="Maya Angelou" />} />
        <Route path="/quotes-small" element={<QuoteWidget layout="compact" initialAuthor="Confucius" refreshable={false} />} />
        <Route path="/quote-browser" element={<QuoteBrowser />}></Route>
        <Route path="/passwordstrength" element={<PasswordStrengthTester />} />

      </Routes>
    </Router>
  );
}

export default App;
