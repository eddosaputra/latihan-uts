import { useEffect, useState } from 'react';

export default function Home() {
    const [registrations, setRegistrations] = useState([]);
    const [formData, setFormData] = useState({
        participant_name: '',
        event_name: '',
        event_date: '',
        registration_number: '',
        category: '',
    });

    useEffect(() => {
        fetch('/api/registrasi_event_olahraga')
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    setRegistrations(data.data);
                }
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/registrasi_event_olahraga', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                setRegistrations([...registrations, formData]);
                setFormData({
                    participant_name: '',
                    event_name: '',
                    event_date: '',
                    registration_number: '',
                    category: '',
                });
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Registrasi Event Olahraga</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input 
                    type="text" 
                    name="participant_name" 
                    placeholder="Nama Peserta" 
                    value={formData.participant_name} 
                    onChange={handleChange} 
                    className="border p-2 mr-2 mb-2" 
                    required 
                />
                <input 
                    type="text" 
                    name="event_name" 
                    placeholder="Nama Event" 
                    value={formData.event_name} 
                    onChange={handleChange} 
                    className="border p-2 mr-2 mb-2" 
                    required 
                />
                <input 
                    type="date" 
                    name="event_date" 
                    value={formData.event_date} 
                    onChange={handleChange} 
                    className="border p-2 mr-2 mb-2" 
                    required 
                />
                <input 
                    type="text" 
                    name="registration_number" 
                    placeholder="Nomor Registrasi" 
                    value={formData.registration_number} 
                    onChange={handleChange} 
                    className="border p-2 mr-2 mb-2" 
                    required 
                />
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Kategori" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="border p-2 mb-2" 
                    required 
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Daftar</button>
            </form>
            <h2 className="text-xl mb-2">Daftar Pendaftaran:</h2>
            <ul>
                {registrations.map((registration, index) => (
                    <li key={index} className="border-b py-2">
                        {registration.participant_name} - {registration.event_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
