import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8000/api/registrasi'; // Ganti dengan URL API Laravel Anda

const Registrasi = () => {
    const [registrasi, setRegistrasi] = useState([]);
    const [newData, setNewData] = useState({
        participant_name: '',
        event_name: '',
        event_date: '',
        registration_number: '',
        category: ''
    });
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchRegistrasi = async () => {
            const response = await axios.get(API_URL);
            setRegistrasi(response.data.data);
        };
        fetchRegistrasi();
    }, []);

    const handleCreate = async () => {
        const response = await axios.post(API_URL, newData);
        setRegistrasi([...registrasi, response.data.data]);
        resetForm();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setRegistrasi(registrasi.filter(item => item.id !== id));
    };

    const handleEdit = (data) => {
        setEditData(data);
        setNewData(data);
    };

    const handleUpdate = async () => {
        const response = await axios.put(`${API_URL}/${editData.id}`, newData);
        setRegistrasi(registrasi.map(item => (item.id === editData.id ? response.data.data : item)));
        resetForm();
    };

    const resetForm = () => {
        setNewData({
            participant_name: '',
            event_name: '',
            event_date: '',
            registration_number: '',
            category: ''
        });
        setEditData(null);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Daftar Registrasi</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nama Peserta</th>
                        <th>Nama Event</th>
                        <th>Tanggal Event</th>
                        <th>Nomor Registrasi</th>
                        <th>Kategori</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {registrasi.map((item) => (
                        <tr key={item.id}>
                            <td>{item.participant_name}</td>
                            <td>{item.event_name}</td>
                            <td>{item.event_date}</td>
                            <td>{item.registration_number}</td>
                            <td>{item.category}</td>
                            <td>
                                <button className="btn btn-warning me-1" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-center mb-3">{editData ? 'Edit Registrasi' : 'Tambah Registrasi'}</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nama Peserta"
                    value={newData.participant_name}
                    onChange={(e) => setNewData({ ...newData, participant_name: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nama Event"
                    value={newData.event_name}
                    onChange={(e) => setNewData({ ...newData, event_name: e.target.value })}
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    placeholder="Tanggal Event"
                    value={newData.event_date}
                    onChange={(e) => setNewData({ ...newData, event_date: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nomor Registrasi"
                    value={newData.registration_number}
                    onChange={(e) => setNewData({ ...newData, registration_number: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Kategori"
                    value={newData.category}
                    onChange={(e) => setNewData({ ...newData, category: e.target.value })}
                />
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary me-2" onClick={editData ? handleUpdate : handleCreate}>
                        {editData ? 'Perbarui Registrasi' : 'Tambah Registrasi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registrasi;