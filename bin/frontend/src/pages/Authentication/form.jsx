import React, { useState } from 'react';

const OrganizationContactForm = () => {
  // Define the target endpoint URL
  const SERVER_URL = 'http://your-tomcat-backend.com/api/contact'; 
  
  // State to manage all form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    type: 'individual', // Default value
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '+91',
    is18Plus: false,
  });
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to update form state for all standard inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submission logic (HTTP POST Request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // Prepare JSON data
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      organization_type: formData.type, // Renamed key for clarity on backend
      contact_details: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone_number: formData.phone,
        is18Plus: formData.is18Plus,
      }
    };

    console.log('Sending JSON Payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Submission successful! We will be in touch shortly.');
        // Optionally clear form data after success
        setFormData({
            firstName: '',
            lastName: '',
            type: 'individual', 
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: '+91',
            is18Plus: false,
        });
      } else {
        const errorText = await response.text();
        setMessage(`Submission failed: ${response.status} - ${errorText || 'Server error'}`);
      }
    } catch (error) {
      console.error('Network error during POST:', error);
      setMessage('Network error. Failed to reach the server.');
    } finally {
      setIsLoading(false);
    }
  };


  const InputField = ({ label, id, type = "text", name, value, className = 'w-1/2', required = false }) => (
    <div className={`p-2 ${className}`}>
      <div className="relative">
        <label htmlFor={id} className="leading-7 text-sm text-gray-600">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          required={required}
        />
      </div>
    </div>
  );

  return (
    <section className="text-white-800 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        
        {/* Header Text */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">User Form details</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please fill out the details below to start the best experience.
          </p>
        </div>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="lg:w-3/4 md:w-5/6 mx-auto bg-white p-6 rounded-lg shadow-xl">
          <div className="flex flex-wrap -m-2">
            
            {/* Row 1: First Name, Last Name, Type */}
            <InputField 
              label="First Name" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              required
            />
            <InputField 
              label="Last Name" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              required
            />

            {/* Type Dropdown */}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="type" className="leading-7 text-sm text-gray-600">
                  Account Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="bookstore">Bookstore</option>
                  <option value="library">Library</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>
            </div>
            
            {/* Phone Number */}
            <InputField 
              label="Phone Number (+91...)" 
              id="phone" 
              name="phone" 
              type="tel" 
              value={formData.phone} 
              required
            />
            
            {/* Row 2: Address (Full Width) */}
            <InputField 
              label="Address Line 1" 
              id="address" 
              name="address" 
              value={formData.address} 
              className='w-full'
              required
            />

            {/* Row 3: City, State, Pincode */}
            <InputField 
              label="City" 
              id="city" 
              name="city" 
              value={formData.city} 
            />
            <InputField 
              label="State/Province" 
              id="state" 
              name="state" 
              value={formData.state} 
            />
            
            {/* Pincode and 18+ checkbox in one row */}
            <div className="p-2 w-1/2 flex items-center">
              <div className="relative w-full">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                  Pincode/ZIP
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="ml-4 flex items-center mt-6">
                <input
                  type="checkbox"
                  id="is18Plus"
                  name="is18Plus"
                  checked={formData.is18Plus}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="is18Plus" className="text-sm text-gray-600 select-none">
                  Are you 18+
                </label>
              </div>
            </div>
            
            {/* Status Message */}
            {message && (
              <div className="p-2 w-full">
                <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                  {message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="p-2 w-full mt-4">
              <button
                type="submit"
                className="flex mx-auto text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg disabled:opacity-50 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </div>
            
            {/* Footer Contact Info (Kept from original structure) */}
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a className="text-black hover:text-gray-700 transition-colors">sid@vidyakosh.com</a>
              <p className="text-gray-800 leading-normal my-5">
                Pune City 
                <br />
                Maharashtra
              </p>
              
              {/* Social Media Icons (SVGs converted to JSX format for stroke/fill rules) */}
              <span className="inline-flex">
                <a className="text-gray-500 hover:text-black transition-colors">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500 hover:text-black transition-colors">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500 hover:text-black transition-colors">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500 hover:text-black transition-colors">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrganizationContactForm;