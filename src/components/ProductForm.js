import React, { useState } from 'react';
import { getApi } from '../services/api';

const ProductForm = ({ tenant }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    available: 'true',
    stock: '',
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const api = getApi(tenant);
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        available: formData.available === 'true',
      };

      const response = await api.post(`/products?tenant=${tenant}`, payload);


      setMessage({
        type: 'success',
        text: `✅ Product added successfully to ${tenant}`,
      });

      setTimeout(() => setMessage(null), 3000); 
      setFormData({ name: '', price: '', available: 'true', stock: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Failed to add product for ${tenant}`,
      });
      setTimeout(() => setMessage(null), 3000);
      console.error('Create error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      {message && (
        <div
          className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: '280px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}
        >
          {message.text}
        </div>
      )}

      <div className="mt-4 mb-4">
        <h3>➕ Add New Product</h3>
        <form onSubmit={handleSubmit} className="row g-3 mt-2">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div className="col-md-2">
            <select
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="form-select"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-control"
              placeholder="Stock"
              required
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
