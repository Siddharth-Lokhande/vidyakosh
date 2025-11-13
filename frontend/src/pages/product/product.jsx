import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A React component that displays a product detail page, including an image,
 * title, reviews, and description.
 * This component is styled using Tailwind CSS.
 * ${bookId}
 */
const Product = () => {
  const location = useLocation();
  const bookId = location.state?.id || 1; // fallback to 1 for direct render

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!bookId) {
      setError("No book id provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/getbook/1`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book details");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setBook(null);
      })
      .finally(() => setLoading(false));
  }, [bookId]);

  // --- Add to Cart handler ---
  const handleAddToCart = async () => {
    try {
      const res = await fetch(`http://localhost:8080/addtocart/${bookId}`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.addtocart === true) {
        setAdded(true);
      }
    } catch (e) {
      // Optionally handle error
    }
  };

  if (loading) {
    return (
      <section className="text-gray-600 body-font overflow-hidden bg-white dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto text-center">
          <span className="text-lg text-gray-700 dark:text-gray-200">Loading...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-gray-600 body-font overflow-hidden bg-white dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto text-center">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      </section>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Product Image */}
          <img
            alt={`Book cover for ${book.title || "Book"}`}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-lg"
            src={book.imageUrl || "https://placehold.co/400x400/6366f1/ffffff?text=Book+Cover"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x400/333/fff?text=Image+Error`;
            }}
          />
          {/* Product Details */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 dark:text-gray-400 tracking-widest">
              {book.category || "BOOK"}
            </h2>
            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
              {book.title || "Untitled"}
            </h1>

            {/* Ratings and Social */}
            <div className="flex mb-4 items-center justify-between">
              <span className="flex items-center">
                {/* Star icons */}
                {[...Array(Math.round(book.rating || 4))].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 dark:text-gray-400 ml-3">{book.rating + " Rating" || "N/A"}</span>
              </span>
              <span className="flex gap-4 ml-6">
                {/* Facebook */}
                <a href="#" className="text-gray-500 hover:text-blue-600" title="Share on Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"></path>
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" className="text-gray-500 hover:text-blue-400" title="Share on Twitter">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"></path>
                  </svg>
                </a>
                {/* Share */}
                <a href="#" className="text-gray-500 hover:text-green-600" title="Share">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M18 8a3 3 0 10-2.83-4H8.83A3 3 0 106 8c0 .13.01.26.02.39l7.13 3.56a3.02 3.02 0 000 1.1l-7.13 3.56A3 3 0 106 20a3 3 0 002.83-4h6.34A3 3 0 1018 16a2.99 2.99 0 00-2.83-2H8.83A3 3 0 106 8c0-.13-.01-.26-.02-.39l7.13-3.56a3.02 3.02 0 000-1.1l-7.13-3.56A3 3 0 106 4a3 3 0 002.83 4h6.34A3 3 0 1018 8z"></path>
                  </svg>
                </a>
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed dark:text-gray-300">
              {book.description || "No description available."}
            </p>

            {/* Book Details Section */}
            <div className="text-sm text-gray-700 dark:text-gray-300 mt-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700 mb-5">
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Author</span>
                <span>{book.author || "Unknown"}</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Publisher</span>
                <span>{book.publisher || "Unknown"}</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Language</span>
                <span>{book.language || "Unknown"}</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Total Pages</span>
                <span>{book.pages || "N/A"}</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-medium w-28 inline-block">ISBN-13</span>
                <span>{book.isbn || "N/A"}</span>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                ₹{book.price || "N/A"}
              </span>
              <button
                className={`flex ml-auto border-0 py-2 px-6 focus:outline-none rounded
                  ${added ? "bg-green-600 text-white" : "text-black bg-white hover:bg-gray-800 hover:text-white"}`}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Product };
export default Product;