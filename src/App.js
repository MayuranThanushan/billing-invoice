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

    doc.setFontSize(48);
    doc.text('ABC', 160, 15);

    doc.setFontSize(18);
    doc.text('INVOICE', 10, 25);

    doc.setFontSize(12);
    doc.text(`${getCurrentDateTime()}`, 155, 25);

    doc.line( 10, 30, 200, 30);

    doc.text('Name: John Doe', 10, 37);
    doc.text('Address: 123, Main St.', 10, 44);
    doc.text('Phone: +1-212-456-7890', 10, 51);

    doc.line(10, 55, 200, 55);

    doc.autoTable({
      head: [['Product', 'Quantity', 'Unit Price', 'Total Price']],
      body: products.map(product => [product.name, product.quantity, product.unitPrice, (product.quantity * product.unitPrice).toFixed(2)]),
      startY: 60,
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },
        1: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },
        2: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },
        3: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0 } },
      }
    });

    const finalY = doc.autoTable.previous.finalY || 60;

    doc.text(`Subtotal`, 140, finalY + 12);
    doc.text(`$${totals.subtotal}`, 195, finalY + 12, {align: 'right'});

    doc.text(`Discount`, 140, finalY + 19);
    doc.text(`$${totals.discount}`, 195, finalY + 19, {align: 'right'});

    doc.text(`Tax`, 140, finalY + 26);
    doc.text(`$${totals.tax}`, 195, finalY + 26, {align: 'right'});

    doc.text(`Shipping`, 140, finalY + 33);
    doc.text(`$${totals.shipping}`, 195, finalY + 33, {align: 'right'});

    doc.line(130, finalY + 38, 200, finalY + 38);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`Total`, 140, finalY + 45);
    doc.text(`$${totals.total}`, 195, finalY + 45, {align: 'right'});

    doc.line(130, finalY + 50, 200, finalY + 50);
    doc.line(130, finalY + 51, 200, finalY + 51);
    doc.text(`** Thank you for your purchase! **`, 67, finalY + 75);
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
