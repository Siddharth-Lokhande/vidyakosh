import React, { useState, useEffect } from 'react';

const Donation = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        campaignName: '',
        description: '',
        location: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await fetch('http://localhost:8080/campaigns');
            if (response.ok) {
                const data = await response.json();
                setCampaigns(data);
            } else {
                console.error('Failed to fetch campaigns');
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
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
        try {
            const response = await fetch('http://localhost:8080/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Campaign created successfully!');
                setShowModal(false);
                fetchCampaigns(); // Refresh list
                setFormData({
                    campaignName: '',
                    description: '',
                    location: '',
                    startDate: '',
                    endDate: ''
                });
            } else {
                alert('Failed to create campaign.');
            }
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('Error creating campaign.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 relative">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">Book Donation Campaigns</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white px-6 py-3 rounded-3xl border border-gray-600 hover:bg-gray-800 transition-colors shadow-lg font-semibold"
                    >
                        Create Campaign
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.length === 0 ? (
                        <p className="text-gray-400 col-span-full text-center text-xl">No active campaigns found.</p>
                    ) : (
                        campaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl hover:border-indigo-500 transition-all">
                                <div className="mb-4">
                                    <span className="text-xs font-mono text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">ID: {campaign.id}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{campaign.campaignName || "Campaign Name"}</h3>
                                <p className="text-gray-400 mb-4 line-clamp-3">{campaign.description || "No description provided."}</p>

                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400 shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span>{campaign.location}</span>
                                    </div>

                                    {campaign.organiser && (
                                        <div className="pt-4 border-t border-gray-700 mt-4">
                                            <p className="font-semibold text-white mb-1">Organiser Details</p>
                                            <p>Name: {campaign.organiser.name}</p>
                                            <p>Email: {campaign.organiser.email}</p>
                                            <p>Phone: {campaign.organiser.phone || campaign.organiser.phoneNumber}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg border border-gray-700 relative shadow-2xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-white">Start a Campaign</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Campaign Name</label>
                                <input
                                    type="text"
                                    name="campaignName"
                                    value={formData.campaignName}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-6 shadow-lg"
                            >
                                Create Campaign
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donation;
