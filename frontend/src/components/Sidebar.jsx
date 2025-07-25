import { useState } from "react";
import {
  HomeIcon,
  Lock,
  Info,
  Menu,
  X,
  ClipboardList,
  Quote,
  CircleQuestionMark,
  LockOpen,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  //   const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    {
      name: "Password Strength",
      path: "/passwordstrengthtester",
      icon: isOpen ? LockOpen :Lock,
    },
    {
      name: "Rocketlane Tasks",
      path: "/rocketlanetasks",
      icon: ClipboardList,
    },
    { name: "Quote Widget", path: "/quotewidget", icon: Quote },
    { name: "About", path: "/about", icon: Users },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        } `}
      >
        {/* Top: Logo area */}
        <div className="bg-white border-b border-gray-200 px-4 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/owen-electric-logo-1.svg"
              alt="Owen Logo"
              className={`transition-all duration-300 ${
                isOpen ? "w-32 h-32" : "hidden"
              }`}
            />
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-owen-green" />
            )}
          </button>
        </div>
        {/* Bottom navigation */}
        <nav className="flex-1 space-y-2 p-4 bg-owen-green text-white">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded hover:bg-white/10 ${
                  isActive ? "bg-white/20" : ""
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {isOpen ? <span>{name}</span> : ""}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
