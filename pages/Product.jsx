import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://abinash-sasikumar-poject-js-1.onrender.com/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCreate = () => {
        navigate('/products/create');
    };

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading products...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Create Product
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => {
                    // Construct the image URL correctly
                    const imageURL = product.image ? `https://abinash-sasikumar-poject-js-1.onrender.com/middleware/uploads${product.image}` : '/default-image.jpg';
                    console.log(`Image URL for product ${product.name}: ${imageURL} ${product.image}`);  // Log the image URL for debugging

                    return (
                        <div key={product._id} className="border rounded-lg shadow-md overflow-hidden flex flex-col">
                            <img
                                src={imageURL}  // Use the image URL directly
                                alt={product.name}
                                className="h-60 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-700 mb-2 flex-1">{product.description}</p>
                                <p className="text-gray-900 font-bold mb-1">${product.price}</p>
                                <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
                                <button
                                    onClick={() => handleEdit(product._id)}
                                    className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Product;
