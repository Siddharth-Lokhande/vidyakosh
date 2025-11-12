import React, { useState, useEffect, useCallback } from 'react';

// --- SVG Icons ---
// Replaces lucide-react 'Search'
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Replaces lucide-react 'ChevronDown'
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Replaces lucide-react 'Loader2'
const LoaderIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);
// --- End SVG Icons ---

// This is the main component that holds the state and logic
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce function
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // --- Changed: fetchResults now accepts (query, type) and is memoized ---
  const fetchResults = useCallback((query, type = searchType) => {
    if (!query || query.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Build URL using the selected option (type)
    const backendUrl = 'http://localhost:8080';
    const option = encodeURIComponent(type);
    const url = `${backendUrl}/${option}/search?q=${encodeURIComponent(query)}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        setError(err.message);
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // no deps needed because setState functions are stable

  // Create a debounced version that forwards both query and type
  const debouncedFetch = useCallback(debounce((q, t) => fetchResults(q, t), 300), [fetchResults]);

  // Effect to call the API when searchTerm or searchType changes
  useEffect(() => {
    debouncedFetch(searchTerm, searchType);
  }, [searchTerm, searchType, debouncedFetch]);

  return (
    <div className="w-full max-w-2xl">
      {/* The main search bar container */}
      <div className="relative flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
        
        {/* Left Side: Dropdown */}
        <div className="relative flex items-center">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="appearance-none bg-transparent pl-5 pr-9 py-2.5 text-sm text-black font-medium focus:outline-none cursor-pointer"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publication">Publication</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Middle: Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search"
          className="w-full h-full p-2.5 pl-4 text-sm text-black placeholder-gray-700 focus:outline-none"
        />

        {/* Right Side: Search Icon */}
        <div className="pr-5 pl-2">
          <SearchIcon className="w-5 h-5 text-gray-700" />
        </div>
      </div>

      {searchTerm && (
        <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-4 flex items-center justify-center text-black">
              <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
              Loading...
            </div>
          )}
          {error && (
            <div className="p-4 text-black">Error: {error}</div>
          )}
          {!loading && !error && (
            <ul>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <li key={index} className="p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer text-black">
                    {result}
                  </li>
                ))
              ) : (
                <li className="p-3 text-black">No results found.</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;