import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://abinash-sasikumar-poject-js-1.onrender.com/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify({ name: res.data.name }));
            setMessage('Login successful!');
            navigate("/")
            window.location.reload();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <section className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </section>
    );
};

export default Login;
