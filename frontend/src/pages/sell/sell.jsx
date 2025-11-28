import React, { useState } from 'react';
import Dashboard from '../../components/navbar';

const Sell = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        bookName: '',
        bookType: 'Fiction',
        author: '',
        isbn: '',
        price: '',
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('bookName', formData.bookName);
        data.append('bookType', formData.bookType);
        data.append('author', formData.author);
        data.append('isbn', formData.isbn);
        data.append('price', formData.price);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:8080/sellbook', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                alert('Book listed for sale successfully!');
                setShowModal(false);
                setFormData({
                    bookName: '',
                    bookType: 'Fiction',
                    author: '',
                    isbn: '',
                    price: '',
                    image: null
                });
            } else {
                alert('Failed to list book.');
            }
        } catch (error) {
            console.error('Error listing book:', error);
            alert('Error listing book.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Dashboard />
            <div className="relative p-8">
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-4 right-4 bg-black text-white px-6 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
                    style={{ borderRadius: '20px' }}
                >
                    Add Book
                </button>

                <div className="mt-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">Sell Your Books</h1>
                    <p className="text-gray-400">List your old books and find them a new home.</p>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md relative border border-gray-700">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-center">Sell a Book</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Book Name</label>
                                    <input
                                        type="text"
                                        name="bookName"
                                        value={formData.bookName}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Book Type</label>
                                    <select
                                        name="bookType"
                                        value={formData.bookType}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Fiction">Fiction</option>
                                        <option value="Non-Fiction">Non-Fiction</option>
                                        <option value="Biography">Biography</option>
                                        <option value="Education">Education</option>
                                        <option value="Sci-Fi">Sci-Fi</option>
                                        <option value="Mystery">Mystery</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">ISBN Code</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price to Sell</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Book Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sell;
