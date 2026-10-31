
import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginLanding from './Pages/LoginLanding'
import Attendance from './Pages/Attendance'
import Dashboard from './Pages/Dashboard'
import Employees from './Pages/Employees'
import Leave from './Pages/Leave'
import Payslips from './Pages/Payslips'
import Settings from './Pages/Settings'
import Layout from './Pages/Layout'
import PrintPayslips from './Pages/PrintPayslips'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <>
      <Toaster />
    <Routes>
      <Route path="/login" element={<LoginLanding />} />
      <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="sign in to manage the organization"/>}/>
      <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="sign in to access your records"/>}/>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/payslips" element={<Payslips />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
      <Route path="/print/payslips/:id" element={<PrintPayslips />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  )
}

export default App

