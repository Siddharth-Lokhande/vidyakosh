import { useState, useEffect } from "react";

export default function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, 300); // debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="border border-gray-300 p-2 rounded w-full"
      />

      {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}

      <ul className="mt-2 bg-white rounded shadow p-2">
        {results.map((r, idx) => (
          <li key={idx} className="border-b last:border-none py-1">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
