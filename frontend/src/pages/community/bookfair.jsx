import React, { useState, useEffect } from 'react';
import './bookfair.css';

const BookFair = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        dateTime: '',
        organiserName: '',
        organiserEmail: '',
        organiserPhone: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8080/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the payload matching the expected structure
        // Assuming flat structure for form but maybe nested for backend?
        // User said: "organiser details (name,email,phone number)"
        // I will send it as a nested object if that's what the display implies, 
        // but for the form I kept it flat. Let's structure it for the POST.

        const payload = {
            name: formData.name,
            type: formData.type,
            location: formData.location,
            dateTime: formData.dateTime, // User said "date/time", assuming string or ISO
            organiser: {
                name: formData.organiserName,
                email: formData.organiserEmail,
                phoneNumber: formData.organiserPhone
            }
        };

        try {
            const response = await fetch('http://localhost:8080/eventcreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Refresh events and close modal
                fetchEvents();
                setShowModal(false);
                setFormData({
                    name: '',
                    type: '',
                    location: '',
                    dateTime: '',
                    organiserName: '',
                    organiserEmail: '',
                    organiserPhone: ''
                });
            } else {
                console.error('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="bookfair-container">
            <div className="header">
                <div className="title">Community Events</div>
                <button className="create-btn" onClick={() => setShowModal(true)}>
                    Create
                </button>
            </div>

            <div className="events-list">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.name}</h3>
                            <div className="event-details">
                                <p><strong>Type:</strong> {event.type}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Date/Time:</strong> {event.dateTime || event.date}</p> {/* Handling potential naming variations */}
                            </div>
                            {event.organiser && (
                                <div className="organiser-info">
                                    <p><strong>Organiser:</strong> {event.organiser.name}</p>
                                    <p><strong>Email:</strong> {event.organiser.email}</p>
                                    <p><strong>Phone:</strong> {event.organiser.phoneNumber || event.organiser.phone}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        <h2>Create New Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date/Time</label>
                                <input
                                    type="text" // Could be datetime-local but keeping text for flexibility as per prompt "date/time"
                                    name="dateTime"
                                    value={formData.dateTime}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 2023-12-25 10:00 AM"
                                    required
                                />
                            </div>

                            <h4 style={{ marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #555' }}>Organiser Details</h4>

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="organiserName"
                                    value={formData.organiserName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="organiserEmail"
                                    value={formData.organiserEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="organiserPhone"
                                    value={formData.organiserPhone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookFair;
