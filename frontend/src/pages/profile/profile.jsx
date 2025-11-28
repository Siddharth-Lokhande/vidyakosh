import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/profile');
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("are you sure?")) {
            try {
                const response = await fetch('http://localhost:8080/deleteacc', {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Account deleted successfully.');
                    window.location.href = '/'; // Redirect to home or login
                } else {
                    alert('Failed to delete account.');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error deleting account.');
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Failed to load profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                    <h3 className="text-2xl leading-6 font-medium text-white">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Personal details and account settings.
                    </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">
                                Full name
                            </dt>
                            <dd className="mt-1 text-lg font-semibold text-white">
                                {user.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">
                                Age
                            </dt>
                            <dd className="mt-1 text-lg font-semibold text-white">
                                {user.age}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-lg font-semibold text-white">
                                {user.phone || user.phoneNumber}
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-400">
                                Address
                            </dt>
                            <dd className="mt-1 text-lg font-semibold text-white">
                                {user.address}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-5 sm:px-6 border-t border-gray-700 bg-gray-800/50 flex justify-center">
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors border border-gray-600 shadow-lg"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
