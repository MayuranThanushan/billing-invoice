# Payment Invoice System

A React-based payment invoice system for managing product entries, calculating totals, and generating PDF receipts using jsPDF.

## Features

- Add products with name, quantity, and unit price
- Automatically capitalize product names
- Calculate subtotal, discount, tax, shipping, and total amounts
- Delete products from the list
- Print the invoice as a PDF

## Technologies Used

- React
- JavaScript
- jsPDF
- CSS

## Components

### App

The main component that holds the state for products and totals. It renders `ProductForm` and `ReceiptPreview`.

### ProductForm

A form for adding products with the following fields:

- Product Name
- Quantity
- Unit Price

### ReceiptPreview

Displays the list of added products in a table format and shows the summary of totals. It includes a button to delete products and print the receipt.

## Usage

1. Enter the product details in the form and click "Add Product".
2. The added products will appear in the receipt preview table.
3. The summary section will display the subtotal, discount, tax, shipping, and total amounts.
4. Click "Delete" to remove a product from the list.
5. Click "Print" to generate and download the invoice as a PDF.
