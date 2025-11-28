import React from 'react';

const Browse = () => {
  // Data for the content cards. In a real app, this might come from an API.
  const cardData = [
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
      imgAlt: "Harry Potter and the Sorcerer's Stone Book Cover",
      subtitle: "FANTASY",
      title: "Harry Potter and the Sorcerer's Stone",
      description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg",
      imgAlt: "The Lord of the Rings Book Cover",
      subtitle: "FANTASY",
      title: "The Lord of the Rings",
      description: "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
      imgAlt: "The Hobbit Book Cover",
      subtitle: "FANTASY",
      title: "The Hobbit",
      description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole in Bag End."
    },
    {
      imgSrc: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
      imgAlt: "The Da Vinci Code Book Cover",
      subtitle: "THRILLER",
      title: "The Da Vinci Code",
      description: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum."
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