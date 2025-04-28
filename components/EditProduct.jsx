import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://abinash-sasikumar-poject-js-1.onrender.com/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    
    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      await axios.put(`https://abinash-sasikumar-poject-js-1.onrender.com/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${token}`
        }
      });
      alert('Product updated successfully!');
      navigate('/products'); // Navigate back to the products page after update
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            name="description" 
            value={product.description} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            name="price" 
            value={product.price} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Stock:</label>
          <input 
            type="number" 
            name="stock" 
            value={product.stock} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            name="category" 
            value={product.category} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Image:</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
          />
        </div>
        <div>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
