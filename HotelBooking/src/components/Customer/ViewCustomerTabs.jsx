import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import './ViewCustomer.css'; // Import your custom CSS
import ViewCustomerProfile from './ViewCustomerProfile';
import UpdateCustomerProfile from './UpdateCustomerProfile';
import AddCustomerBooking from './AddCustomerBooking';
import ListCustomerBookings from './ListCustomerBookings';

const ViewCustomerTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        // indicatorColor="transparent" 
        textColor="inherit"
      >
        <Tab label="Customer Profile" />
        <Tab label="Update Profile" />
        <Tab label="Add Booking" />
        <Tab label="List Bookings " />
      </Tabs> <hr />
      <div role="tabpanel" hidden={value !== 0}>
        {value === 0 && <div> <ViewCustomerProfile/></div>}
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        {value === 1 && <div> <UpdateCustomerProfile/></div>}
      </div>
      <div role="tabpanel" hidden={value !== 2}>
        {value === 2 && <div><AddCustomerBooking/></div>}
      </div>
      <div role="tabpanel" hidden={value !== 3}>
        {value === 3 && <div><ListCustomerBookings/></div>}
      </div>
    </Box>
  );
};

export default ViewCustomerTabs;
