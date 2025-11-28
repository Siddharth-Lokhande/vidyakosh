import React from 'react';

const Trending = () => {
  // Data for the content cards. In a real app, this might come from an API.
  const cardData = [
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
      imgAlt: "The Alchemist Book Cover",
      subtitle: "FICTION",
      title: "The Alchemist",
      description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      imgAlt: "Atomic Habits Book Cover",
      subtitle: "SELF-HELP",
      title: "Atomic Habits",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
      imgAlt: "The Psychology of Money Book Cover",
      subtitle: "FINANCE",
      title: "The Psychology of Money",
      description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
      imgAlt: "Rich Dad Poor Dad Book Cover",
      subtitle: "FINANCE",
      title: "Rich Dad Poor Dad",
      description: "Robert Kiyosaki's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing."
    }
  ];

  return (
    <section className="text-gray-600 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-white">
              Trending Books
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-400">
            Find your next favorite book.   Shop online for exclusive discounts.<br></br>"Browse our new collection online." Get 20% off your first order*.
          </p>
        </div>

        {/* Content Cards Grid */}
        <div className="flex flex-wrap -m-4">
          {cardData.map((card, index) => (
            <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={card.imgSrc}
                  alt={card.imgAlt}
                  onError={(e) => {
                    // Fallback in case the placeholder service fails
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/720x400/333/fff?text=Image+Error`;
                  }}
                />
                <h3 className="tracking-widest text-indigo-500 dark:text-indigo-400 text-xs font-medium title-font">
                  {card.subtitle}
                </h3>
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-4">
                  {card.title}
                </h2>
                <p className="leading-relaxed text-base dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;