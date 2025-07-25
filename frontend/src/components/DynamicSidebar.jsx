import { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  ClipboardList,
  FileText,
  Share2,
  BookOpenText,
  Users,
  X,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Dummy current user and nav data — replace with real data/API
const currentUser = {
  id: 1,
  name: "Ryan",
  role: "Admin",
  favorites: [2, 4],
};

const navLinks = [
  { id: 1, label: "Home", icon: "HomeIcon", url: "/", section: "General", rolesAllowed: ["*"] },
  { id: 2, label: "Rocketlane Tasks", icon: "ClipboardList", url: "/rocketlanetasks", section: "Favorites", rolesAllowed: ["Admin", "PM"] },
  { id: 3, label: "SharePoint", icon: "Share2", url: "/sharepoint", section: "Links", rolesAllowed: ["*"] },
  { id: 4, label: "My Documents", icon: "FileText", url: "/documents", section: "Favorites", rolesAllowed: ["*"] },
  { id: 5, label: "Training", icon: "BookOpenText", url: "/training", section: "Links", rolesAllowed: ["*"] },
  { id: 6, label: "HR Forms", icon: "Users", url: "/hr", section: "Links", rolesAllowed: ["HR", "Admin"] },
];

// Map string to Lucide icons
const iconMap = {
  HomeIcon,
  ClipboardList,
  FileText,
  Share2,
  BookOpenText,
  Users,
};

export default function DynamicSidebar({ isOpen, setIsOpen }) {
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    const links = navLinks.filter(link =>
      link.rolesAllowed.includes("*") || link.rolesAllowed.includes(currentUser.role)
    );
    setFilteredLinks(links);
  }, []);

  // Group links by section
  const grouped = filteredLinks.reduce((acc, link) => {
    const section = currentUser.favorites.includes(link.id) || link.section === "Favorites"
      ? "Favorites"
      : link.section || "Other";
    acc[section] = acc[section] || [];
    acc[section].push(link);
    return acc;
  }, {});

  return (
    <div className="flex h-screen">
      {/* Sidebar container */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Top Logo & Toggle Button */}
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

        {/* Navigation links */}
        <nav className="flex-1 space-y-4 p-4 bg-owen-green text-white overflow-y-auto">
          {Object.entries(grouped).map(([section, links]) => (
            <div key={section}>
              {isOpen && (
                <h4 className="uppercase text-xs text-green-200 px-2 mb-1">
                  {section}
                </h4>
              )}
              <ul className="space-y-1">
                {links.map(link => {
                  const Icon = iconMap[link.icon] || FileText;
                  return (
                    <NavLink
                      key={link.id}
                      to={link.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-2 py-2 rounded hover:bg-white/10 ${
                          isActive ? "bg-white/20" : ""
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      {isOpen ? <span>{link.label}</span> : ""}
                    </NavLink>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
