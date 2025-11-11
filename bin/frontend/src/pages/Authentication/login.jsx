import React, { useState } from 'react';

const Login = () => {
  // Define the target endpoint for the Tomcat server
  const TOMCAT_SERVER_URL = 'http://localhost:8080/api/signup'; // <-- Change this to your actual Tomcat endpoint

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages
  const [isLoading, setIsLoading] = useState(false); // To manage button state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true); // Disable button while request is in progress

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(TOMCAT_SERVER_URL, {
        method: 'POST',
        headers: {
          // Specify that we are sending JSON data
          'Content-Type': 'application/json',
        },
        // Convert the JavaScript object to a JSON string
        body: JSON.stringify(userData), 
      });

      if (response.ok) {
        // Assuming the server returns a successful JSON response
        const data = await response.json(); 
        setMessage(`Sign up successful! Welcome, ${data.email || email}!`); // Use data.email if server sends it back
        setEmail(''); // Clear form fields on success
        setPassword('');
      } else {
        // Handle server errors (e.g., 400 Bad Request, 409 Conflict)
        const errorText = await response.text();
        setMessage(`Sign up failed: ${response.status} - ${errorText || 'Server error'}`);
      }
    } catch (error) {
      // Handle network errors (e.g., server is down, CORS issue)
      console.error('Network or CORS error:', error);
      setMessage('Network error. Could not connect to the server.');
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <section className="text-white-700 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        {/* Left Content Area (Bookstore Info) */}
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white-900">
            Discover Your Next Favorite Read at Our Online Book Store
          </h1>
          <p className="leading-relaxed mt-4">
            Explore millions of titles, from bestsellers to rare literary gems. Sign up now for exclusive discounts and early access to new releases!
          </p>
        </div>

        {/* Right Sign-Up Form Area */}
        <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Log In
          </h2>
          
          {/* Email Input Field */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              required
            />
          </div>
          
          {/* Password Input Field */}
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              required
            />
          </div>

          {/* Message Area (for feedback) */}
          {message && (
            <p className={`text-sm mb-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg disabled:opacity-50"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          
          <p className="text-xs text-gray-500 mt-3">
            Create an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;