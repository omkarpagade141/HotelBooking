import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Card } from '@mui/material';
import './ViewCustomerTabs.css'; // Import your custom CSS
import ViewCustomerProfile from './ViewCustomerProfile';
import UpdateCustomerProfile from './UpdateCustomerProfile';
import AddCustomerBooking from './AddCustomerBooking';
import ListCustomerBookings from './ListCustomerBookings';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../APIClient';

const ViewCustomerTabs = () => {
  const [value, setValue] = useState(0);
  const [customerData, setCustomerData] = useState(null)

  const { custId } = useParams();


  const fetchCustById = async (custId) => {
    const response = await apiClient.get(`/api/customer/${custId}`)
    console.log(response.data);

    setCustomerData(response.data)
  }
  useEffect(() => {
    
    fetchCustById(custId)

  }, [custId])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <h2 style={{padding:'10px'}}>{customerData ? customerData.fullName : <></>}</h2>
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
          {value === 0 && <div> <ViewCustomerProfile customerData={customerData} /></div>}
        </div>
        <div role="tabpanel" hidden={value !== 1}>
          {value === 1 && <div> <UpdateCustomerProfile customerData={customerData} fetchCustById={fetchCustById}/></div>}
        </div>
        <div role="tabpanel" hidden={value !== 2}>
          {value === 2 && <div><AddCustomerBooking customerData={customerData} /></div>}
        </div>
        <div role="tabpanel" hidden={value !== 3}>
          {value === 3 && <div><ListCustomerBookings customerData={customerData} /></div>}
        </div>
      </Box>
    </Card>
  );
};

export default ViewCustomerTabs;
