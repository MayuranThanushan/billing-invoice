import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: '', quantity: 1, unitPrice: 0 });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'name' ? capitalizeFirstLetter(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ name: '', quantity: 0, unitPrice: 0 });
  };

  return (
    <form className='form-section' onSubmit={handleSubmit}>

      <div className='form-group'>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
      </div>

      <div className='form-group'>
        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="0" step="0.001" required />
      </div>

      <div className='form-group'>
        <label>Unit Price:</label>
        <input type="number" name="unitPrice" value={product.unitPrice} onChange={handleChange} min="0" step="0.01" required />
      </div>
      
      <div className='btn'>
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
