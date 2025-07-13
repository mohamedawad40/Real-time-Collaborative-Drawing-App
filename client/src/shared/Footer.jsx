// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Github } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-red-600 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
            <h3 className="text-lg font-semibold mb-3">DrawSpace</h3>
            <p className="text-sm opacity-90">
                Real-time collaborative drawing with friends.
            </p>
            </div>
            <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/rooms" className="hover:underline">Rooms</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
            </div>
            <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200"><Facebook size={20} /></a>
                <a href="#" className="hover:text-gray-200"><Twitter size={20} /></a>
                <a href="#" className="hover:text-gray-200"><Github size={20} /></a>
            </div>
            </div>
        </div>
        <div className="border-t border-red-500 py-4">
            <p className="text-center text-sm opacity-90">
            © {new Date().getFullYear()} DrawSpace. All rights reserved.
            </p>
        </div>
        </footer>
    );
}


export default Footer;