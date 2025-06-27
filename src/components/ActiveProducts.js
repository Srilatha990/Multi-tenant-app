import React, { useEffect, useState } from 'react';
import { getApi } from '../services/api';

const ActiveProducts = ({ tenant }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveProducts = async () => {
      setLoading(true);
      try {
        const api = getApi(tenant);

        const response = await api.get(`/products/active?tenant=${tenant}`);

        setActiveProducts(response.data);
      } catch (error) {
        console.error('Error fetching active products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProducts();
  }, [tenant]);

  return (
    <div>
      <h3>📈 Active Products (Updated in Last 30 Days)</h3>

      {loading ? (
        <p>Loading...</p>
      ) : activeProducts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Available</th>
              <th>Stock</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {activeProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.available ? 'Yes' : 'No'}</td>
                <td>{product.stock}</td>
                <td>{new Date(product.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      ) : (
        <p>No active products found.</p>
      )}
    </div>
  );
};

export default ActiveProducts;
