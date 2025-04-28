import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import Product from '../pages/Product';
import CreateProduct from '../components/CreateProduct';
import EditProduct from '../components/EditProduct';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Product />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/create" element={<CreateProduct/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;