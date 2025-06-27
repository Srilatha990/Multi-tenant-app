
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TenantSelector from './components/TenantSelector';
import ProductSearch from './components/ProductSearch';
import ProductForm from './components/ProductForm';
import ActiveProducts from './components/ActiveProducts';
import StockUpdate from './components/StockUpdate';
import EmailMasker from './components/EmailMasker';
import './App.css'; 

function App() {
  const [tenant, setTenant] = useState('tenant1');

  return (
    <Router>
      
      <nav className="navbar navbar-dark bg-dark px-4 py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h4 className="text-light m-0">🛒 Product Manager</h4>
        <span className="text-light mt-2 mt-md-0">Multi-Tenant Product Management App</span>
      </nav>


      <div className="bg-light py-2 px-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center flex-wrap">

          <TenantSelector tenant={tenant} setTenant={setTenant} />

          <div className="d-flex flex-wrap gap-4">
            <Link to="/" className="btn btn-outline-primary">🔍 Search Products</Link>
            <Link to="/add-product" className="btn btn-outline-success">➕ Add Product</Link>
            <Link to="/active-products" className="btn btn-outline-info">📈 Active Products</Link>
            <Link to="/update-stock" className="btn btn-outline-warning">📦 Update Stock</Link>
            <Link to="/mask-email" className="btn btn-outline-secondary">🔐 Email Masker</Link>
          </div>

        </div>
      </div>

      <div className="app-content-container py-5">
        <div className="container bg-white p-4 rounded shadow">
          <Routes>
            <Route path="/" element={<ProductSearch tenant={tenant} />} />
            <Route path="/add-product" element={<ProductForm tenant={tenant} />} />
            <Route path="/active-products" element={<ActiveProducts tenant={tenant} />} />
            <Route path="/update-stock" element={<StockUpdate tenant={tenant} />} />
            <Route path="/mask-email" element={<EmailMasker tenant={tenant} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



