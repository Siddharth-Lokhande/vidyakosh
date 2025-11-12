import React from 'react';

/**
 * A React component that displays a product detail page, including an image,
 * title, reviews, and description.
 * This component is styled using Tailwind CSS.
 */
const Product = () => {
  // State and constants for options have been removed.

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Product Image */}
          <img
            alt="Book cover for The Catcher in the Rye"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-lg"
            src="https://placehold.co/400x400/6366f1/ffffff?text=Book+Cover"
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/400x400/333/fff?text=Image+Error`;
            }}
          />
          {/* Product Details */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 dark:text-gray-400 tracking-widest">
              CLASSIC LITERATURE
            </h2>
            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>

            {/* Ratings and Social */}
            <div className="flex mb-4">
              <span className="flex items-center">
                {/* Star icons - now golden */}
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    /* Changed to text-yellow-500 */
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  /* Changed to text-yellow-500 */
                  className="w-4 h-4 text-yellow-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400 ml-3">4.0</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 dark:border-gray-700 space-x-2">
                {/* Social media icons */}
                <a className="text-gray-500 hover:text-indigo-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 hover:text-indigo-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 hover:text-indigo-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed dark:text-gray-300">
              The Catcher in the Rye is a novel by J. D. Salinger.
              Published in 1951, the novel details two days in the life of
              16-year-old Holden Caulfield after he has been expelled from
              prep school. A classic novel about angst, alienation, and
              the complexities of growing up.
            </p>

            {/* Book Details Section */}
            <div className="text-sm text-gray-700 dark:text-gray-300 mt-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700 mb-5">
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Author</span>
                <span>J. D. Salinger</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Publisher</span>
                <span>Little, Brown and Company</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Language</span>
                <span>English</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-medium w-28 inline-block">Total Pages</span>
                <span>224</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-medium w-28 inline-block">ISBN-13</span>
                <span>978-0316769488</span>
              </div>
            </div>

            {/* Options (Color/Size) section removed */}

            {/* Price and CTA */}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                $18.99
              </span>
              <button
                /* Changed to bg-black and hover:bg-gray-800 */
                className="flex ml-auto text-black bg-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded"
              >
                Add to Cart
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