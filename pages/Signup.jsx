import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/users', formData);
            localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
            navigate('/');
            setMessage('Signup successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <section className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Sign Up</button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </section>
    );
};

export default Signup;
