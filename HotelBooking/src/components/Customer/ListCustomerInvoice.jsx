import React from 'react';
import './ListCustomerInvoice.css';

function ListCustomerInvoice({ setting,booking }) {


  const calculateSubtotal = (cost, quantity) => cost * quantity;

  return (
    <div className="invoice-card">
      <div className="invoice-content">
        {/* Invoice Header */}
        <div className="invoice-header">
          <h2>{setting ? setting.companyName : 'Company Name'}</h2>
        </div>

        {/* Invoice Details */}
        <div className="invoice-details-top">
          <p>
            <b>Invoice # {booking ? booking.bookingId : ''}</b>
            <br />
            <b>Invoice Date:</b>  {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}

            <br />
            <b>Check-In Date:</b> {booking ? booking.checkInDate +' '+ booking.checkInTime :''}
            <br />
            <b>Check-Out Date:</b> {booking ? booking.checkOutDate +' '+ booking.checkOutTime :''}
            <br />
            <b>Room :</b>{booking ? booking.roomTypeObj.contentTitle :''} ({booking ? booking.roomTypeObj.contentPrice + ' per day' :''})
          </p>
        </div>

        {/* From and To Section */}
        <div className="invoice-info">
          <div className="invoice-from">
            <p>
              <strong>From</strong> <br />
              <b>{setting ? setting.companyName : 'Company Name'}</b>
              <br />
              {setting ? setting.city : 'City Name'}
              <br />
              Email: {setting ? setting.email : 'Company Email'}
              <br />
              Contact: {setting ? setting.phoneNumber : 'Company Contact No'}
            </p>
          </div>

          <div className="invoice-to">
            <p>
              <strong>To</strong> <br />
              <b>{booking ? booking.customer.fullName : ''}</b>
              <br />
              {booking ? booking.customer.locality : ''}
              <br />
              {booking ? booking.customer.city : ''}
              <br />
              Phone: {booking ? booking.customer.mobileNumber : ''}  
              <br />
              Email:{booking ? booking.customer.email : ''}   
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="invoice-table">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Product Name</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {booking.itemList.map((product, index) => (
                <tr key={product.itemId}>
                  <td>{index + 1}</td>
                  <td>{product.itemName}</td>
                  <td>{product.itemPrice}</td>
                  <td>{product.itemQuantity}</td>
                  <td>{calculateSubtotal(product.itemPrice, product.itemQuantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="invoice-total">
          <h3>Total: {booking ? booking.invoiceamount : ''}</h3>
        </div>
      </div>
    </div>
  );
}

export default ListCustomerInvoice;
