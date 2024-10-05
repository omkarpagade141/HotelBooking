import ReactDOMServer from 'react-dom/server';
import ListCustomerInvoice from '../Customer/ListCustomerInvoice';

const printHelp=(setting,booking)=>{
    const printWindow = window.open('', '_blank');
    const printContent = ReactDOMServer.renderToString(
      <ListCustomerInvoice setting={setting} booking={booking}/>
    );

    printWindow.document.write(`
        <html>
          <head>
            <title>Bill Details</title>
            <style>
            .invoice-card {
    width: 95%;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  .invoice-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .invoice-header h2 {
    text-align: center;
  }
  
  .invoice-info {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .invoice-info p {
    margin: 0;
    line-height: 1.6;
  }
  
  .invoice-table {
    margin-top: 30px;
  }
  
  .invoice-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .invoice-table th,
  .invoice-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .invoice-table th {
    background-color: #f2f2f2;
  }
  
  .invoice-total {
    text-align: right;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .print-button {
    margin-top: 20px;
    text-align: right;
  }
  
  .print-button button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .print-button button:hover {
    background-color: #45a049;
  }
  
            </style>
          </head>
          <body>${printContent}</body>
          <script>
            window.print();
            window.onafterprint = function() { window.close(); };
          </script>
        </html>
      `);
    printWindow.document.close();

    return(
      <></>
      );
      

}




export default printHelp