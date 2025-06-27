import React, { useState, useEffect } from 'react';
import { getApi } from '../services/api';

const StockUpdate = ({ tenant }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newStock, setNewStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = getApi(tenant);
        const response = await api.get(`/products?tenant=${tenant}`);

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [tenant]);

  const handleUpdateStock = async () => {
    if (!selectedProductId || newStock === '') {
      setMessage({ type: 'danger', text: 'Please select a product and enter the new stock quantity.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const selectedProduct = products.find(p => p._id === selectedProductId);
    const previousStock = selectedProduct?.stock;

    setLoading(true);
    setMessage(null);

    try {
      const api = getApi(tenant);
      await api.put(`/products/${selectedProductId}/stock?tenant=${tenant}`, { newStock: Number(newStock) });


      const updatedProducts = await api.get(`/products?tenant=${tenant}`);

      setProducts(updatedProducts.data);

      setMessage({
        type: 'success',
        text: `✅ Stock updated for "${selectedProduct.name}" from ${previousStock} to ${newStock}. Webhook sent or queued for retry.`,
      });


      setNewStock('');
      setSelectedProductId('');
    } catch (error) {
      setMessage({
        type: 'danger',
        text: `❌ Error updating stock: ${error.response?.data?.error || error.message}`,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div>
      <h3>🔄 Update Product Stock</h3>

      <div className="mb-3">
        <label htmlFor="productSelect" className="form-label">Select Product</label>
        <select
          id="productSelect"
          className="form-select"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">-- Select a product --</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} (Current stock: {product.stock})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="stockInput" className="form-label">New Stock Quantity</label>
        <input
          id="stockInput"
          type="number"
          className="form-control"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          min="0"
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleUpdateStock}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Stock'}
      </button>

      {message && (
        <div
          className={`alert alert-${message.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: '250px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default StockUpdate;

