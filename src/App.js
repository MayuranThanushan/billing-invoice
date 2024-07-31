import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ReceiptPreview from './components/ReceiptPreview';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const App = () => {
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, tax: 0, shipping: 0, total: 0 });

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    calculateTotals(updatedProducts);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    calculateTotals(updatedProducts);
  };

  const calculateTotals = (products) => {
    const subtotal = (products.reduce((sum, product) => sum + product.quantity * product.unitPrice, 0)).toFixed(2);
    const discount = (subtotal * 0.1).toFixed(2);
    const tax = ((subtotal - discount) * 0.18).toFixed(2);
    const shipping = (10.00).toFixed(2);
    const calcTotal = ((subtotal * 100) + (tax *100) + (shipping * 100) - (discount * 100)) / 100;
    const total = (calcTotal).toFixed(2);
    setTotals({ subtotal, discount, tax, shipping, total });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date}, ${time}`;
  }

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text('Payment Receipt', 10, 10);
    doc.text(`Date: ${getCurrentDateTime()}`, 125, 20);
    doc.autoTable({
      head: [['Product', 'Quantity', 'Unit Price', 'Total Price']],
      body: products.map(product => [product.name, product.quantity, product.unitPrice, product.quantity * product.unitPrice]), startY: 30
    });
    const finalY = doc.autoTable.previous.finalY || 10;
    doc.text(`Subtotal: $${totals.subtotal}`, 10, finalY + 20);
    doc.text(`Discount: $${totals.discount}`, 10, finalY + 30);
    doc.text(`Tax: $${totals.tax}`, 10, finalY + 40);
    doc.text(`Shipping: $${totals.shipping}`, 10, finalY + 50);
    doc.text(`Total: $${totals.total}`, 10, finalY + 60);
    doc.text(`T`, 200, finalY + 60);
    doc.save('receipt.pdf');
  };


  return (
    
    <div>
      <h1>Payment Receipt</h1>
      <ProductForm addProduct={addProduct} />
      <ReceiptPreview products={products} totals={totals} deleteProduct={deleteProduct} />
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default App;
