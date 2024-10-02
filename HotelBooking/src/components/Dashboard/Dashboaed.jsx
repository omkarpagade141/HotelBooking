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
  maxHeight: '400px',
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

function Dashboard() {
  const [monthlyIncomeData, setMonthlyIncomeData] = useState(new Array(12).fill(0)); // Initialize with 12 months
  const [monthlyExpenseData, setMonthlyExpenseData] = useState(new Array(12).fill(0));
  const [todaysIncome, setTodaysIncome] = useState(0);
  const [todaysExpense, setTodaysExpense] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("http://localhost:8080/api/Booking/dashboard");

      // Initialize arrays to hold monthly sums
      const incomeByMonth = new Array(12).fill(0);
      const expenseByMonth = new Array(12).fill(0);

      // Process incomeList by month
      const totalIncomeValue = result.data.incomeList.reduce((sum, income) => {
        const incomeDate = new Date(income.bookCreatedOn);
        const month = incomeDate.getMonth();
        incomeByMonth[month] += income.invoiceamount;
        return sum + income.invoiceamount;
      }, 0);

      // Process expenseList by month
      const totalExpenseValue = result.data.expenseList.reduce((sum, expense) => {
        const expenseDate = new Date(expense.expDate);
        const month = expenseDate.getMonth();
        expenseByMonth[month] += expense.expAmount;
        return sum + expense.expAmount;
      }, 0);

      // Update state with monthly data
      setMonthlyIncomeData(incomeByMonth);
      setMonthlyExpenseData(expenseByMonth);

      setTotalIncome(totalIncomeValue);
      setTotalExpenses(totalExpenseValue);

      // Calculate today's income and expenses
      const today = new Date().toISOString().split('T')[0];
      const incomeToday = result.data.incomeList
        .filter(income => income.bookCreatedOn === today)
        .reduce((sum, income) => sum + income.invoiceamount, 0);
      setTodaysIncome(incomeToday);

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

  // Fetch customer data
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

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income',
        data: monthlyIncomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenses',
        data: monthlyExpenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {/* Today's Income Card */}
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

          {/* Total Income Card */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  <strong>Total Income</strong>
                </Typography>
                <hr />
                <Typography variant="h4" component="h2" style={{ fontSize: '22px' }}>
                  ₹{totalIncome}/-
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Today's Expense Card */}
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

          {/* Total Expenses Card */}
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

          {/* Total Customers Card */}
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

          {/* Line Chart for Weekly Income */}
          <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ fontSize: '17px', height: '40px' }}>
                  Line Chart - Weekly Income
                </Typography>
                <div style={{ width: '100%', height: '300px' }}>
                  <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart for Monthly Income vs Expenses */}
          <Grid item xs={12} sm={6}>
            <Card style={barCardStyle}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Bar Graph - Monthly Income vs. Expenses
                </Typography>
                <div style={{ width: '100%', height: '300px' }}>
                  <Bar data={barChartData} options={barChartOptions} />
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
