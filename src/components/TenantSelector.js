import React from 'react';

const TenantSelector = ({ tenant, setTenant }) => {
  return (
    <div className="mb-4">

        <label>Select Tenant: </label>
      
      <select
        className="form-select"
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
         style={{ width: '180px', maxWidth: '100%' }}
      >
        <option value="tenant1">Tenant 1</option>
        <option value="tenant2">Tenant 2</option>
      </select>
    </div>
    
  );
};

export default TenantSelector;
