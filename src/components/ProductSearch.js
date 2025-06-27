
import React, { useState } from 'react';
import { getApi } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

const ProductSearch = ({ tenant }) => {
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    available: '',
    updatedSince: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };



  const searchProducts = async () => {
    setLoading(true);
    try {
      const api = getApi(tenant);

      const filteredParams = {};
      for (const key in filters) {
        let value = filters[key];
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'available') {
            value = value === 'true';
          }
          if (key === 'updatedSince') {
            value = new Date(value).toISOString();
          }
          filteredParams[key] = value;
        }
      }

      const params = { tenant, ...filteredParams, ts: Date.now() };

      const response = await api.get('/products/search', { params });


      console.log('API response data:', response.data);

      const products = Array.isArray(response.data)
        ? response.data
        : response.data.products || response.data.data || [];

      setResults(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div>

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Product Name"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Min Price"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Max Price"
          />
        </div>
        <div className="col-md-2">
          <select
            name="available"
            value={filters.available}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Status</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="updatedSince"
            value={filters.updatedSince}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <button onClick={searchProducts} className="btn btn-primary mb-3">
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Available</th>
              <th>Stock</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {results.map((product) => (
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
      ) : (
        <p>No results to display.</p>
      )}
    </div>
  );
};

export default ProductSearch;
