import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = ({ productId }) => {
    const token = localStorage.getItem('token');
    console.log(token)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('category', formData.category);
        
        // Check if image is provided and append it
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
    
        // Log the form data before sending it
        console.log('Form Data to send:', formDataToSend);
    
        try {
            let response;
            if (productId) {
                // Update product
                response = await axios.put(`https://abinash-sasikumar-poject-js-1.onrender.com/api/products/${productId}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(`Product ${productId} updated successfully:`, response.data);
            } else {
                // Create new product
                response = await axios.post('https://abinash-sasikumar-poject-js-1.onrender.com/api/products', formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('New product created successfully:', response.data);
            }
    
            // If the product is successfully created or updated, navigate to the products page
            setLoading(false);
            navigate('/products');
        } catch (error) {
            // Handle the error based on its type
            setLoading(false);
    
            // Axios error handling
            if (axios.isAxiosError(error)) {
                // If the error is an Axios error, log specific details
                const statusCode = error.response ? error.response.status : 'Unknown';
                const errorMessage = error.response ? error.response.data.message : error.message;
    
                console.error(`Axios error - Status Code: ${statusCode}`);
                console.error(`Error Message: ${errorMessage}`);
    
                // Show a user-friendly message
                alert(`Error: ${errorMessage || 'An unknown error occurred.'}`);
            } else {
                // If the error is not an Axios error, log a general error
                console.error('General error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{productId ? 'Edit Product' : 'Create Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-semibold">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-semibold">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-semibold">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-semibold">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : productId ? 'Updte Product' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
