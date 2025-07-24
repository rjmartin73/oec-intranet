import { useState } from "react";
import {
    HomeIcon,
    LockClosedIcon,
    InformationCircleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const navItems = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Password Strength', icon: LockClosedIcon },
    { name: 'About', icon: InformationCircleIcon },
];

export default function Sidebar(){

    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className="flex h-screen">
            {/* Sidebar */ }
            <div
                className={`transition-all duration-300 ${
                    isOpen ? 'w-64' : 'w-16'
                } flex flex-col`} >

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 ">
                    <div className="flex items-center gap-3">
                        <img src="/owen-electric-logo-1.svg" alt="Owen Logo"
                        className={`transition-all duration-300 ${
                            isOpen ? 'w-32 h-32' : 'w-8 h-8 mx-auto'
                        }`} />
                    </div>
                    </div>
                </div>
        </div>
    );
}; 