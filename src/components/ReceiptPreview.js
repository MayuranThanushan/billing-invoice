import React from 'react';

const ReceiptPreview = ({ products, totals, deleteProduct }) => {
  return (
    <div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.unitPrice}</td>
              <td>{product.quantity * product.unitPrice}</td>
              <td>
              <button onClick={() => deleteProduct(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Subtotal: {totals.subtotal}</p>
        <p>Discount: {totals.discount}</p>
        <p>Tax: {totals.tax}</p>
        <p>Shipping: {totals.shipping}</p>
        <p>Total: {totals.total}</p>
      </div>
    </div>
  );
};

export default ReceiptPreview;
