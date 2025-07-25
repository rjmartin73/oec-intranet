import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import PasswordStrengthTester from '../pages/PasswordStrengthTester';
import QuoteWidget from '../pages/QuoteWidget';
import RocketlaneTasks from '../pages/RocketlaneTasks';
import { useState } from 'react';



export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  />
      <main className={`flex-1 overflow-y-auto bg-gray-50 p-6 ${isOpen ? 'mt-[8.5rem]' : 'mt-8'}`}>
        <Routes>
          <Route path="/passwordstrengthtester" element={<PasswordStrengthTester />} />
          <Route path="/quotewidget" element={<QuoteWidget />} />
          <Route path="/rocketlanetasks" element={<RocketlaneTasks />} />
        </Routes>
      </main>
    </div>
  );
}
