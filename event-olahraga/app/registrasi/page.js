"use client";
import { useEffect, useState } from 'react';

export default function Registrations() {
    const [registrations, setRegistrations] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        participant_name: '',
        event_name: '',
        event_date: '',
        registration_number: '',
        category: '',
    });

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch registrations from Laravel API
    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/api/registrasi');
        const data = await response.json();
        setRegistrations(data);
    };

    // Delete a registration
    const handleDelete = async (id) => {
        await fetch('http://localhost:8000/api/registrasi/${id}', { method: 'DELETE' });
        fetchData();
    };

    // Start editing a registration
    const handleEdit = (registration) => {
        setEditing(registration.id);
        setFormData({
            participant_name: registration.participant_name,
            event_name: registration.event_name,
            event_date: registration.event_date,
            registration_number: registration.registration_number,
            category: registration.category,
        });
    };

    // Update a registration
    const handleUpdate = async () => {
        await fetch('http://localhost:8000/api/registrasi/${editing}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        setEditing(null);
        setFormData({
            participant_name: '',
            event_name: '',
            event_date: '',
            registration_number: '',
            category: '',
        });
        fetchData();
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Registrations</h1>

            {editing ? (
                <div className="mb-4">
                    <h3>Edit Registration</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            name="participant_name"
                            value={formData.participant_name}
                            onChange={handleChange}
                            placeholder="Participant Name"
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            name="event_name"
                            value={formData.event_name}
                            onChange={handleChange}
                            placeholder="Event Name"
                            className="form-control mb-2"
                        />
                        <input
                            type="date"
                            name="event_date"
                            value={formData.event_date}
                            onChange={handleChange}
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            name="registration_number"
                            value={formData.registration_number}
                            onChange={handleChange}
                            placeholder="Registration Number"
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="form-control mb-2"
                        />
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        <button className="btn btn-secondary ml-2" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </div>
            ) : null}

            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Participant Name</th>
                        <th>Event Name</th>
                        <th>Event Date</th>
                        <th>Registration Number</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(registrations) && registrations.map((registration) => (
                        <tr key={registration.id}>
                            <td>{registration.participant_name}</td>
                            <td>{registration.event_name}</td>
                            <td>{registration.event_date}</td>
                            <td>{registration.registration_number}</td>
                            <td>{registration.category}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(registration)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(registration.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}