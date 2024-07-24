import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: '', quantity: 1, unitPrice: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ name: '', quantity: 1, unitPrice: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />

      <label>Quantity:</label>
      <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="1" required />

      <label>Unit Price:</label>
      <input type="number" name="unitPrice" value={product.unitPrice} onChange={handleChange} min="0" required />
      
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
