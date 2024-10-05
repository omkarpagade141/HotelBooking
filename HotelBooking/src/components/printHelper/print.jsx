import ReactDOMServer from 'react-dom/server';
import ListCustomerInvoice from '../Customer/ListCustomerInvoice';

const printHelp=()=>{
    const printWindow = window.open('', '_blank');
    const printContent = ReactDOMServer.renderToString(
      <ListCustomerInvoice/>
    );

    printWindow.document.write(`
        <html>
          <head>
            <title>Bill Details</title>
            <style>
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

}



export default printHelp