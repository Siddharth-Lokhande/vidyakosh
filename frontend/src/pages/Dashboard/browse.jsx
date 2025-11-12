import React from 'react';
const Browse = () => {
  // Data for the content cards. In a real app, this might come from an API.
  const cardData = [
    {
      imgSrc: "https://placehold.co/720x400/6366f1/ffffff?text=Ancient+Ruins",
      imgAlt: "Placeholder image of ancient ruins",
      subtitle: "ANCIENT RUINS",
      title: "Chichen Itza",
      description: "Explore the mysteries of the Mayan civilization and the iconic El Castillo pyramid."
    },
    {
      imgSrc: "https://placehold.co/721x401/6366f1/ffffff?text=Historic+Landmark",
      imgAlt: "Placeholder image of the Colosseum in Rome",
      subtitle: "HISTORIC LANDMARK",
      title: "Colosseum, Rome",
      description: "Step back in time to the era of gladiators in this magnificent ancient arena."
    },
    {
      imgSrc: "https://placehold.co/722x402/6366f1/ffffff?text=World+Wonder",
      imgAlt: "Placeholder image of the Great Pyramid of Giza",
      subtitle: "WORLD WONDER",
      title: "Great Pyramid of Giza",
      description: "Marvel at the last of the Seven Wonders of the Ancient World, an icon of Egypt."
    },
    {
      imgSrc: "https://placehold.co/723x403/6366f1/ffffff?text=Modern+City",
      imgAlt: "Placeholder image of the Golden Gate Bridge",
      subtitle: "MODERN CITY",
      title: "San Francisco",
      description: "Discover the iconic Golden Gate Bridge, cable cars, and vibrant culture."
    }
  ];

  return (
    <section className="text-gray-600 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-white">
              Browse more 
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

export default Browse;