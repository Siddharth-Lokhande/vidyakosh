import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/navbar';
import Footer from '../../components/footer';

const ViewCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/viewcart');
            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch('http://localhost:8080/viewcart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookId })
            });

            if (response.ok) {
                // Remove item from local state
                setCartItems(cartItems.filter(item => item.bookId !== bookId));
            } else {
                console.error('Failed to delete item');
                alert('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error removing item from cart');
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Dashboard />

            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

                {loading ? (
                    <div className="text-center text-gray-400">Loading cart...</div>
                ) : cartItems.length === 0 ? (
                    <div className="text-center text-gray-400">
                        <p className="text-xl">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.bookId}
                                className="bg-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700 shadow-lg hover:border-indigo-500 transition-colors"
                            >
                                <div className="flex-grow space-y-2 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                                    <p className="text-gray-400"><span className="font-semibold text-indigo-400">Author:</span> {item.author}</p>
                                    <p className="text-gray-400"><span className="font-semibold text-indigo-400">ISBN:</span> {item.isbn}</p>
                                    <p className="text-gray-400"><span className="font-semibold text-indigo-400">Seller:</span> {item.sellerName}</p>
                                </div>

                                <div className="flex items-center gap-6 mt-4 md:mt-0">
                                    <div className="text-2xl font-bold text-green-400">
                                        ₹{item.price}
                                    </div>

                                    <button
                                        onClick={() => handleDelete(item.bookId)}
                                        className="text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-full"
                                        title="Remove from cart"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-300">Total Amount</span>
                            <span className="text-3xl font-bold text-white">₹{totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ViewCart;
