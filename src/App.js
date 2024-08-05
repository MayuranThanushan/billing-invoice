import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ReceiptPreview from './components/ReceiptPreview';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';

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
    const calcTotal = ((subtotal * 100) + (tax * 100) + (shipping * 100) - (discount * 100)) / 100;
    const total = (calcTotal).toFixed(2);
    setTotals({ subtotal, discount, tax, shipping, total });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date}, ${time}`;
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('INVOICE', 10, 10);

    doc.setFontSize(14);
    doc.text(`${getCurrentDateTime()}`, 155, 10);

    doc.line( 10, 15, 200, 15)

    doc.text('Name: John Doe', 10, 25);
    doc.text('Address: 123, Main St.', 10, 32);
    doc.text('Phone: +1-212-456-7890', 10, 39);

    doc.line(10, 45, 200, 45);

    doc.autoTable({
      head: [['Product', 'Quantity', 'Unit Price', 'Total Price']],
      body: products.map(product => [product.name, product.quantity, product.unitPrice, (product.quantity * product.unitPrice).toFixed(2)]),
      startY: 50,
    });

    const finalY = doc.autoTable.previous.finalY || 40;

    doc.line(10, finalY + 5, 200, finalY + 5);

    doc.text(`Total`, 10, finalY + 12);
    doc.text(`$${totals.subtotal}`, 195, finalY + 12, {align: 'right'});

    doc.text(`Discount`, 10, finalY + 19);
    doc.text(`$${totals.discount}`, 195, finalY + 19, {align: 'right'});

    doc.text(`Tax`, 10, finalY + 26);
    doc.text(`$${totals.tax}`, 195, finalY + 26, {align: 'right'});

    doc.text(`Shipping`, 10, finalY + 33);
    doc.text(`$${totals.shipping}`, 195, finalY + 33, {align: 'right'});

    doc.text(`SubTotal`, 10, finalY + 45);
    doc.text(`$${totals.total}`, 195, finalY + 45, {align: 'right'});

    doc.line(10, finalY + 50, 200, finalY + 50);
    doc.text(`** Thank you for your purchase! **`, 67, finalY + 60);
    doc.save('receipt.pdf');
  };

  return (
    <div className='container'>
      <header className='header'>
        <h1>Payment Invoice System</h1>
      </header>
      <ProductForm addProduct={addProduct} />
      <ReceiptPreview products={products} totals={totals} deleteProduct={deleteProduct} handlePrint={handlePrint} />
    </div>
  );
};

export default App;
