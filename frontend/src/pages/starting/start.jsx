import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();
    const [showAbout, setShowAbout] = useState(false);

    const books = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "399", image: "https://placehold.co/400x600/1e293b/ffffff?text=Great+Gatsby" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: "499", image: "https://placehold.co/400x600/1e293b/ffffff?text=Mockingbird" },
        { id: 3, title: "1984", author: "George Orwell", price: "299", image: "https://placehold.co/400x600/1e293b/ffffff?text=1984" },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: "349", image: "https://placehold.co/400x600/1e293b/ffffff?text=Pride+Prejudice" },
    ];

    const handleBookClick = () => {
        navigate('/signup');
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            VidyaKosh
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => setShowAbout(!showAbout)}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={scrollToContact}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            Contact Us
                        </button>
                    </nav>

                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                    >
                        Sign Up
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Discover Your Next <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Favorite Book
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                        Explore a vast collection of knowledge, stories, and adventures. Join our community of readers today.
                    </p>
                </div>
            </section>

            {/* About Us Section (Conditional) */}
            {showAbout && (
                <section className="py-16 bg-white dark:bg-gray-800 animate-fade-in-down">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">About VidyaKosh</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                VidyaKosh is more than just an online bookstore; it's a gateway to wisdom.
                                We believe in the power of books to transform lives. Our mission is to make knowledge accessible
                                to everyone, everywhere. Whether you're a student, a professional, or a casual reader,
                                we have something for you.
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Books Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Featured Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                onClick={handleBookClick}
                                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                        {book.author}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-blue-600">₹{book.price}</span>
                                        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Us / Footer */}
            <footer id="contact-us" className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">VidyaKosh</h3>
                            <p className="text-gray-400">
                                Connecting readers with their next great adventure.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li>Email: support@vidyakosh.com</li>
                                <li>Phone: +91 123 456 7890</li>
                                <li>Address: Knowledge Park, Digital City</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        © 2024 VidyaKosh. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Start;
