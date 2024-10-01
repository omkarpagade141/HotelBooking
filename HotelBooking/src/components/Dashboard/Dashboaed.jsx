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

const barCardStyle = {
  ...cardStyle,
  overflowX: 'auto',
  maxHeight: '400px',
  whiteSpace: 'nowrap',
};

// Line chart data
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Weekly Income',
      data: [9, 19, 5, 12, 15, 25],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

// Bar chart data
const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov'],
  datasets: [
    {
      label: 'Income',
      data: [1000, 1200, 900, 1500, 1300, 1400, 1600, 900, 1200, 100],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Expenses',
      data: [500, 800, 300, 600, 700, 650, 900, 800, 300, 200],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

function Dashboard() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [data, setData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [todaysIncome, setTodaysIncome] = useState(0);
  const [todaysExpense, setTodaysExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("http://localhost:8080/api/Booking/dashboard");
      setData(result.data);

      const expenses = result.data.expenseList.reduce((sum, expense) => sum + expense.expAmount, 0);
      setTotalExpenses(expenses);

      const today = new Date().toISOString().split('T')[0];

      // Calculate today's income from incomeList
      const incomeToday = result.data.incomeList
        .filter(income => income.bookCreatedOn === today)
        .reduce((sum, income) => sum + income.invoiceamount, 0);
      setTodaysIncome(incomeToday);

      // Calculate today's expenses
      const todaysExpenses = result.data.expenseList
        .filter(expense => expense.expDate === today)
        .reduce((sum, expense) => sum + expense.expAmount, 0);
      setTodaysExpense(todaysExpenses);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await apiClient.get('/api/customer');
      setAllCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {/* Income/Expenses Cards */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Today's Income</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  ₹{todaysIncome}/-
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Total Income</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  ₹49/- {/* Replace with actual total income */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h6" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Today's Expense</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  ₹{todaysExpense}/-
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Total Expenses</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  ₹{totalExpenses}/-
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Total Customers</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  {allCustomers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Line and Bar Charts */}
          <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  Line Chart - Weekly Income
                </Typography>
                <div style={{ width: '100%', height: '300px' }}> {/* Adjusted height */}
                  <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card style={barCardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Bar Graph - Monthly Expenses
                </Typography>
                <div style={{ width: '600px', height: '210px' }}>
                  <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dashboard;