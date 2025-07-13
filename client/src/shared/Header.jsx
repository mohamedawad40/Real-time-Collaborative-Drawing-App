// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { PenTool, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center space-x-2">
            <PenTool size={28} className="text-red-600" />
            <span className="text-2xl font-bold text-red-600">DrawSpace</span>
            </Link>

            <nav className="hidden md:flex space-x-8 text-gray-700">
            <Link to="/rooms" className="hover:text-red-600 transition">Rooms</Link>
            <Link to="/create" className="hover:text-red-600 transition">Create</Link>
            <Link to="/chat" className="hover:text-red-600 transition">Chat</Link>
            </nav>

            <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600 transition"
            >
            {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {open && (
            <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col px-6 py-4 space-y-3 text-gray-700">
                <Link to="/rooms" className="hover:text-red-600 transition">Rooms</Link>
                <Link to="/create" className="hover:text-red-600 transition">Create</Link>
                <Link to="/chat" className="hover:text-red-600 transition">Chat</Link>
            </nav>
            </div>
        )}
    </header>
);
}

export default Header;