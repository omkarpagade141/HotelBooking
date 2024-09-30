// src/pages/Home.js
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Sidebar/Navbar';
import './Home.css';
import Section from '../Sections/Section';
import { Route, Routes } from 'react-router-dom';
import AddContent from '../Contents/AddContent';
import ContentList from '../Contents/ContentList';
import AddCustomer from '../Customer/AddCustomer';
import ListCustomers from '../Customer/ListCustomers';
import SettingMaster from '../Settings/SettingMaster';
import Enquiry from '../Enquiry/Enquiry';
import AddExpense from '../Expenses/AddExpense';
import AddIncome from '../Income/AddIncome';
import ListExpense from '../Expenses/ListExpense';
import ViewIncome from '../Income/ViewIncome';
import ViewCustomerTabs from '../Customer/ViewCustomerTabs';
import Dashboard from '../Dashboard/Dashboaed';
import EditContent from '../Contents/EditContent';
import ViewContent from '../Contents/ViewContent';
import EditBooking from '../Booking/EditBooking';
import ViewBooking from '../Booking/ViewBooking';
import ExpenseDetails from '../Expenses/ExpenseDetails';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar onToggle={() => setCollapsed(!collapsed)} />

      <div className="home-container">
        <Sidebar collapsed={collapsed} />
        <div
          className={` homeContentDiv content ${
            collapsed ? 'collapsed' : 'expanded'
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content" element={<AddContent />} />
            <Route path="/content-list" element={<ContentList />} />
            <Route path="/sections" element={<Section />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/listCustomer" element={<ListCustomers />} />
            <Route path="/settingMaster" element={<SettingMaster />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/addExpense" element={<AddExpense />} />
            <Route path="/addIncome" element={<AddIncome />} />
            <Route path="/listExpense" element={<ListExpense />} />
            <Route path="/viewIncome" element={<ViewIncome />} />
            <Route
              path="/viewCustomer/:custId"
              element={<ViewCustomerTabs />}
            />
            <Route path="/viewContent/:contentID" element={<ViewContent />} />
            <Route path="/editContent/:contId" element={<EditContent />} />
            <Route path="/editBooking/:BookingId" element={<EditBooking />} />
            <Route path="/viewBooking/:BookingId" element={<ViewBooking />} />
            <Route
              path="/viewAndUpdateExpense/:expenseId"
              element={<ExpenseDetails />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
