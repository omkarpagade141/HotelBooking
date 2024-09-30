import React, { useEffect, useState } from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import apiClient from '../APIClient';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#fff',
};

// Line chart data
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May',"June"],
  datasets: [
    {
      label: 'Weekly Income',
      data: [9, 19, 5, 12, 15, 25, 8],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

// Bar chart data (updated to include next three months)
const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "Sep", "Oct", "Nov"],
  datasets: [
    {
      label: 'Income',
      data: [1000, 1200, 900, 1500, 1300, 1400, 1600, 900, 1200,100],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Expenses',
      data: [500, 800, 300, 600, 700, 650, 900, 800, 300, 200],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const barCardStyle = {
  ...cardStyle,
  overflowX: 'auto', // Enable horizontal scrolling
  maxHeight: '400px', // Increased maximum height for the card
  whiteSpace: 'nowrap', // Prevent wrapping of content
};



function Dashboard() {
  const [allCcustomer,setAllCustomer]=useState([])
  const fetchAllCustomer=async()=>{
    const response = await apiClient.get('/api/customer');
    setAllCustomer(response.data)
  
  }
  useEffect(()=>{
    fetchAllCustomer()
  },[])
  
  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {/* Income/Expenses Cards */}
      <Grid item xs={12} sm={6} md={2.4}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{fontSize:'17px',height:'40px'}}>
              <strong>Today's Income</strong>
            </Typography> <hr />
            <Typography variant="h4" component="h2" style={{fontSize:'22px'}}>
              ₹9/-
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{fontSize:'17px',height:'40px'}}>
              <strong>Total Income</strong>
            </Typography><hr />
            <Typography variant="h4" component="h2" style={{fontSize:'22px'}}>
              ₹49/-
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" component="h2" style={{fontSize:'17px',height:'40px'}}>
              <strong>Today's Expense</strong>
            </Typography><hr />
            <Typography variant="h4" component="h2" style={{fontSize:'22px'}}>
              ₹799/-
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{fontSize:'17px',height:'40px'}}>
              <strong>Total Expenses</strong>
            </Typography> <hr />
            <Typography variant="h4" component="h2" style={{fontSize:'22px'}}>
              ₹499/-
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{fontSize:'17px',height:'40px'}}>
              <strong>Total Customers</strong>
            </Typography> <hr />
            <Typography variant="h4" component="h2" style={{fontSize:'22px'}}>
              {allCcustomer.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9}></Grid>

      {/* Line and Bar Charts */}
      <Grid item xs={12} sm={6}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{fontSize:'17px',height:'40px'}}> 
              Line Chart - Weekly Income
            </Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card style={barCardStyle}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Bar Graph - Monthly Expenses
            </Typography>
            <div style={{ width: '600px', height: '210px' }}> {/* Set a fixed width and height for the chart */}
              <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
