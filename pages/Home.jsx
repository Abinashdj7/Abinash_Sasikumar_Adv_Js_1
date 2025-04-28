import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <section className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
      <p>This is the home page.</p>
      <Link
        to="/products"
        className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        View Products
      </Link>
    </section>
  );
};

export default Home;