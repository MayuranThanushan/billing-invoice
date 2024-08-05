import React from 'react';

const ReceiptPreview = ({ products, totals, deleteProduct, handlePrint}) => {
  return (
    <div>
      <hr />
      <div className='output-box'>
      <table className='table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.unitPrice}</td>
              <td>{(product.quantity * product.unitPrice).toFixed(2)}</td>
              <td>
              <button onClick={() => deleteProduct(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='summary'>
        <h3>Summary</h3>
        <div className='summary-item'>
        <p>Total <span className='value'>${totals.subtotal}</span></p>
        <p>Discount <span className='value'>${totals.discount}</span></p>
        <p>Tax <span className='value'>${totals.tax}</span></p>
        <p>Shipping <span className='value'>${totals.shipping}</span></p>
        <hr />
        <p className='total'>SubTotal <span className='value'>${totals.total}</span></p>
        </div>
        <div className='btn'><button onClick={handlePrint}>Print</button></div>
      </div>
    </div>
    </div>
  );
};

export default ReceiptPreview;
